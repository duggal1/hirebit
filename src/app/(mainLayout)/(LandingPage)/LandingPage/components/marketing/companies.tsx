import Images from "../global/images";
import Marquee from "../ui/marquee";

const Companies = () => {
    return (
        <div className="flex w-full py-20">
            <div className="flex flex-col items-center justify-center text-center w-full py-2">
                <h2 className="text-5xl heading font-black text-neutral-900 dark:text-white ">
                    Companies that trust us 
                </h2>
                <div className="mt-16 w-full relative overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:30s]">
                        <div className="flex gap-8 md:gap-12">
                            <Images.company1 className="w-24 h-8" />
                            <Images.company2 className="w-24 h-8" />
                            <Images.company3 className="w-24 h-8" />
                            <Images.company4 className="w-24 h-8" />
                            <Images.company5 className="w-24 h-8" />
                            <Images.company6 className="w-24 h-8" />
                            <Images.company7 className="w-24 h-8" />
                            <Images.company8 className="w-24 h-8" />
                            <Images.company9 className="w-24 h-8" />
                            <Images.company10 className="w-24 h-8" />
                        </div>
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                </div>
            </div>
        </div>
    )
};

export default Companies
