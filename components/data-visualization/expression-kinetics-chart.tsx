"use client"

import { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// This is sample data - replace with your actual data
const sampleData = [
  { time: 0, ecoli: 0, yeast: 0 },
  { time: 4, ecoli: 15, yeast: 5 },
  { time: 8, ecoli: 30, yeast: 12 },
  { time: 12, ecoli: 45, yeast: 20 },
  { time: 16, ecoli: 60, yeast: 30 },
  { time: 20, ecoli: 75, yeast: 42 },
  { time: 24, ecoli: 80, yeast: 50 },
  { time: 28, ecoli: 78, yeast: 55 },
  { time: 32, ecoli: 76, yeast: 60 },
  { time: 36, ecoli: 74, yeast: 65 },
  { time: 40, ecoli: 72, yeast: 63 },
  { time: 44, ecoli: 70, yeast: 60 },
  { time: 48, ecoli: 68, yeast: 58 },
]

export default function ExpressionKineticsChart() {
  const [data, setData] = useState(sampleData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showEcoli, setShowEcoli] = useState(true)
  const [showYeast, setShowYeast] = useState(true)
  const [showPeaks, setShowPeaks] = useState(false)
  const [timeRange, setTimeRange] = useState([0, 48])
  const [showGrid, setShowGrid] = useState(true)
  const [curveType, setCurveType] = useState<"linear" | "monotone" | "step">("monotone")
  const [downloadFormat, setDownloadFormat] = useState<"png" | "csv">("png")

  // You can fetch your actual data here
  useEffect(() => {
    // This is where you would fetch your actual data
    // Example:
    // async function fetchData() {
    //   setIsLoading(true)
    //   try {
    //     const response = await fetch('/api/expression-kinetics')
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

  // Filter data based on time range
  const filteredData = data.filter((item) => item.time >= timeRange[0] && item.time <= timeRange[1])

  // Find peak values
  const ecoliPeak = data.reduce(
    (max, item) => (item.ecoli > max.value ? { time: item.time, value: item.ecoli } : max),
    { time: 0, value: 0 },
  )

  const yeastPeak = data.reduce(
    (max, item) => (item.yeast > max.value ? { time: item.time, value: item.yeast } : max),
    { time: 0, value: 0 },
  )

  const handleTimeRangeChange = (values: number[]) => {
    setTimeRange(values)
  }

  const handleDownload = () => {
    if (downloadFormat === "png") {
      // Create a temporary canvas element
      const chartElement = document.querySelector(".recharts-wrapper") as HTMLElement
      if (!chartElement) return

      const canvas = document.createElement("canvas")
      canvas.width = chartElement.offsetWidth
      canvas.height = chartElement.offsetHeight

      // Use html2canvas or similar library to capture the chart
      // For simplicity, we'll just create a blank canvas here
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Convert canvas to image and download
        const link = document.createElement("a")
        link.download = "expression-kinetics.png"
        link.href = canvas.toDataURL("image/png")
        link.click()
      }
    } else if (downloadFormat === "csv") {
      // Create CSV content
      const csvContent = [
        "Time (hours),E. coli Expression (%),Yeast Expression (%)",
        ...data.map((item) => `${item.time},${item.ecoli},${item.yeast}`),
      ].join("\n")

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = "expression-kinetics.csv"
      link.click()
    }
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
                <Switch id="show-ecoli" checked={showEcoli} onCheckedChange={setShowEcoli} />
                <Label htmlFor="show-ecoli" className="flex items-center text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#ff9ad5] mr-1"></div>
                  E. coli
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-yeast" checked={showYeast} onCheckedChange={setShowYeast} />
                <Label htmlFor="show-yeast" className="flex items-center text-xs">
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
                <Switch id="show-grid" checked={showGrid} onCheckedChange={setShowGrid} />
                <Label htmlFor="show-grid" className="text-xs">
                  Show Grid
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-peaks" checked={showPeaks} onCheckedChange={setShowPeaks} />
                <Label htmlFor="show-peaks" className="text-xs">
                  Highlight Peaks
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium mb-1">Curve Type</h4>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurveType("linear")}
                className={`px-2 py-1 text-xs rounded-md ${curveType === "linear" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
              >
                Linear
              </button>
              <button
                onClick={() => setCurveType("monotone")}
                className={`px-2 py-1 text-xs rounded-md ${curveType === "monotone" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
              >
                Smooth
              </button>
              <button
                onClick={() => setCurveType("step")}
                className={`px-2 py-1 text-xs rounded-md ${curveType === "step" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"}`}
              >
                Step
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <h4 className="text-xs font-medium mb-1">
            Time Range: {timeRange[0]} - {timeRange[1]} hours
          </h4>
          <Slider
            defaultValue={[0, 48]}
            min={0}
            max={48}
            step={4}
            value={timeRange}
            onValueChange={handleTimeRangeChange}
            className="my-2"
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <label htmlFor="download-format" className="text-xs">
              Download as:
            </label>
            <select
              id="download-format"
              value={downloadFormat}
              onChange={(e) => setDownloadFormat(e.target.value as "png" | "csv")}
              className="text-xs px-2 py-1 rounded border border-border bg-background"
            >
              <option value="png">PNG Image</option>
              <option value="csv">CSV Data</option>
            </select>
          </div>
          <button
            onClick={handleDownload}
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Download
          </button>
        </div>
      </div>

      <div className="flex-grow min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />}
            <XAxis
              dataKey="time"
              label={{ value: "Time (hours)", position: "insideBottomRight", offset: -5, fontSize: 12 }}
              domain={[timeRange[0], timeRange[1]]}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              label={{ value: "Expression Level (%)", angle: -90, position: "insideLeft", fontSize: 12 }}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, ""]}
              labelFormatter={(label) => `Time: ${label} hours`}
              contentStyle={{ fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />

            {showEcoli && (
              <Line
                type={curveType}
                dataKey="ecoli"
                name="E. coli"
                stroke="#ff9ad5"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
              />
            )}

            {showYeast && (
              <Line
                type={curveType}
                dataKey="yeast"
                name="Yeast"
                stroke="#90caf9"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
              />
            )}

            {showPeaks && showEcoli && (
              <ReferenceLine
                x={ecoliPeak.time}
                stroke="#ff9ad5"
                strokeDasharray="3 3"
                label={{ value: `Peak: ${ecoliPeak.value}%`, position: "top", fill: "#ff9ad5", fontSize: 10 }}
              />
            )}

            {showPeaks && showYeast && (
              <ReferenceLine
                x={yeastPeak.time}
                stroke="#90caf9"
                strokeDasharray="3 3"
                label={{ value: `Peak: ${yeastPeak.value}%`, position: "bottom", fill: "#90caf9", fontSize: 10 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

