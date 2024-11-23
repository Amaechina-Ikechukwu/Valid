import LandingPage from "@/components/Landing/LandingPage";
import { BackgroundBeams } from "@/components/UI/BackgroundBeams";
import Image from "next/image";
import Logo from "@/app/Valid logo.png";

export default function Home() {
  return (
    <div className="">
      <header>
        <Image alt="Valid" src={Logo} width={100} className="relative z-10" />
      </header>
      <main className=" mt-[140px] space-y-4 bg-white">
        <BackgroundBeams />
        <LandingPage />
        <div className="w-full bg-gradient h-8 relative z-4" />
        <div className="w-full bg-white">
          <h3 className="relative z-20 text-3xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600 md:w-3/6  font-josefin font-bold">
            It's designed to facilitate collective funding efforts where
            participants may not have a pre-existing trusted individual to
            manage the pooled funds.
          </h3>
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
