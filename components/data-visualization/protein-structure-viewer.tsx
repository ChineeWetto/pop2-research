"use client"

import { useEffect, useRef, useState } from "react"
import * as NGL from "ngl"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Info, Download, Maximize2, RotateCw, ZoomIn, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the structure regions and their colors
const structureRegions = [
  {
    id: "binding-site",
    name: "Binding Site",
    residues: "50-60",
    color: "#ff4d4d",
    description: "Primary binding region for substrate interaction",
  },
  {
    id: "active-site",
    name: "Active Site",
    residues: "100-110",
    color: "#4d94ff",
    description: "Catalytic center responsible for enzymatic activity",
  },
  {
    id: "alpha-helix",
    name: "α-Helix Regions",
    residues: "10-40, 120-150",
    color: "#9c51b6",
    description: "Secondary structure elements forming helical patterns",
  },
  {
    id: "beta-sheet",
    name: "β-Sheet Regions",
    residues: "70-90, 160-180",
    color: "#66cc66",
    description: "Secondary structure elements forming sheet patterns",
  },
  {
    id: "c-terminus",
    name: "C-Terminus",
    residues: "190-200",
    color: "#ffcc00",
    description: "Carboxy-terminal region of the protein",
  },
]

interface ProteinStructureViewerProps {
  controlsMinimizable?: boolean
}

