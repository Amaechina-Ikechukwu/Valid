import HomeComponent from "@/components/Home/HomeComponent";
import LoginComponent from "@/components/LoginComponent";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    return <LoginComponent />;
  }
  return (
    <div className="text-5xl font-bold text-fuchsia-500">
      <HomeComponent />
    </div>
  );
}
