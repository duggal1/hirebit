"use client";

import { ReactNode } from "react";
import { AutoSaveProvider } from "@/components/resume/src//context/AutoSaveContext";
import { Toaster } from "@/components/ui/toaster";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AutoSaveProvider>
      {children}
      <Toaster />
    </AutoSaveProvider>
  );
}
