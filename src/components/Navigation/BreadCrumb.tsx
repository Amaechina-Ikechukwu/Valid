"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BreadCrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  return (
    <div className="breadcrumbs w-full max-w-xs text-sm break-words">
      <ul className="flex flex-wrap space-x-2">
        {pathArray.map((path, index) => {
          const href = `/${pathArray.slice(0, index + 1).join("/")}`;
          if (path.includes("-")) {
            path = path.split("-")[0];
          }
          if (path == "feature") {
            path = "home";
          }
          return (
            <li key={path}>
              <Link href={href}>{path.toUpperCase()}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
