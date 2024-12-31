import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Space_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const regularFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-regular",
  display: "swap",
  weight: "400",
});

const codeFont = Space_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Quad App - Documentation",
  description:
    "This comprehensive documentation for Quad App, crafted with Next.js and available as open-source, delivering a sleek and responsive design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${regularFont.variable} ${codeFont.variable} font-regular`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="sm:container mx-auto w-[88vw] h-auto">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
