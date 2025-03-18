"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Check, AlertCircle } from "lucide-react"

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setUploadStatus(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file) return

    setUploading(true)
    setUploadStatus(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-data", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setUploadStatus({
          success: true,
          message: `File uploaded successfully: ${result.fileName}`,
        })
        setFile(null)
      } else {
        setUploadStatus({
          success: false,
          message: result.error || "Failed to upload file",
        })
      }
    } catch (error) {
      setUploadStatus({
        success: false,
        message: "An error occurred during upload",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">Upload Data File</Label>
        <Input
          id="file"
          type="file"
          onChange={handleFileChange}
          accept=".csv,.pdb,.json,.txt,.md"
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">Supported formats: CSV, PDB, JSON, TXT, MD</p>
      </div>

      <Button type="submit" disabled={!file || uploading} className="w-full">
        {uploading ? (
          <>Uploading...</>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </>
        )}
      </Button>

      {uploadStatus && (
        <div
          className={`p-3 rounded-md ${uploadStatus.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
        >
          <div className="flex items-center gap-2">
            {uploadStatus.success ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <p className="text-sm">{uploadStatus.message}</p>
          </div>
        </div>
      )}
    </form>
  )
}

