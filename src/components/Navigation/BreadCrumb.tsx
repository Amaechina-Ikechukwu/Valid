"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BreadCrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter(Boolean);

  return (
    <div className="breadcrumbs max-w-xs text-sm">
      <ul>
        <li>
          <Link href="/">HOME</Link>
        </li>
        {pathArray.map((path, index) => {
          const href = `/${pathArray.slice(0, index + 1).join("/")}`;
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
