export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen w-full bg-muted/40">{children}</div>;
}
