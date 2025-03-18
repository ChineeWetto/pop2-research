import { NextResponse } from "next/server"

// This is sample data - replace with your actual data
const expressionKineticsData = [
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

export async function GET() {
  // In a real application, you might fetch this data from a database
  // or read it from a file

  return NextResponse.json(expressionKineticsData)
}

