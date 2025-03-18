/**
 * @fileoverview Root layout component that wraps all pages in the application.
 * Provides global fonts, theme configuration, and basic HTML structure.
 */

import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

// Configure the Inter font with Latin subset for primary text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimize font loading
  preload: true,
})

// Configure Space Grotesk font with Latin subset for headings
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap", // Optimize font loading
  preload: true,
})

// Define metadata for SEO and page information using Next.js 14 metadata API
export const metadata: Metadata = {
  title: "POP2 Expression Research | CSU",
  description: "Comparative analysis of human POP2 protein expression in E. coli and yeast systems",
  generator: "v0.dev",
  applicationName: "POP2 Research",
  keywords: ["POP2", "protein expression", "E. coli", "yeast", "research", "CSU"],
  authors: [{ name: "CSU Research Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
}

/**
 * Root layout component that provides the basic HTML structure and global providers
 * Uses Next.js App Router and Server Components by default
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={cn(
        "scroll-smooth",
        "antialiased",
        "min-h-screen",
        "bg-background",
        "font-sans"
      )}
    >
      <body 
        className={cn(
          inter.variable, 
          spaceGrotesk.variable,
          "min-h-screen",
          "antialiased",
          "bg-background",
          "font-sans"
        )}
      >
        {/* ThemeProvider enables dark/light mode switching with system preference support */}
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'