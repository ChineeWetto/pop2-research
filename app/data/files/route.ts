import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import path from "path"

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const filePath = url.pathname.replace("/data/files/", "")

  // Security check to prevent directory traversal
  if (filePath.includes("..")) {
    return new NextResponse("Invalid file path", { status: 400 })
  }

  try {
    // Determine the file type from the extension
    const extension = path.extname(filePath).toLowerCase()
    let contentType = "application/octet-stream"

    switch (extension) {
      case ".csv":
        contentType = "text/csv"
        break
      case ".pdf":
        contentType = "application/pdf"
        break
      case ".pdb":
        contentType = "chemical/x-pdb"
        break
      case ".pse":
        contentType = "application/octet-stream"
        break
      case ".json":
        contentType = "application/json"
        break
    }

    // Get the full path to the file
    const fullPath = path.join(process.cwd(), "public", "data", "files", filePath)

    // Read the file
    const fileData = await readFile(fullPath)

    // Return the file with the appropriate content type
    return new NextResponse(fileData, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${path.basename(filePath)}"`,
      },
    })
  } catch (error) {
    console.error("Error serving file:", error)
    return new NextResponse("File not found", { status: 404 })
  }
}

