import Layout from "@/components/Home/Layout";

export default function FunctionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center justify-center h-screen md:h-full ">
      <div className="artboard phone-1 md:phone-2 p-4">
        <Layout>{children}</Layout>
      </div>
    </main>
  );
}
