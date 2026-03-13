import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regnskogfondet",
  description: "Beskytt verdens regnskoger",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
