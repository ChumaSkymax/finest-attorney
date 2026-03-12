import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="flex flex-col items-center justify-around w-full
        py-16 text-sm border-t border-border
        bg-primary text-white
        dark:bg-[#000000] dark:text-gray-300"
    >
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 px-4">
        <Link
          href="/about-us"
          className="font-medium text-white/70 hover:text-white transition-all duration-300"
        >
          Our Background
        </Link>
        <Link
          href="/practise-areas"
          className="font-medium text-white/70 hover:text-white transition-all duration-300"
        >
          Practise Areas
        </Link>
        <Link
          href="/legalupdates"
          className="font-medium text-white/70 hover:text-white transition-all duration-300"
        >
          Legal Updates
        </Link>
        <Link
          href="/contact"
          className="font-medium text-white/70 hover:text-white transition-all duration-300"
        >
          Get in Touch
        </Link>
      </div>
      <div className="flex items-center gap-4 mt-8 text-white/60">
        <a
          href="#"
          className="hover:-translate-y-0.5 hover:text-white transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a
          href="#"
          className="hover:-translate-y-0.5 hover:text-white transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a
          href="#"
          className="hover:-translate-y-0.5 hover:text-white transition-all duration-300"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a
          href="#"
          className="hover:-translate-y-0.5 hover:text-white transition-all duration-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.153h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
      <p className="mt-8 text-center text-white/50">
        Copyright © {new Date().getFullYear()}{" "}
        <Link
          href="/"
          className="text-white/70 hover:text-white transition-colors"
        >
          Finest Attorneys
        </Link>
        . All rights reserved.
      </p>
    </footer>
  );
}
