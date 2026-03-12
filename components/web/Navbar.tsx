"use client";

import Image from "next/image";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import Signin from "./AuthComponents/LoginButton";
import LogoutButton from "./AuthComponents/LogoutButton";
import { useConvexAuth } from "convex/react";
import BookConsultationButton from "./BookConsultationButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Our Firm", href: "/about-us" },
    { title: "Practise Areas", href: "/practise-areas" },
    { title: "Legal Updates", href: "/legalupdates" },
    { title: "Reach Us", href: "/contact" },
  ];

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 px-4">
      <div
        className="max-w-6xl mx-auto flex items-center justify-between 
        bg-white/50 border border-primary/20 backdrop-blur-md 
      rounded-2xl p-3 dark:bg-white/10"
      >
        <a href="">
          <Image
            src="images/logo.svg"
            alt="Finest Attorneys"
            width={260}
            height={70}
            className="h-12 md:h-12 w-auto"
          />
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {navLinks.map((link) => (
            <a
              href={link.href}
              key={link.title}
              className="text-gray-800 dark:text-gray-100 hover:text-primary 
               transition duration-300"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <BookConsultationButton />
          {/* {isAuthenticated ? <LogoutButton /> : <Signin />} */}
        </div>
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {navLinks.map((link) => (
          <a key={link.title} href={link.href} onClick={() => setIsOpen(false)}>
            {link.title}
          </a>
        ))}

        {/* {isAuthenticated ? <LogoutButton /> : <Signin />} */}
        <BookConsultationButton />
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-md bg-white p-2 text-gray-800 ring-white active:ring-2"
        >
          <XIcon />
        </button>
      </div>
    </nav>
  );
}
