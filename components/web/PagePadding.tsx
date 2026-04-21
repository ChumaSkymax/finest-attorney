"use client";

import { usePathname } from "next/navigation";

export default function PagePadding({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/home";

  return <div style={{ paddingTop: isHome ? "0" : "240px" }}>{children}</div>;
}
