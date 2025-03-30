import { ArrowRightIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { BlurText } from "../ui/blur-text";
import { Button } from "../ui/button";
import Image from "next/image";
import Container from "../global/container";



const Hero = () => {
    return (
        <div>
         
            <div className="flex flex-col items-center text-center w-full max-w-5xl my-24 mx-auto z-40 relative">
                <Container delay={0.1}
       // Longer duration for smoother animation
  reverse={false} // Animate from bottom to top
  simple={true}   >
                <div className="pl-4 pr-3 py-2.5 rounded-full border border-foreground/5 hover:border-foreground/15 backdrop-blur-2xl cursor-pointer flex items-center gap-3 select-none w-max mx-auto group hover:bg-gradient-to-r hover:from-black/5 hover:to-transparent transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.2)]">
  <div className="relative w-5 h-5">
    {/* Animated ring */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-[spin_4s_linear_infinite] blur-sm opacity-70"></div>
    {/* Inner circle */}
    <div className="absolute inset-0.5 rounded-full bg-black flex items-center justify-center">
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
       
      </div>
    </div>
  </div>
  <span className="inline-flex items-center justify-center gap-3 animate-text-gradient bg-clip-text text-xl font-black text-transparent relative bg-[linear-gradient(to_right,theme(colors.indigo.500),theme(colors.purple.500),theme(colors.pink.500),theme(colors.indigo.500))] bg-[length:200%_auto] animate-[shimmer_2s_infinite]">
    AI-Powered Talent Verification
    <span className="text-xs px-2.5 py-1.5 rounded-full bg-gradient-to-r from-blue-900/80 to-blue-800/80 flex items-center justify-center font-black group-hover:from-indigo-600/80 group-hover:to-purple-600/80 transition-all duration-500 backdrop-blur-md shadow-inner">
      <span className="text-white/90 group-hover:text-white transition-colors duration-300">100% Human</span>
      <ArrowRightIcon className="w-3.5 h-3.5 ml-1.5 text-white/70 group-hover:text-white/90 group-hover:translate-x-0.5 transition-all duration-300" />
    </span>
  </span>
</div>
                </Container>
                <BlurText
                    word={"Find the right talent\n without the noise"}
                    className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent py-2 md:py-0 lg:!leading-snug font-medium tracking-[-0.0125em] mt-6 font-heading"
                />
               {/* Heading Container - Dramatic entrance */}
               <Container 
                    delay={0.2}
                   
                    reverse={true}
                >
                    <p className="text-sm sm:text-base lg:text-lg mt-4 text-accent-foreground/60 max-w-2xl mx-auto backdrop-blur-sm py-2 px-4 rounded-full">
                        Every candidate is ID-verified and skill-tested. Our AI matches candidates to your exact job requirements. <span className="hidden sm:inline">Get detailed skill assessments and video introductions before the first interview.</span>
                    </p>
                </Container>
                <Container 
                    delay={0.3}
                   
                    simple={true}
                >
                    <div className="flex items-center justify-center gap-x-4 mt-8">
                        <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105">
                            <Link href="/main">
                                Post a job
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="backdrop-blur-md border-foreground/20 hover:border-foreground/40 hover:bg-white/5 transition-all duration-300 hover:scale-105">
                            <Link href="#">
                                View talent pool
                            </Link>
                        </Button>
                    </div>
                </Container>
                <Container 
                    delay={0.4}
                   
                    simple={true}
                >
                    <div className="relative mx-auto max-w-7xl rounded-xl lg:rounded-[32px]  bg-transparent md:p-4 mt-12  transition-all duration-500">
                        <div className="absolute top-1/4 left-1/2 -z-10 w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[10rem] bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>

                        <div className="rounded-lg lg:rounded-[24px] border p-2 border-neutral-800 bg-black/90 overflow-hidden group">
                            <Image
                                src="/images/dashboard.png"
                                alt="Recruiter dashboard showing candidate matches"
                                width={1920}
                                height={1080}
                                className="rounded-lg lg:rounded-[20px] opacity-90 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-[1.02]"
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Hero;