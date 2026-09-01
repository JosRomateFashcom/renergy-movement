import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renergy Movement | Rens van Zoelen",
  description: "Rens van Zoelen brengt mensen in beweging als host, presentator, dagvoorzitter en spreker.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
