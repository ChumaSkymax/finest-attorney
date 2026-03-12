import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import SoftBackdrop from "@/components/web/softBackdrop";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { cookies } from "next/headers";
import { ConvexClientProvider } from "@/components/web/ConvexClientComponents/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { ConsultationModalProvider } from "@/context/ConsultationModalContext";
import BookConsultation from "@/components/web/BookConsultation";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Finest Attorneys",
  description: "A full service law firm based in Dar es Salaam, Tanzania",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConsultationModalProvider>
            {/* <SoftBackdrop /> */}
            <main className="min-h-screen w-full  ">
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </main>
            <BookConsultation />
            <Toaster />
          </ConsultationModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
