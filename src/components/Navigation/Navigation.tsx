import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import BreadCrumb from "./BreadCrumb";

export default async function Navigation() {
  const user = await currentUser();
  if (user) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <BreadCrumb />
        </div>
        <div>
          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    );
  }
}
