"use client"

import Link from "next/link"
import { ChevronLeft, Upload } from "lucide-react"
import UploadForm from "@/components/upload-form"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/data" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Data
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mt-4 mb-2">Upload Research Data</h1>
          <p className="text-muted-foreground max-w-3xl mb-8">
            Upload your research data files to be used in visualizations and analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-medium">Upload Data Files</h2>
            </div>

            <UploadForm />
          </div>

          <div className="space-y-6">
            <div className="bg-muted border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-3">Data Format Guidelines</h3>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>CSV files should have headers in the first row</li>
                <li>For expression kinetics data, include columns for time, ecoli, and yeast</li>
                <li>For temperature effects data, include columns for temperature, ecoli, and yeast</li>
                <li>PDB files should be in standard PDB format</li>
                <li>Maximum file size: 10MB</li>
              </ul>
            </div>

            <div className="bg-muted border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-3">Example CSV Format</h3>
              <div className="bg-background border border-border rounded-md p-3 font-mono text-xs overflow-x-auto">
                <pre>
                  time,ecoli,yeast
                  <br />
                  0,0,0
                  <br />
                  4,15,5
                  <br />
                  8,30,12
                  <br />
                  12,45,20
                  <br />
                  ...
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

