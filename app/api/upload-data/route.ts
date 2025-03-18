import { type NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Get file extension
    const fileExtension = path.extname(file.name).toLowerCase()

    // Validate file type
    const allowedExtensions = [".csv", ".pdb", ".json", ".txt", ".md"]
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Create directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), "public", "data", "files")

    // Save file
    const filePath = path.join(uploadDir, file.name)
    await writeFile(filePath, buffer)

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: file.name,
      filePath: `/data/files/${file.name}`,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

