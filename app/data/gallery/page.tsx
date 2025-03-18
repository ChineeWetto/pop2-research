"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Camera, FileText, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mt-4 mb-2">Research Gallery</h1>
          <p className="text-muted-foreground max-w-3xl">
            Laboratory images and documentation from our POP2 expression research project.
          </p>
        </div>

        <Tabs defaultValue="lab" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="lab" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span>Lab Images</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Team Photos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lab" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-muted border border-border rounded-xl overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Agar%20Plating%20-%20Elena%20%281%29-7QCY0EvtJY5UZxj2dLszpzVdMaSzby.jpeg"
                    alt="Elena working on agar plating in the biosafety cabinet"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Agar Plating Technique</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Elena performing sterile agar plating for E. coli transformation in the biosafety cabinet.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">March 2023</span>
                    <Link
                      href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Agar%20Plating%20-%20Elena%20%281%29-7QCY0EvtJY5UZxj2dLszpzVdMaSzby.jpeg"
                      target="_blank"
                      className="text-xs text-primary flex items-center gap-1 hover:underline"
                    >
                      <Download className="h-3 w-3" />
                      Full Resolution
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-muted border border-border rounded-xl overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Agar%20Plating%20%282%29%20-%20Mia%20P-EsdodkoAOLJrZiMUwSUkhxAbef0kjF.jpeg"
                    alt="Mia working on bacterial culture preparation"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Culture Preparation</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mia preparing bacterial cultures for the transformation experiment with guidance from our lab
                    mentor.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">March 2023</span>
                    <Link
                      href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Agar%20Plating%20%282%29%20-%20Mia%20P-EsdodkoAOLJrZiMUwSUkhxAbef0kjF.jpeg"
                      target="_blank"
                      className="text-xs text-primary flex items-center gap-1 hover:underline"
                    >
                      <Download className="h-3 w-3" />
                      Full Resolution
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-muted border border-border rounded-xl overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Human%20POP2-wZqb0ligZmAuRhgMSzXKVsGQkXQJDO.jpeg"
                    alt="POP2 protein sample in microcentrifuge tube"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Human POP2 Sample</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Purified human POP2 protein sample after expression in E. coli and initial purification steps.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">April 2023</span>
                    <Link
                      href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Human%20POP2-wZqb0ligZmAuRhgMSzXKVsGQkXQJDO.jpeg"
                      target="_blank"
                      className="text-xs text-primary flex items-center gap-1 hover:underline"
                    >
                      <Download className="h-3 w-3" />
                      Full Resolution
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team" className="mt-0">
            <div className="bg-muted border border-border rounded-xl overflow-hidden">
              <div className="relative h-[400px] md:h-[500px] w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Team%20Pic-6I5GINduugAFsoB8sMudOgrYu2Elis.jpeg"
                  alt="The POP2 Research Team"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3">The POP2 Research Team</h3>
                <p className="text-muted-foreground mb-4">
                  Our diverse team of 10 STEM students from Colorado State University, united by a passion for protein
                  expression research and neuroinflammation studies.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">February 2023</span>
                  <Link
                    href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Team%20Pic-6I5GINduugAFsoB8sMudOgrYu2Elis.jpeg"
                    target="_blank"
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    <Download className="h-4 w-4" />
                    Full Resolution
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

