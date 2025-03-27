import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata: Metadata = {
  title: "Lab Notebook | UiS POP2",
  description: "Lab notebook for documenting experiments and progress in POP2 course"
}

interface LabEntry {
  date: string
  title: string
  content: string
  tags: string[]
}

const labEntries: LabEntry[] = [
  {
    date: "2024-03-26",
    title: "Initial Project Setup",
    content: "Set up Next.js project with TypeScript, Tailwind CSS, and Shadcn UI. Configured Vercel deployment and GitHub integration.",
    tags: ["setup", "configuration"]
  }
  // Add more entries as needed
]

export default function LabNotebook() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Lab Notebook</h1>
      <div className="grid gap-6">
        {labEntries.map((entry, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{entry.title}</CardTitle>
                <span className="text-sm text-muted-foreground">{entry.date}</span>
              </div>
              <CardDescription>
                {entry.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[100px]">
                <p className="text-sm">{entry.content}</p>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 