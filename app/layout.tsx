import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beier Luo • Do Something Amazing",
  description:
    "Beier (Bale) Luo's personal academic website and research portfolio in trustworthy machine learning.",
  icons: { icon: "/assets/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
