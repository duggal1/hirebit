"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobSeekerSchema } from "@/src/utils/zodSchemas";
import { useState } from "react";
import { toast } from "@/src/app/_components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { UploadIcon, PlusCircleIcon, XIcon, Loader2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { createJobSeeker, FormState, submitJobSeeker } from "@/src/app/actions";
import { FileUpload } from "@/components/general/FileUpload";

interface JobSeekerFormProps {
  onComplete?: () => void;
}

export default function JobSeekerForm({ onComplete }: JobSeekerFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      about: "",
      resume: "",
      location: "",
      phoneNumber: "",
      jobId: "",
      expectedSalaryMin: undefined,
      expectedSalaryMax: undefined,
      preferredLocation: "",
      remotePreference: "Hybrid",
      yearsOfExperience: 0,
      skills: [],
      certifications: undefined,
      availabilityPeriod: 30,
      education: [
        {
          degree: "",
          institution: "",
          year: new Date().getFullYear(),
          fieldOfStudy: "",
        },
      ],
      desiredEmployment: "Full-time",
      experience: 0,
      linkedin: "",
      github: "",
      portfolio: "",
      availableFrom: "",
      previousJobExperience: "",
      willingToRelocate: false,
      email: "",
      currentJobTitle: "",
      industry: "",
      jobSearchStatus: "OPEN_TO_OFFERS",
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    name: "education",
    control: form.control,
  });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({
    name: "certifications",
    control: form.control,
    shouldUnregister: true,
  });

  // Debug: Log form state
  console.log("Form state:", {
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
  });

  const [pending, setPending] = useState(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const [currentSkill, setCurrentSkill] = useState("");

  async function onSubmit(values: z.infer<typeof jobSeekerSchema>) {
    try {
      setPending(true);
      console.log("Submitting form with values:", values);

      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.set(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.set(key, value.toString());
        }
      });

      const result = await submitJobSeeker({} as FormState, formData);
      console.log("Submission result:", result);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });

        // Add a small delay before redirect to show the success message
        setTimeout(() => {
          // Use our onComplete callback to redirect to /main instead of the result.redirect
          if (onComplete) {
            onComplete();
          } else if (result.redirect) {
            // Fallback to the original redirect if onComplete is not provided
            router.push(result.redirect);
          }
        }, 1500);
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Debug section */}
        {Object.keys(form.formState.errors).length > 0 && (
          <div className="bg-destructive/15 p-3 rounded-md">
            <h3 className="font-medium text-destructive text-sm">
              Form has the following errors:
            </h3>
            <ul className="mt-2 text-destructive text-sm">
              {Object.entries(form.formState.errors).map(([field, error]) => (
                <li key={field}>
                  {field}: {error?.message as string}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="font-semibold text-xl">Basic Information</h2>
          
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your@email.com" {...field} />
            </FormControl>
            <FormDescription>Your primary contact email</FormDescription>
            <FormMessage />
            </FormItem>
          )}
          />

          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
            </FormItem>
          )}
          />

          <FormField
          control={form.control}
          name="currentJobTitle"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Current Job Title</FormLabel>
            <FormControl>
              <Input placeholder="Software Engineer" {...field} value={field.value || ""} />
            </FormControl>
            <FormDescription>Your current or most recent job title</FormDescription>
            <FormMessage />
            </FormItem>
          )}
          />

          <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Industry</FormLabel>
            <FormControl>
              <Input placeholder="Technology" {...field} />
            </FormControl>
            <FormDescription>Your primary industry of expertise</FormDescription>
            <FormMessage />
            </FormItem>
          )}
          />

          <FormField
          control={form.control}
          name="jobSearchStatus"
          render={({ field }) => (
            <FormItem>
            <FormLabel>Job Search Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your job search status" />
              </SelectTrigger>
              </FormControl>
              <SelectContent>
              <SelectItem value="ACTIVELY_LOOKING">Actively Looking</SelectItem>
              <SelectItem value="OPEN_TO_OFFERS">Open to Offers</SelectItem>
              <SelectItem value="NOT_LOOKING">Not Looking</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>Let employers know your current job search status</FormDescription>
            <FormMessage />
            </FormItem>
          )}
          />

          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Profile</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://linkedin.com/in/..."
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Profile</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://github.com/..."
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Website</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://..."
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume URL</FormLabel>
              
