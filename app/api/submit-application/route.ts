import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Submit Application - Request body:', body);
    
    const { jobSeekerId, companySlug, verificationId, coverLetter, includeLinks } = body;

    // Check verification status
    console.log('Checking verification status for ID:', verificationId);
    const verification = await prisma.verification.findUnique({
      where: { id: verificationId },
      include: {
        company: true
      }
    });

    console.log('Verification data:', verification);

    if (!verification || verification.status !== "completed") {
      console.log('Verification not completed:', verification);
      return NextResponse.json(
        { error: "Verification not completed" },
        { status: 400 }
      );
    }

    // Get job post from company name
    console.log('Finding job post for company:', verification.company?.name);
    const jobPosts = await prisma.jobPost.findMany({
      where: {
        company: {
          name: verification.company?.name
        },
        status: "ACTIVE"
      },
      include: {
        company: {
          select: {
            name: true,
            id: true
          }
        }
      }
    });

    console.log('Found job posts:', jobPosts);

    if (!jobPosts.length) {
      console.log('No active job posts found for company:', verification.company?.name);
      return NextResponse.json(
        { error: "No active job posts found for this company" },
        { status: 404 }
      );
    }

    // Use the most recently created job post
    const jobPost = jobPosts[0];
    console.log('Selected job post for application:', jobPost);

    // Create application with a transaction
    console.log('Creating application with transaction');
    const result = await prisma.$transaction(async (tx) => {
      const jobSeeker = await tx.jobSeeker.findFirst({
        where: { id: jobSeekerId },
        select: {
          id: true,
          name: true,
          resume: true,
          linkedin: true,
          github: true,
          portfolio: true,
          skills: true,
          experience: true,
          yearsOfExperience: true,
          expectedSalaryMin: true,
          expectedSalaryMax: true,
          certifications: true,
          education: true,
          location: true,
          phoneNumber: true,
          desiredEmployment: true,
        },
      });

      console.log('Job seeker data:', jobSeeker);

      if (!jobSeeker) {
        throw new Error("Job seeker not found. Please complete your profile first.");
      }

      if (!jobSeeker.resume) {
        throw new Error("Resume is required to submit an application");
      }

        const application = await tx.jobApplication.create({
        data: {
          jobSeeker: { connect: { id: jobSeekerId } },
          job: { connect: { id: jobPost.id } },
          coverLetter,
          status: "PENDING",
          includeLinks,
          resume: jobSeeker.resume,
          answers: includeLinks 
          ? {
            linkedin: jobSeeker.linkedin,
            github: jobSeeker.github,
            portfolio: jobSeeker.portfolio,
            skills: jobSeeker.skills,
            experience: jobSeeker.experience,
            yearsOfExperience: jobSeeker.yearsOfExperience,
            expectedSalaryMin: jobSeeker.expectedSalaryMin,
            expectedSalaryMax: jobSeeker.expectedSalaryMax,
            certifications: jobSeeker.certifications,
            education: jobSeeker.education,
            location: jobSeeker.location,
            phoneNumber: jobSeeker.phoneNumber,
            desiredEmployment: jobSeeker.desiredEmployment,
            }
          : undefined,
        },
        });

        console.log('Created application:', application);

        // Update job metrics
        await tx.jobMetrics.upsert({
        where: { jobPostId: jobPost.id },
        create: {
          jobPostId: jobPost.id,
          totalViews: 0,
          totalClicks: 0,
          applications: 1,
          viewsByDate: {},
          clicksByDate: {},
          locationData: jobSeeker.location ? { [jobSeeker.location]: 1 } : {}
        },
        update: {
          applications: { increment: 1 },
          locationData: {
          set: jobSeeker.location 
            ? await tx.jobMetrics.findUnique({ 
              where: { jobPostId: jobPost.id },
              select: { locationData: true }
            }).then(current => {
              const data = current?.locationData as any || {};
              return {
              ...data,
              [jobSeeker.location]: (data[jobSeeker.location] || 0) + 1
              };
            })
            : undefined
          }
        }
        });

        // Update the job post's applications count
        await tx.jobPost.update({
        where: { id: jobPost.id },
        data: {
          applications: {
          increment: 1,
          },
        },
        });

      return { application, jobSeeker };
    });

    console.log('Transaction completed successfully:', result);
    return NextResponse.json({
      success: true,
      applicationId: result.application.id,
      jobSeekerName: result.jobSeeker.name
    });

  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Failed to submit application",
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
