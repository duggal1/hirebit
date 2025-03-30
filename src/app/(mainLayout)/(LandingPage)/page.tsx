
import { Background, Companies, Connect, Container, CTA, Features, Hero, Perks, Pricing, Reviews, Wrapper } from "./LandingPage/components";
import { Spotlight } from "./LandingPage/components/ui/spotlight";


const HomePage = () => {
    return (
   
            <Wrapper className="py-20 relative">
                 
                <Container  className="relative">
                <Spotlight
                        className="-top-40 left-0 md:left-60 md:-top-20"
                        fill="rgba(0, 122, 255, 0.5)" // Modern blue tone
                    />
             
                   
                    <Hero />
                </Container>
                <Container className="py-8 lg:py-20">
                    <Companies />
                </Container>
                <Connect />
                <Features />
                <Perks />
                <Pricing />
                <Reviews />
                <CTA />
            </Wrapper>
        
    )
};

export default HomePage
