import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sigma University | Portal",
  description: "Academic ERP & Attendance Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}