/**
 * @fileoverview Main page component presenting the research project findings
 * Implements streaming and suspense boundaries for optimal loading performance
 */

"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Microscope,
  FlaskRoundIcon as Flask,
  Dna,
  Users,
  GraduationCap,
  BarChart,
  Download,
  FileText,
} from "lucide-react"
import DataHighlights from "@/components/data-highlights"
import ResearchSummary from "@/components/research-summary"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Static content for the page
const CONTENT = {
  title: "POP2 Expression Research",
  subtitle: "Comparative Analysis in E. coli and Yeast Systems",
  cta: {
    primary: "View Full Results",
    secondary: "Download Data"
  }
} as const

/**
 * Main page component using React Server Components by default
 * Implements streaming for improved performance and user experience
 */
export default async function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-heading tracking-tighter">
          {CONTENT.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {CONTENT.subtitle}
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" variant="default">
            {CONTENT.cta.primary}
          </Button>
          <Button size="lg" variant="outline">
            {CONTENT.cta.secondary}
          </Button>
        </div>
      </section>

      <Suspense 
        fallback={
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        }
      >
        <ResearchSummary />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(null).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        }
      >
        <DataHighlights />
      </Suspense>
    </main>
  )
}

