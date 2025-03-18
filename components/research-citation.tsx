import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function ResearchCitation() {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-medium mb-2">Inspired Research</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Our work was inspired by groundbreaking research on neuroinflammation using nanoligamers at Colorado State
        University.
      </p>
      <div className="bg-background border border-border rounded-md p-4">
        <p className="text-sm font-medium mb-1">Citation</p>
        <p className="text-xs text-muted-foreground mb-3">
          Sharma, N., et al. (2024). "Novel nanoligamer approach for targeting neuroinflammation in Alzheimer's
          disease." Journal of Neuroinflammation, 21(1), 182-195.
        </p>
        <Link
          href="https://jneuroinflammation.biomedcentral.com/articles/10.1186/s12974-024-03182-9"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary flex items-center gap-1 hover:underline"
        >
          View original research <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

