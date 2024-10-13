import Navigation from "@/components/Navigation/Navigation";

import { ClerkProvider } from "@clerk/nextjs";
export default async function FunctionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      {/* <AuroraBackground> */}
      <main className="flex items-center justify-center h-screen md:h-full ">
        <div className="artboard phone-1 md:phone-2 p-4">
          <div>
            <Navigation />
            <div className="divider"></div>
          </div>

          {children}
        </div>
      </main>
      {/* </AuroraBackground> */}
    </ClerkProvider>
  );
}
