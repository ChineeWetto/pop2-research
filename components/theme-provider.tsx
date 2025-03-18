/**
 * @fileoverview Theme provider component that manages the application's theme state
 * Uses next-themes for SSR-compatible theme management with system preference support
 */

"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

/**
 * Theme provider component that wraps the application to provide theme context
 * Supports light, dark, and system themes with SSR compatibility
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
