import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DropdownMenuAvatar from "./NavbarComponents/DropdownMenuAvatar";
import { ThemeToggle } from "@/components/web/theme-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 px-4 pt-3">
      <nav
        className="py-3 px-6 flex items-center justify-between 
        max-w-5xl mx-auto bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md 
        border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm"
      >
        {/* LEFT */}
        <SidebarTrigger />

        {/* RIGHT  */}
        <div className="flex items-center gap-4">
          {/* <Link href="/dashboard">Dashboard</Link> */}
          <ThemeToggle />
          {/* <DropdownMenuAvatar /> */}
        </div>
      </nav>
    </div>
  );
}
