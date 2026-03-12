import AppSidebar from "@/components/Dashboard/AppSidebar";
import Navbar from "@/components/Dashboard/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <div className="flex min-h-screen w-full ">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
