import { NextResponse } from "next/server"

// This is sample data - replace with your actual data
const temperatureEffectsData = [
  { temperature: "30°C", ecoli: 30, yeast: 25 },
  { temperature: "37°C", ecoli: 65, yeast: 75 },
  { temperature: "40°C", ecoli: 90, yeast: 50 },
]

export async function GET() {
  // In a real application, you might fetch this data from a database
  // or read it from a file

  return NextResponse.json(temperatureEffectsData)
}

