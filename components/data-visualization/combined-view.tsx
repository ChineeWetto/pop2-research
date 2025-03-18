"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dna, LineChartIcon, SplitSquareVertical, X, Sliders } from "lucide-react"
import ProteinStructureViewer from "./protein-structure-viewer"
import ExpressionKineticsChart from "./expression-kinetics-chart"
import TemperatureEffectsChart from "./temperature-effects-chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function CombinedView() {
  const [viewMode, setViewMode] = useState<"split" | "structure" | "data">("split")
  const [dataTab, setDataTab] = useState<"expression" | "temperature">("expression")
  const [settingsExpanded, setSettingsExpanded] = useState(false)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <ScrollArea className="w-full sm:w-auto">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger
              value="split"
              onClick={() => setViewMode("split")}
              className="flex items-center gap-1 whitespace-nowrap transition-all duration-300"
            >
              <SplitSquareVertical className="h-4 w-4" />
              <span className="hidden sm:inline">Split View</span>
            </TabsTrigger>
            <TabsTrigger
              value="structure"
              onClick={() => setViewMode("structure")}
              className="flex items-center gap-1 whitespace-nowrap transition-all duration-300"
            >
              <Dna className="h-4 w-4" />
              <span className="hidden sm:inline">Structure</span>
            </TabsTrigger>
            <TabsTrigger
              value="data"
              onClick={() => setViewMode("data")}
              className="flex items-center gap-1 whitespace-nowrap transition-all duration-300"
            >
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="sm:hidden" />
        </ScrollArea>

        {viewMode === "data" && (
          <ScrollArea className="w-full sm:w-auto">
            <Tabs value={dataTab} onValueChange={(v) => setDataTab(v as any)}>
              <TabsList className="inline-flex w-auto">
                <TabsTrigger value="expression" className="whitespace-nowrap transition-all duration-300">
                  Expression
                </TabsTrigger>
                <TabsTrigger value="temperature" className="whitespace-nowrap transition-all duration-300">
                  Temperature
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>
        )}

        <div className="sm:hidden w-full flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSettingsExpanded(!settingsExpanded)}
            className="transition-all duration-300"
          >
            <Sliders className="h-4 w-4 mr-2" />
            {settingsExpanded ? "Hide Settings" : "Show Settings"}
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-muted border border-border rounded-xl overflow-hidden">
        {viewMode === "split" && (
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <div className="border-r border-border h-full">
              <ProteinStructureViewer controlsMinimizable={true} />
            </div>
            <div className="p-4 h-full overflow-hidden">
              <Tabs value={dataTab} onValueChange={(v) => setDataTab(v as any)} className="h-full">
                <ScrollArea className="w-full">
                  <TabsList className="mb-4 inline-flex w-auto">
                    <TabsTrigger value="expression" className="whitespace-nowrap transition-all duration-300">
                      Expression Kinetics
                    </TabsTrigger>
                    <TabsTrigger value="temperature" className="whitespace-nowrap transition-all duration-300">
                      Temperature Effects
                    </TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
                <TabsContent value="expression" className="h-[calc(100%-40px)] overflow-hidden">
                  <AnimatePresence>
                    {settingsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="sm:hidden mb-4 overflow-hidden"
                      >
                        <div className="bg-background border border-border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium">Chart Settings</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSettingsExpanded(false)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Adjust the settings in the chart below to customize your view.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <ExpressionKineticsChart />
                </TabsContent>
                <TabsContent value="temperature" className="h-[calc(100%-40px)] overflow-hidden">
                  <AnimatePresence>
                    {settingsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="sm:hidden mb-4 overflow-hidden"
                      >
                        <div className="bg-background border border-border rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium">Chart Settings</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSettingsExpanded(false)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">
                            Adjust the settings in the chart below to customize your view.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <TemperatureEffectsChart />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}

        {viewMode === "structure" && (
          <div className="h-full">
            <ProteinStructureViewer controlsMinimizable={true} />
          </div>
        )}

        {viewMode === "data" && (
          <div className="p-4 h-full overflow-hidden">
            <Tabs value={dataTab} onValueChange={(v) => setDataTab(v as any)} className="h-full">
              <TabsContent value="expression" className="h-full overflow-hidden">
                <AnimatePresence>
                  {settingsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="sm:hidden mb-4 overflow-hidden"
                    >
                      <div className="bg-background border border-border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Chart Settings</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSettingsExpanded(false)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Adjust the settings in the chart below to customize your view.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <ExpressionKineticsChart />
              </TabsContent>
              <TabsContent value="temperature" className="h-full overflow-hidden">
                <AnimatePresence>
                  {settingsExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="sm:hidden mb-4 overflow-hidden"
                    >
                      <div className="bg-background border border-border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-sm font-medium">Chart Settings</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSettingsExpanded(false)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Adjust the settings in the chart below to customize your view.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <TemperatureEffectsChart />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}

