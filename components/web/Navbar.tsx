"use client";

import Image from "next/image";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import Signin from "./AuthComponents/LoginButton";
import LogoutButton from "./AuthComponents/LogoutButton";
import { useConvexAuth, useQuery } from "convex/react";
import BookConsultationButton from "./BookConsultationButton";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";

const HERO_BG_URL =
  "https://amicable-spaniel-706.eu-west-1.convex.cloud/api/storage/29664e23-fc8d-452e-8861-c0ce69706f98";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();
  const currentUser = useQuery(api.users.getCurrentUser);
  const isAdmin = isAuthenticated && currentUser?.role === "admin";
  const pathname = usePathname();

  // Home page gets the floating pill; all other pages get the full-width banner
  const isHome = pathname === "/" || pathname === "/home";

  // Both layouts now use a white pill — always use primary-colored text
  const linkClass = "text-primary dark:text-primary hover:opacity-70";
  const menuBtnClass =
    "border-primary text-primary hover:bg-primary hover:text-white";

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Our Firm", href: "/about-us" },
    { title: "Practise Areas", href: "/practise-areas" },
    { title: "People", href: "/our-team" },
    // { title: "LEGAL UPDATES", href: "/legalupdates" },
    { title: "Contact Us", href: "/contact" },
  ];

  const navRowContent = (
    <>
      {/* Logo */}
      <a href="/">
        <Image
          src="/images/logo.svg"
          alt="Finest Attorneys"
          width={260}
          height={70}
          className="h-20 w-auto"
        />
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {navLinks.map((link) => (
          <a
            href={link.href}
            key={link.title}
            className={`text-base font-playfair-display font-semibold transition duration-300 ${linkClass}`}
          >
            {link.title}
          </a>
        ))}
      </div>

      {/* Desktop actions */}
      <div className="hidden md:flex items-center gap-3">
        <ThemeToggle />
        {isAdmin && (
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Dashboard
          </Link>
        )}
        {isAuthenticated ? <LogoutButton /> : <Signin />}
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg border transition-colors ${menuBtnClass}`}
          aria-label="Open menu"
        >
          <MenuIcon className="size-5" />
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── Home: floating rounded pill ───────────────────────── */}
      {isHome && (
        <nav className="fixed top-5 left-0 right-0 z-50 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between bg-white border border-primary/20 backdrop-blur-md rounded-2xl p-3 dark:bg-white/50">
            {navRowContent}
          </div>
        </nav>
      )}

      {/* ── Other pages: full-width hero-image banner ───── */}
      {!isHome && (
        <nav
          className="fixed top-0 left-0 right-0 z-50 w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${HERO_BG_URL}')`,
            height: "208px",
            minHeight: "208px",
          }}
        >
          {/* no overlay — bg image stays fully visible */}
          <div
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center py-6"
            style={{ height: "208px" }}
          >
            {/* White pill floating over the bg image */}
            <div className="w-full flex items-center justify-between bg-white border border-primary/20 backdrop-blur-md rounded-2xl px-4 py-3 shadow-md dark:bg-white/90">
              {navRowContent}
            </div>
          </div>
        </nav>
      )}

      {/* ── Mobile slide-in drawer (shared by both layouts) ────── */}
      <div
        className={`flex flex-col items-center justify-center gap-6 text-lg font-medium fixed inset-0 bg-black/40 backdrop-blur-md z-[60] transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.title}
            href={link.href}
            className="text-white hover:text-primary transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            {link.title}
          </a>
        ))}

        <BookConsultationButton />
        {isAdmin && (
          <Link
            href="/dashboard"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Dashboard
          </Link>
        )}
        {isAuthenticated ? <LogoutButton /> : <Signin />}
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-lg border border-primary bg-white p-2 text-primary hover:bg-primary hover:text-white transition-colors active:scale-95"
          aria-label="Close menu"
        >
          <XIcon className="size-5" />
        </button>
      </div>
    </>
  );
}
