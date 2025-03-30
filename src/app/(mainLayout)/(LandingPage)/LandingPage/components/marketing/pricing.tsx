"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PLANS } from "@/src/app/(mainLayout)/(LandingPage)/LandingPage/constants";
import { cn } from "@/src/app/(mainLayout)/(LandingPage)/LandingPage/functions";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import Container from "../global/container";
import { Button } from "../ui/button";
import NumberTicker from "../ui/number-ticker";
import { SectionBadge } from "../ui/section-bade";



const RECRUITER_PLANS = [
    {
        id: "starter",
        title: "Starter",
        desc: "Perfect for small teams starting their hiring journey",
        monthlyPrice: 0,
        yearlyPrice: 0,
        buttonText: "Start Free",
        features: [
            "Up to 3 active job posts",
            "Basic candidate verification",
            "Email support",
            "Basic candidate matching",
            "48-hour response time"
        ]
    },
    {
        id: "pro",
        title: "Professional",
        desc: "For growing teams who need serious hiring power",
        monthlyPrice: 99,
        yearlyPrice: 990,
        buttonText: "Start Hiring",
        features: [
            "Unlimited job posts",
            "Triple-layer verification",
            "AI-powered candidate matching",
            "24-hour candidate response guarantee",
            "Custom hiring pipeline",
            "Advanced analytics dashboard",
            "Priority support"
        ]
    },
    {
        id: "enterprise",
        title: "Enterprise",
        desc: "Custom solutions for large-scale hiring needs",
        monthlyPrice: 299,
        yearlyPrice: 2990,
        buttonText: "Contact Sales",
        features: [
            "Everything in Pro",
            "Custom verification process",
            "Dedicated account manager",
            "Custom AI matching rules",
            "API access",
            "Advanced team collaboration",
            "Custom analytics"
        ]
    }
];


type Plan = "monthly" | "yearly";

const Pricing = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 lg:py-32 w-full relative">
      
        <Container
        
      
        
        >
            <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                <SectionBadge title="Recruitment Plans" />
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black !leading-snug mt-6  text-gray-950 dark:text-white/90">
                    Choose Your Hiring Power
                </h2>
                <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
                    Start with verified candidates today. Scale as you grow.
                </p>
            </div>
        </Container>
       
            <div className="mt-8 w-full relative flex flex-col items-center justify-center">
                <div className="absolute hidden lg:block top-1/2 right-2/3 translate-x-1/4 -translate-y-1/2 w-96 h-96 bg-primary/15 blur-[10rem] -z-10"></div>
                <div className="absolute hidden lg:block top-1/2 left-2/3 -translate-x-1/4 -translate-y-1/2 w-96 h-96 bg-violet-500/15 blur-[10rem] -z-10"></div>
                <Container>
                    <Tabs defaultValue="monthly" className="w-full flex flex-col items-center justify-center">
                        <TabsList>
                            <TabsTrigger value="monthly">
                                Monthly
                            </TabsTrigger>
                            <TabsTrigger value="yearly">
                                Yearly
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="monthly">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-14">
                                {PLANS.map((plan, index) => (
                                    <Plan
                                        key={index}
                                        index={index}
                                        {...plan}
                                        plan="monthly"
                                    />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="yearly">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-14">
                                {PLANS.map((plan, index) => (
                                    <Plan
                                        key={index}
                                        index={index}
                                        {...plan}
                                        plan="yearly"
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </Container>
            </div>
        </div>
    )
};

const Plan = ({
    id,
    title,
    desc,
    monthlyPrice,
    yearlyPrice,
    buttonText,
    features,
    index,
    plan,
}: {
    id: string;
    title: string;
    desc: string;
    monthlyPrice: number;
    yearlyPrice: number;
    buttonText: string;
    features: string[];
    index: number;
    plan: Plan;
}) => {

    const getDisplayedPrice = (plan: string, monthlyPrice: number, yearlyPrice: number) => {
        if (plan === "monthly") {
            return monthlyPrice === 0 ? 0 : monthlyPrice;
        } else if (plan === "yearly") {
            const discountedPrice = Math.round((yearlyPrice * 0.8) / 12);
            return yearlyPrice === 0 ? 0 : discountedPrice;
        }
        return 0;
    };

    const displayedPrice = getDisplayedPrice(plan, monthlyPrice, yearlyPrice);

    return (
        <div key={index} className="w-full relative flex flex-col saturate-150 rounded-2xl group hover:scale-[1.02] transition-all duration-500">
            <div className="absolute inset-0 bg-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div
                className={cn(
                    "flex flex-col size-full border rounded-2xl relative p-3",
                    "bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-xl",
                    "border-blue-950/20 hover:border-violet-500/30",
                    "transition-all duration-500",
                    id === "pro" ? "border-violet-500/50" : "border-border/60",
                )}
            >
                {id === "pro" && (
                    <div className="max-w-fit min-w-min inline-flex items-center whitespace-nowrap px-1 h-7 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 absolute -top-3 left-1/2 -translate-x-1/2 select-none">
                        <span className="flex-1 text-sm px-2 font-medium text-white animate-shimmer">
                            Most Popular
                        </span>
                    </div>
                )}
                <div className="flex flex-col p-3 w-full">
                    <h2 className="text-xl font-medium">
                        {title}
                    </h2>
                    <p className="text-sm mt-2 text-muted-foreground break-words">
                        {desc}
                    </p>
                </div>
                <hr className="shrink-0 border-none w-full h-px bg-border" role="separator" />
                <div className="relative flex flex-col flex-1 align-top w-full p-3 h-full break-words text-left gap-4">
                    <div className="flex items-end gap-2">
                        <div className="flex items-end gap-1 w-40">
                            <span className="text-2xl md:text-2xl font-semibold text-gray-950 font-heading dark:text-white">
                                ${displayedPrice === 0 ? 0 : <NumberTicker value={displayedPrice} />}
                            </span>
                            {/* In here 120 * 0.8 = 96 and /12 to get monthly price */}
                            <span className="text-md text-muted-foreground font-medium font-headin">
                                per {plan === "monthly" ? "month" : "month"}
                            </span>
                        </div>
                        <AnimatePresence>
                            {(id !== "free" && plan === "yearly") && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ duration: 0.2 }}
                                    aria-hidden="true"
                                    className="text-xs px-2 py-0.5 rounded mb-1 text-white/90 bg-gradient-to-br from-blue-600 to-cyan-500 dark:bg-gradient-to-tr dark:from-violet-600 dark:to-blue-500 font-medium"
                                >
                                    -20%
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                    <ul className="flex flex-col gap-2">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <CheckIcon aria-hidden="true" className="w-5 h-5 text-primary" />
                                <p className="text-sm md:text-base text-muted-foreground">
                                    {feature}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-3 mt- h-auto flex w-full items-center">
                    <Button
                        asChild
                        variant={id === "pro" ? "default" : "tertiary"}
                        className="w-full hover:scale-100 hover:translate-y-0  bg-blue-600  dark:bg-blue-700 dark:text-white shadow-noneshadow-none"
                    >

                        <Link href={""}>
                            {buttonText}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default Pricing