export default function ProteinStructureViewer({ controlsMinimizable = false }: ProteinStructureViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<string>("cartoon")
  const [colorScheme, setColorScheme] = useState<string>("chainname")
  const [showSurface, setShowSurface] = useState<boolean>(false)
  const [stage, setStage] = useState<any>(null)
  const [structure, setStructure] = useState<any>(null)
  const [activeRegions, setActiveRegions] = useState<Record<string, boolean>>({
    "binding-site": true,
    "active-site": true,
    "alpha-helix": false,
    "beta-sheet": false,
    "c-terminus": false,
  })
  const [isRotating, setIsRotating] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    let stageInstance: any = null

    async function initViewer() {
      try {
        setIsLoading(true)

        // Create NGL Stage object
        if (containerRef.current) {
          const container = containerRef.current as HTMLElement
          if (!container) {
            throw new Error("Container element not found")
          }
          stageInstance = new NGL.Stage(container, {
            backgroundColor: "white",
            quality: "medium",
          })
          setStage(stageInstance)
        }

        // Handle window resizing
        window.addEventListener("resize", () => {
          if (stageInstance) stageInstance.handleResize()
        })

        // Load PDB structure
        // Replace with your actual PDB file or ID
        const loadedStructure = await stageInstance.loadFile("rcsb://4IFP")
        setStructure(loadedStructure)

        // Add representation
        loadedStructure.addRepresentation("cartoon", {
          color: "chainname",
          opacity: 0.9,
          smoothSheet: true,
        })

        // Add surface representation
        if (showSurface) {
          loadedStructure.addRepresentation("surface", {
            opacity: 0.4,
            colorScheme: "bfactor",
          })
        }

        // Add structure regions
        structureRegions.forEach((region) => {
          if (activeRegions[region.id]) {
            loadedStructure.addRepresentation("ball+stick", {
              sele: region.residues,
              color: region.color,
              aspectRatio: 1.5,
              scale: 0.8,
            })
          }
        })

        // Center and zoom
        stageInstance.autoView()

        setIsLoading(false)
      } catch (err) {
        console.error("Error initializing protein viewer:", err)
        setError("Failed to load protein structure")
        setIsLoading(false)
      }
    }

    initViewer()

    // Cleanup
    return () => {
      if (stageInstance) {
        stageInstance.dispose()
      }
    }
  }, [])

  // Update representation when settings change
  useEffect(() => {
    if (!structure || !stage) return

    // Clear all representations
    structure.removeAllRepresentations()

    // Add main representation based on view mode
    structure.addRepresentation(viewMode, {
      color: colorScheme,
      opacity: 0.9,
      smoothSheet: true,
    })

    // Add surface if enabled
    if (showSurface) {
      structure.addRepresentation("surface", {
        opacity: 0.4,
        colorScheme: "bfactor",
      })
    }

    // Add structure regions
    structureRegions.forEach((region) => {
      if (activeRegions[region.id]) {
        structure.addRepresentation("ball+stick", {
          sele: region.residues,
          color: region.color,
          aspectRatio: 1.5,
          scale: 0.8,
        })
      }
    })

    // Update view
    stage.autoView()
  }, [viewMode, colorScheme, showSurface, activeRegions, structure, stage])

  // Handle rotation animation
  useEffect(() => {
    let animationId: number | null = null

    const animate = () => {
      if (stage && isRotating) {
        stage.spinAnimation.axis.set(0, 1, 0)
        stage.spinAnimation.angle = 0.01
        stage.animate()
        animationId = requestAnimationFrame(animate)
      }
    }

    if (isRotating) {
      animate()
    }

    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isRotating, stage])

  // Highlight selected region
  useEffect(() => {
    if (!structure || !stage || !selectedRegion) return

    const region = structureRegions.find((r) => r.id === selectedRegion)
    if (!region) return

    // Add highlight representation
    structure.addRepresentation("ball+stick", {
      sele: region.residues,
      color: region.color,
      aspectRatio: 2,
      scale: 1.2,
    })

    // Center view on the selected region
    stage.viewerControls.center(structure.getCenter(new NGL.Selection(region.residues)))

    return () => {
      // Remove highlight when selection changes
      if (structure) {
        structure.removeAllRepresentations()
        updateRepresentations()
      }
    }
  }, [selectedRegion])

  const updateRepresentations = () => {
    if (!structure) return

    // Add main representation
    structure.addRepresentation(viewMode, {
      color: colorScheme,
      opacity: 0.9,
      smoothSheet: true,
    })

    // Add surface if enabled
    if (showSurface) {
      structure.addRepresentation("surface", {
        opacity: 0.4,
        colorScheme: "bfactor",
      })
    }

    // Add structure regions
    structureRegions.forEach((region) => {
      if (activeRegions[region.id]) {
        structure.addRepresentation("ball+stick", {
          sele: region.residues,
          color: region.color,
          aspectRatio: 1.5,
          scale: 0.8,
        })
      }
    })
  }

  const handleViewModeChange = (mode: string) => {
    setViewMode(mode)
  }

  const handleColorSchemeChange = (scheme: string) => {
    setColorScheme(scheme)
  }

  const handleSurfaceToggle = () => {
    setShowSurface(!showSurface)
  }

  const handleRegionToggle = (regionId: string) => {
    setActiveRegions((prev) => ({
      ...prev,
      [regionId]: !prev[regionId],
    }))
  }

  const handleRotationToggle = () => {
    setIsRotating(!isRotating)
  }

  const handleScreenshot = () => {
    if (stage) {
      // Create a blob from the PNG data
      stage
        .makeImage({
          factor: 2,
          antialias: true,
          trim: false,
          transparent: false,
        })
        .then((blob: Blob) => {
          // Create a download link
          const link = document.createElement("a")
          link.href = URL.createObjectURL(blob)
          link.download = "pop2-structure.png"
          link.click()
        })
    }
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        containerRef.current.requestFullscreen()
      }
    }
  }

  const handleZoomToRegion = (regionId: string) => {
    setSelectedRegion(regionId === selectedRegion ? null : regionId)
  }

  const toggleControls = () => {
    setControlsVisible(!controlsVisible)
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-muted-foreground">Loading protein structure...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="text-center text-destructive">
            <p>{error}</p>
            <p className="text-sm mt-2">Please check that the PDB file is accessible.</p>
          </div>
        </div>
      )}

      <div ref={containerRef} className="w-full h-full" style={{ visibility: isLoading ? "hidden" : "visible" }}></div>

      {!isLoading && !error && (
        <>
          {/* Controls panel */}
          {controlsMinimizable && !controlsVisible ? (
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 left-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={toggleControls}
              aria-label="Show controls"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg text-xs border border-border max-w-[250px] max-h-[calc(100%-32px)] overflow-y-auto z-10">
              {controlsMinimizable && (
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Structure Controls</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={toggleControls}
                    aria-label="Hide controls"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <Tabs defaultValue="view" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-2">
                  <TabsTrigger value="view">View</TabsTrigger>
                  <TabsTrigger value="regions">Regions</TabsTrigger>
                  <TabsTrigger value="tools">Tools</TabsTrigger>
                </TabsList>

                <TabsContent value="view" className="mt-2 space-y-3">
                  <div>
                    <label className="block text-muted-foreground mb-1">View Mode</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewModeChange("cartoon")}
                        className={`px-2 py-1 rounded-md text-xs ${viewMode === "cartoon" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                      >
                        Cartoon
                      </button>
                      <button
                        onClick={() => handleViewModeChange("ribbon")}
                        className={`px-2 py-1 rounded-md text-xs ${viewMode === "ribbon" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                      >
                        Ribbon
                      </button>
                      <button
                        onClick={() => handleViewModeChange("spacefill")}
                        className={`px-2 py-1 rounded-md text-xs ${viewMode === "spacefill" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                      >
                        Spacefill
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-1">Color Scheme</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleColorSchemeChange("chainname")}
                        className={`px-2 py-1 rounded-md text-xs ${colorScheme === "chainname" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                      >
                        Chain
                      </button>
                      <button
                        onClick={() => handleColorSchemeChange("residueindex")}
                        className={`px-2 py-1 rounded-md text-xs ${colorScheme === "residueindex" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                      >
                        Residue
                      </button>
                      <button
                        onClick={() => handleColorSchemeChange("sstruc")}
                        className={`px-2 py-1 rounded-md text-xs ${colorScheme === "sstruc" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}
                      >
                        Structure
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="show-surface" checked={showSurface} onCheckedChange={handleSurfaceToggle} />
                    <Label htmlFor="show-surface">Show Surface</Label>
                  </div>
                </TabsContent>

                <TabsContent value="regions" className="mt-2 space-y-3">
                  <p className="text-xs text-muted-foreground mb-2">Toggle key regions of the protein structure:</p>

                  {structureRegions.map((region) => (
                    <div key={region.id} className="flex items-start space-x-2">
                      <div className="pt-0.5">
                        <Switch
                          id={`region-${region.id}`}
                          checked={activeRegions[region.id]}
                          onCheckedChange={() => handleRegionToggle(region.id)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`region-${region.id}`} className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }}></div>
                          {region.name}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-0.5">{region.description}</p>
                      </div>
                    </div>
                  ))}

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const allActive = Object.values(activeRegions).every((v) => v)
                        const newState = !allActive
                        const newActiveRegions = structureRegions.reduce(
                          (acc, region) => {
                            acc[region.id] = newState
                            return acc
                          },
                          {} as Record<string, boolean>,
                        )
                        setActiveRegions(newActiveRegions)
                      }}
                      className="w-full px-2 py-1 bg-muted text-xs rounded-md hover:bg-muted/80"
                    >
                      {Object.values(activeRegions).every((v) => v) ? "Hide All" : "Show All"}
                    </button>
                  </div>
                </TabsContent>

                <TabsContent value="tools" className="mt-2 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-rotate" checked={isRotating} onCheckedChange={handleRotationToggle} />
                    <Label htmlFor="auto-rotate" className="flex items-center gap-1">
                      <RotateCw className="h-3 w-3" />
                      Auto-Rotate
                    </Label>
                  </div>

                  <div>
                    <label className="block text-muted-foreground mb-1">Zoom to Region</label>
                    <div className="grid grid-cols-2 gap-2">
                      {structureRegions.map((region) => (
                        <button
                          key={region.id}
                          onClick={() => handleZoomToRegion(region.id)}
                          className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 ${
                            selectedRegion === region.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }}></div>
                          <span className="truncate">{region.name.split(" ")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={handleScreenshot}
                      className="px-2 py-1 bg-primary text-primary-foreground rounded-md text-xs hover:bg-primary/90 flex items-center justify-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Screenshot
                    </button>

                    <button
                      onClick={handleFullscreen}
                      className="px-2 py-1 bg-muted text-foreground rounded-md text-xs hover:bg-muted/80 flex items-center justify-center gap-1"
                    >
                      <Maximize2 className="h-3 w-3" />
                      Fullscreen
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Help button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background z-10"
            aria-label="Help"
          >
            <Info className="h-4 w-4" />
          </button>

          {/* Help panel */}
          {showHelp && (
            <div className="absolute top-14 right-4 w-64 bg-background/90 backdrop-blur-sm p-3 rounded-lg text-xs border border-border z-20">
              <h4 className="font-medium mb-2">Navigation Controls</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ZoomIn className="h-3 w-3" />
                  <span>Mouse wheel to zoom in/out</span>
                </li>
                <li>Left-click + drag to rotate</li>
                <li>Right-click + drag to translate</li>
                <li>Middle-click + drag to zoom</li>
                <li>Shift + drag to pan</li>
              </ul>

              <h4 className="font-medium mt-3 mb-2">Color Key</h4>
              <div className="space-y-1">
                {structureRegions.map((region) => (
                  <div key={region.id} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }}></div>
                    <span className="text-muted-foreground">{region.name}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-3 px-2 py-1 bg-muted rounded-md hover:bg-muted/80"
              >
                Close
              </button>
            </div>
          )}
        </>
      )}

      <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg text-xs text-muted-foreground z-10">
        <p>Drag to rotate | Scroll to zoom | Shift+drag to translate</p>
      </div>
    </div>
  )
}

