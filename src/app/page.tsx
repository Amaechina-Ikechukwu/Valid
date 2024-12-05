import LandingPage from "@/components/Landing/LandingPage";
import { BackgroundBeams } from "@/components/UI/BackgroundBeams";
import Image from "next/image";
import Logo from "@/app/Valid logo.png";
import Description from "@/components/Landing/Description";
import HowItWorks from "@/components/Landing/HowItWorks";
import { BackgroundGradientAnimation } from "../components/UI/BackgroundGradientAnimation";
import Testimonials from "@/components/Landing/Testimonials";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <header>
        <Image alt="Valid" src={Logo} width={100} className="relative z-10" />
      </header>
      <main className=" mt-[140px] space-y-4 bg-white w-full">
        <BackgroundBeams />
        <LandingPage />
        <div id="description">
          <Description />
        </div>

        <div className=" relative z-10">
          <HowItWorks />
        </div>
        <div className=" relative z-20">
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl space-y-4">
              <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                What makes VALID special?
              </p>
              <h4 className="text-2xl text-white text-center">
                Though the money is sent, the control is still in your hands.
              </h4>
              <h5 className="text-xl text-white text-center">
                Only your approval allows the withdrawal of contributed funds.
              </h5>
            </div>
          </BackgroundGradientAnimation>
        </div>
        <div className="mt-8">
          <Testimonials />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
