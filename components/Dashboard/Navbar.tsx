import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DropdownMenuAvatar from "./NavbarComponents/DropdownMenuAvatar";
import { ThemeToggle } from "@/components/web/theme-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="py-4 px-6 flex items-center justify-between sticky top-0 bg-transparent z-10">
      {/* LEFT */}
      <SidebarTrigger />

      {/* RIGHT  */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <ThemeToggle />
        <DropdownMenuAvatar />
      </div>
    </nav>
  );
}
