"use client"

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SparkleIcon,
  Github,
  Linkedin,
  Briefcase,
  ArrowRight
} from "lucide-react";
import { GithubResults } from "@/components/verification/github";
import { PortfolioResults } from "@/components/verification/portfolio";
import { UrlInputs, urlSchema } from "@/lib/validation";
import { fetchGithubData } from "@/services/githubService";
import { fetchPortfolioData } from "@/services/portfolioService";

const Index = () => {
  const { toast } = useToast();
  const [urls, setUrls] = useState<Partial<UrlInputs>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [githubData, setGithubData] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => { async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const validatedUrls = await urlSchema.parseAsync(urls);

      if (validatedUrls.github) {
        const data = await fetchGithubData(validatedUrls.github);
        setGithubData(data);
        toast({
          title: "Success",
          description: "GitHub data fetched successfully!",
        });
      }

      if (validatedUrls.portfolio) {
        toast({
          title: "Processing",
          description: "Analyzing portfolio data with Gemini AI...",
        });

        try {
          // Check for fresh cache (less than 24 hours old)
          const cachedData = localStorage.getItem(
            `portfolio_${validatedUrls.portfolio}`
          );
          const cachedAnalysis = localStorage.getItem(
            `portfolio_analysis_${validatedUrls.portfolio}`
          );
          const cacheTimestamp = localStorage.getItem(
            `portfolio_timestamp_${validatedUrls.portfolio}`
          );

          const isCacheValid =
            cacheTimestamp &&
            Date.now() - parseInt(cacheTimestamp) < 24 * 60 * 60 * 1000;

          if (cachedData && cachedAnalysis && isCacheValid) {
            setPortfolioData({
              data: JSON.parse(cachedData),
              analysis: JSON.parse(cachedAnalysis),
            });
            toast({
              title: "Success",
              description: "Portfolio data loaded from recent cache!",
            });
          } else {
            const data = await fetchPortfolioData(validatedUrls.portfolio);
            setPortfolioData(data);

            // Store cache timestamp
            localStorage.setItem(
              `portfolio_timestamp_${validatedUrls.portfolio}`,
              Date.now().toString()
            );

            toast({
              title: "Success",
              description:
                "Portfolio analyzed with Gemini AI successfully!",
            });
          }
        } catch (error) {
          console.error("Portfolio analysis error:", error);
          toast({
            variant: "destructive",
            title: "Analysis Error",
            description: "Failed to analyze portfolio. Please try again.",
          });
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: error.errors[0].message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch data. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (type: keyof UrlInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrls((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const renderIcon = (type: string): React.ReactNode => {
    const iconProps = { className: "h-5 w-5 text-zinc-400 group-hover:text-violet-400 transition-colors" };
    switch (type) {
      case "github": return <Github {...iconProps} />;
      case "linkedin": return <Linkedin {...iconProps} />;
      case "portfolio": return <Briefcase {...iconProps} />;
      default: return <SparkleIcon {...iconProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/5 via-zinc-900/25 to-black pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Web Analysis
            </h1>
            <p className="text-lg text-zinc-400">
              Analyze your digital presence with AI-powered insights
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6">
              {(["github", "linkedin", "portfolio"] as const).map((type) => (
                <Card 
                  key={type}
                  className={`group relative overflow-hidden border-0 bg-zinc-900/50 backdrop-blur-xl transition-all duration-300
                    ${activeField === type ? 'ring-2 ring-violet-500/50 shadow-lg shadow-violet-500/10' : 'hover:bg-zinc-800/50'}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      {renderIcon(type)}
                      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200">
                        {type}
                      </h2>
                    </div>
                    <div className="relative">
                      <Input
                        type="url"
                        placeholder={`Enter ${type} URL`}
                        value={urls[type] || ""}
                        onChange={handleUrlChange(type)}
                        onFocus={() => setActiveField(type)}
                        onBlur={() => setActiveField(null)}
                        className="w-full bg-black/20 border-zinc-800 text-zinc-100 placeholder-zinc-500
                          focus:border-violet-500/50 focus:ring-violet-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full group relative overflow-hidden rounded-lg bg-violet-500 px-8 py-4 transition-all
                hover:bg-violet-600 disabled:opacity-50 disabled:hover:bg-violet-500"
            >
              <div className="relative flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <SparkleIcon className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </Button>
          </form>

          {/* Results */}
          <div className="space-y-8">
            {githubData && (
              <div className="transform transition-all duration-500 hover:scale-[1.01]">
                <GithubResults data={githubData} />
              </div>
            )}
            {portfolioData && (
              <div className="transform transition-all duration-500 hover:scale-[1.01]">
                <PortfolioResults 
                  data={portfolioData.data}
                  analysis={portfolioData.analysis}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
};

export default Index;