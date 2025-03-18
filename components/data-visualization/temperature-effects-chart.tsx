"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// This is sample data - replace with your actual data
const sampleData = [
  { temperature: "30°C", ecoli: 65, yeast: 75 },
  { temperature: "37°C", ecoli: 90, yeast: 50 },
  { temperature: "40°C", ecoli: 45, yeast: 30 },
]

export default function TemperatureEffectsChart() {
  const [data, setData] = useState(sampleData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showEcoli, setShowEcoli] = useState(true)
  const [showYeast, setShowYeast] = useState(true)
  const [showLabels, setShowLabels] = useState(false)
  const [chartType, setChartType] = useState<"bar" | "grouped" | "stacked">("grouped")
  const [highlightOptimal, setHighlightOptimal] = useState(false)

  // You can fetch your actual data here
  useEffect(() => {
    // This is where you would fetch your actual data
    // Example:
    // async function fetchData() {
    //   setIsLoading(true)
    //   try {
    //     const response = await fetch('/api/temperature-effects')
    //     if (!response.ok) throw new Error('Failed to fetch data')
    //     const result = await response.json()
    //     setData(result)
    //   } catch (err) {
    //     setError('Failed to load data')
    //     console.error(err)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    // fetchData()
  }, [])

  // Find optimal temperatures
  const optimalEcoli = data.reduce(
    (max, item) => (item.ecoli > max.value ? { temp: item.temperature, value: item.ecoli } : max),
    { temp: "", value: 0 },
  )

  const optimalYeast = data.reduce(
    (max, item) => (item.yeast > max.value ? { temp: item.temperature, value: item.yeast } : max),
    { temp: "", value: 0 },
  )

  const handleDownload = () => {
    // Create CSV content
    const csvContent = [
      "Temperature,E. coli Efficiency (%),Yeast Efficiency (%)",
      ...data.map((item) => `${item.temperature},${item.ecoli},${item.yeast}`),
    ].join("\n")

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "temperature-effects.csv"
    link.click()
  }

  if (isLoading) return <div className="flex items-center justify-center h-full">Loading data...</div>
  if (error) return <div className="flex items-center justify-center h-full text-destructive">{error}</div>

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="bg-muted border border-border rounded-lg p-3 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <h4 className="text-xs font-medium mb-1">Data Series</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Switch id="show-ecoli-temp" checked={showEcoli} onCheckedChange={setShowEcoli} />
                <Label htmlFor="show-ecoli-temp" className="flex items-center text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#ff9ad5] mr-1"></div>
                  E. coli
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-yeast-temp" checked={showYeast} onCheckedChange={setShowYeast} />
                <Label htmlFor="show-yeast-temp" className="flex items-center text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#90caf9] mr-1"></div>
                  Yeast
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium mb-1">Display Options</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Switch id="show-labels" checked={showLabels} onCheckedChange={setShowLabels} />
                <Label htmlFor="show-labels" className="text-xs">
                  Show Value Labels
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="highlight-optimal" checked={highlightOptimal} onCheckedChange={setHighlightOptimal} />
                <Label htmlFor="highlight-optimal" className="text-xs">
                  Highlight Optimal Temps
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium mb-1">Chart Type</h4>
            <Tabs defaultValue="grouped" onValueChange={(value) => setChartType(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bar" className="text-xs py-1">
                  Single
                </TabsTrigger>
                <TabsTrigger value="grouped" className="text-xs py-1">
                  Grouped
                </TabsTrigger>
                <TabsTrigger value="stacked" className="text-xs py-1">
                  Stacked
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button
            onClick={handleDownload}
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-300"
          >
            Download CSV
          </button>
        </div>
      </div>

      <div className="flex-grow min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }} barSize={60}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="temperature" tick={{ fontSize: 10 }} />
              <YAxis
                label={{ value: "Expression Efficiency (%)", angle: -90, position: "insideLeft", fontSize: 12 }}
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
              />
              <Tooltip formatter={(value) => [`${value}%`, ""]} contentStyle={{ fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />

              {showEcoli && (
                <Bar dataKey="ecoli" name="E. coli" fill="#ff9ad5">
                  {showLabels && (
                    <LabelList
                      dataKey="ecoli"
                      position="top"
                      formatter={(value: number) => `${value}%`}
                      style={{ fontSize: 10 }}
                    />
                  )}
                  {highlightOptimal &&
                    data.map((entry, index) => (
                      <Cell
                        key={`cell-ecoli-${index}`}
                        fill={entry.temperature === optimalEcoli.temp ? "#ff4db8" : "#ff9ad5"}
                      />
                    ))}
                </Bar>
              )}
            </BarChart>
          ) : chartType === "grouped" ? (
            <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }} barSize={30}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="temperature" tick={{ fontSize: 10 }} />
              <YAxis
                label={{ value: "Expression Efficiency (%)", angle: -90, position: "insideLeft", fontSize: 12 }}
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
              />
              <Tooltip formatter={(value) => [`${value}%`, ""]} contentStyle={{ fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />

              {showEcoli && (
                <Bar dataKey="ecoli" name="E. coli" fill="#ff9ad5" radius={[4, 4, 0, 0]}>
                  {showLabels && (
                    <LabelList
                      dataKey="ecoli"
                      position="top"
                      formatter={(value: number) => `${value}%`}
                      style={{ fontSize: 10 }}
                    />
                  )}
                  {highlightOptimal &&
                    data.map((entry, index) => (
                      <Cell
                        key={`cell-ecoli-${index}`}
                        fill={entry.temperature === optimalEcoli.temp ? "#ff4db8" : "#ff9ad5"}
                      />
                    ))}
                </Bar>
              )}

              {showYeast && (
                <Bar dataKey="yeast" name="Yeast" fill="#90caf9" radius={[4, 4, 0, 0]}>
                  {showLabels && (
                    <LabelList
                      dataKey="yeast"
                      position="top"
                      formatter={(value: number) => `${value}%`}
                      style={{ fontSize: 10 }}
                    />
                  )}
                  {highlightOptimal &&
                    data.map((entry, index) => (
                      <Cell
                        key={`cell-yeast-${index}`}
                        fill={entry.temperature === optimalYeast.temp ? "#4d94ff" : "#90caf9"}
                      />
                    ))}
                </Bar>
              )}
            </BarChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }} barSize={60}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="temperature" tick={{ fontSize: 10 }} />
              <YAxis
                label={{ value: "Expression Efficiency (%)", angle: -90, position: "insideLeft", fontSize: 12 }}
                domain={[0, 100]}
                tick={{ fontSize: 10 }}
              />
              <Tooltip formatter={(value) => [`${value}%`, ""]} contentStyle={{ fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />

              {showEcoli && (
                <Bar dataKey="ecoli" name="E. coli" stackId="a" fill="#ff9ad5">
                  {showLabels && (
                    <LabelList
                      dataKey="ecoli"
                      position="inside"
                      formatter={(value: number) => `${value}%`}
                      style={{ fontSize: 10 }}
                    />
                  )}
                  {highlightOptimal &&
                    data.map((entry, index) => (
                      <Cell
                        key={`cell-ecoli-${index}`}
                        fill={entry.temperature === optimalEcoli.temp ? "#ff4db8" : "#ff9ad5"}
                      />
                    ))}
                </Bar>
              )}

              {showYeast && (
                <Bar dataKey="yeast" name="Yeast" stackId="a" fill="#90caf9">
                  {showLabels && (
                    <LabelList
                      dataKey="yeast"
                      position="inside"
                      formatter={(value: number) => `${value}%`}
                      style={{ fontSize: 10 }}
                    />
                  )}
                  {highlightOptimal &&
                    data.map((entry, index) => (
                      <Cell
                        key={`cell-yeast-${index}`}
                        fill={entry.temperature === optimalYeast.temp ? "#4d94ff" : "#90caf9"}
                      />
                    ))}
                </Bar>
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

