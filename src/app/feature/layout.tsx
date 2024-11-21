import Layout from "@/components/Home/Layout";
import ValidLoader from "@/components/UI/ValidLoader";
import { Suspense } from "react";

export default function FunctionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center  ">
      <div className=" md:w-3/4 p-4">
        <Suspense fallback={<ValidLoader />}>
          <Layout>{children}</Layout>
        </Suspense>
      </div>
    </main>
  );
}
