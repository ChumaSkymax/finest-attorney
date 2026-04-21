import Footer from "@/components/web/Footer";
import Navbar from "@/components/web/Navbar";

import PagePadding from "@/components/web/PagePadding";

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <PagePadding>{children}</PagePadding>
      <Footer />
    </>
  );
}
