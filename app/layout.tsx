import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default:
      "US migration visualization · modified fork (Track Migrations)",
    template: "%s · migration viz",
  },
  description:
    "Modified fork of Track Migrations by Vikas Sabbi — same interactive map and editorial framing: where people crossed, where they settled, and why they came. Original project by Isabelle Reksopuro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-bg text-ink antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('scrollRestoration' in history) history.scrollRestoration = 'manual';`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
