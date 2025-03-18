import { ArrowRight, Microscope, FlaskRoundIcon as Flask, Dna } from "lucide-react"
import Link from "next/link"

export default function ResearchSummary() {
  return (
    <div className="bg-muted border border-border rounded-xl p-4 sm:p-6">
      <h2 className="text-xl font-medium mb-4">Research at a Glance</h2>

      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Microscope className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-medium">The Question</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            How do E. coli and yeast expression systems compare for human POP2 protein production in terms of yield,
            efficiency, and quality?
          </p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Flask className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-medium">The Approach</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Dual expression system comparison using plasmid-based transformation with time-course and temperature
            optimization analysis.
          </p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Dna className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-medium">Key Finding</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            E. coli provides higher yield (80%) and faster expression, while yeast offers better protein folding and
            post-translational modifications.
          </p>
        </div>
      </div>

      <div className="mt-4 text-sm text-center">
        <Link href="/documentation" className="text-primary hover:underline inline-flex items-center gap-1">
          Read full research documentation <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

