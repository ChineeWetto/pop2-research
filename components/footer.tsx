import Link from "next/link"
import { Github, Mail, FileText } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ProteinExpress</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Investigating the optimization of human POP2 expression in dual systems, contributing to neuroinflammatory
              research.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#research" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Research
                </Link>
              </li>
              <li>
                <Link href="/#data" className="text-muted-foreground hover:text-primary transition-colors">
                  Interactive Data
                </Link>
              </li>
              <li>
                <Link href="/#team" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
              <Link href="/#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="/#" className="text-muted-foreground hover:text-primary transition-colors">
                <FileText className="h-5 w-5" />
                <span className="sr-only">Research Paper</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ProteinExpress Research Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

