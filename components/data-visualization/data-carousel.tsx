"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, BarChart, LineChartIcon, Dna } from "lucide-react"
import ExpressionKineticsChart from "./expression-kinetics-chart"
import TemperatureEffectsChart from "./temperature-effects-chart"
import ProteinStructureViewer from "./protein-structure-viewer"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

type Slide = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  component: React.ReactNode
}

export default function DataCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [direction, setDirection] = useState(0)

  const slides: Slide[] = [
    {
      id: "expression",
      title: "Expression Kinetics",
      description: "Time-course analysis of POP2 expression in E. coli and yeast systems",
      icon: <LineChartIcon className="h-5 w-5" />,
      component: <ExpressionKineticsChart />,
    },
    {
      id: "temperature",
      title: "Temperature Effects",
      description: "Impact of temperature on expression efficiency in both systems",
      icon: <BarChart className="h-5 w-5" />,
      component: <TemperatureEffectsChart />,
    },
    {
      id: "structure",
      title: "Protein Structure",
      description: "Interactive 3D visualization of the human POP2 protein",
      icon: <Dna className="h-5 w-5" />,
      component: <ProteinStructureViewer />,
    },
  ]

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 10000) // Change slide every 10 seconds

    return () => clearInterval(interval)
  }, [autoplay, nextSlide])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navigation buttons */}
      <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-primary/30"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide content */}
      <div className="w-full h-full bg-muted border border-border rounded-xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="h-full flex flex-col">
              <div className="p-3 border-b border-border bg-background/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {slides[currentIndex].icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{slides[currentIndex].title}</h3>
                    <p className="text-xs text-muted-foreground">{slides[currentIndex].description}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-3 overflow-hidden">{slides[currentIndex].component}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

