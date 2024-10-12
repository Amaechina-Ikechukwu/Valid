import { SignedOut, SignInButton } from "@clerk/nextjs";

export default async function LoginComponent() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className=" shadow-xl  space-y-3 p-4 flex flex-col items-center justify-center rounded-lg  w-full">
        <h1 className="text-5xl text-fuchsia-600 font-bold">Valid</h1>
        <h5 className="text-zinc-600"> – Your Trusted Financial Trustee</h5>

        <SignedOut>
          <SignInButton>
            <div className=" btn large bg-zinc-900 p-2 rounded-lg text-white w-full flex flex-col items-center justify-center focus:bg-zinc-700 hover:bg-fuchsia-300">
              <p>Sign in to continue</p>
            </div>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
