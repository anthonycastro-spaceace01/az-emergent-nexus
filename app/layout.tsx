import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AZ Emergent Nexus / HyperCross",
  description: "HyperCross applications and browser-based experiences from AZ Emergent Nexus.",
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