<FormField
  control={form.control}
  name="resume"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Upload CV</FormLabel>
      <FormControl>
      <FileUpload
  onChange={field.onChange}
  value={field.value}
  disabled={pending}
  className="w-full"
>
          <p>Drag and drop your CV here or click to upload</p>
          <p className="text-sm text-slate-400">Supports PDF files</p>
        </FileUpload>
      </FormControl>
      <FormDescription>Upload your CV in PDF format</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Location & Preferences */}
        <div className="space-y-4">
          <h2 className="font-semibold text-xl">Location & Preferences</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City, Country" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Work Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="City, Country" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="remotePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remote Flexibility</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Key Skills & Certifications */}
        <div className="space-y-4">
          <h2 className="font-semibold text-xl">Key Skills & Certifications</h2>

          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience / Career Level</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {field.value.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                        >
                          <span>{skill}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="hover:bg-transparent p-0 w-4 h-4"
                            onClick={() => {
                              const newSkills = [...field.value];
                              newSkills.splice(index, 1);
                              field.onChange(newSkills);
                            }}
                          >
                            <XIcon className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (currentSkill.trim()) {
                              field.onChange([...field.value, currentSkill.trim()]);
                              setCurrentSkill("");
                            }
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          if (currentSkill.trim()) {
                            field.onChange([...field.value, currentSkill.trim()]);
                            setCurrentSkill("");
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Certifications</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  appendCert({
                    name: "",
                    issuer: "",
                    year: new Date().getFullYear(),
                    url: "",
                  })
                }
              >
                <PlusCircleIcon className="mr-2 w-4 h-4" />
                Add Certification
              </Button>
            </div>

            {certFields.map((field, index) => (
              <Card key={field.id}>
                <CardContent className="pt-6">
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certification Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="AWS Solutions Architect" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`certifications.${index}.issuer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issuing Organization</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Amazon Web Services" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`certifications.${index}.year`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`certifications.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Certificate URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="https://..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => removeCert(index)}
                  >
                    <XIcon className="mr-2 w-4 h-4" />
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational Background */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl">Educational Background</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendEducation({
                  degree: "",
                  institution: "",
                  year: new Date().getFullYear(),
                  fieldOfStudy: "",
                })
              }
            >
                <PlusCircleIcon className="mr-2 w-4 h-4" />
              Add Education
            </Button>
          </div>

          {educationFields.map((field, index) => (
            <Card key={field.id}>
              <CardContent className="pt-6">
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`education.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Bachelor's in..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="University name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.year`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`education.${index}.fieldOfStudy`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Computer Science" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => removeEducation(index)}
                >
                    <XIcon className="mr-2 w-4 h-4" />
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Employment Preferences */}
        <div className="space-y-4">
          <h2 className="font-semibold text-xl">Employment Preferences</h2>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="availabilityPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability / Notice Period (Days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="30"
                    />
                  </FormControl>
                  <FormDescription>
                    Number of days until you can start
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedSalaryMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Salary (Max)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Maximum Salary"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value ? Number(e.target.value) : undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedSalaryMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Salary (Min)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Minimum Salary"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value ? Number(e.target.value) : undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="desiredEmployment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Desired Employment Type / Work Arrangement
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Additional Information - NEW SECTION */}
        <div className="space-y-4">
          <h2 className="font-semibold text-xl">Additional Information</h2>

         <FormField
  control={form.control}
  name="availableFrom"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Available From</FormLabel>
      <FormControl>
        <Input type="date" {...field} value={field.value || ""} />
      </FormControl>
      <FormDescription>
        Select the date when you are available to start.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>


          <FormField
            control={form.control}
            name="previousJobExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Job Experience</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Detail your previous job experience..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This data cannot be reversed. Write down correctly.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

   <FormField
  control={form.control}
  name="willingToRelocate"
  render={({ field }) => (
    <FormItem className="flex items-center space-x-2">
      <FormControl>
        <Input
          type="checkbox"
          checked={field.value ?? false}  // Fallback to false if null or undefined
          onChange={(e) => field.onChange(e.target.checked)}
        />
      </FormControl>
      <FormLabel>Willing to Relocate</FormLabel>
      <FormMessage />
    </FormItem>
  )}
/>

        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full"
        >
          {pending ? (
            <>
                <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
      </Form>
    
  );
}