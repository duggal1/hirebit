"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";

import CompanyForm from "./CompanyForm";

import Image from "next/image";
import Logo from "@/public/logo.png";
import UserTypeSelection from "./UserTypeSelection";
import JobSeekerForm from "./JobSeekerForm";

type UserType = "company" | "jobSeeker" | null;

export default function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setStep(2);
  };

  const handleOnboardingComplete = () => {
    // Redirect to main page after onboarding is completed
    router.push("/main");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeSelection onSelect={handleUserTypeSelect} />;
      case 2:
        return userType === "company"
          ? <CompanyForm onComplete={handleOnboardingComplete} />
          : <JobSeekerForm onComplete={handleOnboardingComplete} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-10">
        <Image src={Logo} alt="JobMarshal Logo" width={80} height={80} />
        <div className="text-6xl text-white font-black">
            Hire
            <span className="text-blue-600">bit</span>
          </div>
      </div>
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">{renderStep()}</CardContent>
      </Card>
    </>
  );
}