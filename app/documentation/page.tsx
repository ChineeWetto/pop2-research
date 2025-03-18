"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  Menu,
  X,
  FileText,
  Clock,
  FlaskRoundIcon as Flask,
  BarChart,
  Users,
  Search,
  Home,
  Camera,
  ExternalLink,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Documentation() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
              <span className="text-xl font-heading font-bold tracking-tight text-primary">POP2</span>
              <span className="hidden md:inline-block text-sm font-medium text-muted-foreground">Documentation</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/data"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors duration-300"
            >
              <Database size={16} />
              <span className="hidden md:inline">Interactive Data</span>
            </Link>

            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="pl-9 pr-4 py-2 text-sm bg-muted rounded-full w-64 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
              />
            </div>

            <Link
              href="/"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Home size={16} />
              <span className="hidden md:inline">Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={toggleSidebar}></div>
            <nav className="relative w-64 max-w-xs h-full bg-background border-r border-border overflow-y-auto p-4">
              <div className="space-y-6">{renderSidebarContent()}</div>
            </nav>
          </motion.div>
        )}

        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 border-r border-border h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4">
          <nav className="space-y-6">{renderSidebarContent()}</nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-primary inline-flex items-center transition-colors duration-300"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
            </div>

            <div className="prose max-w-none">
              <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-6">
                Research Documentation
              </h1>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="text-sm text-muted-foreground">
                  Comprehensive documentation of our research methodology and findings
                </div>
                <Button asChild className="transition-all duration-300 hover:shadow-md">
                  <Link href="/data" className="inline-flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Interactive Data Explorer
                  </Link>
                </Button>
              </div>

              <section id="overview" className="scroll-mt-24">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-grow bg-border"></div>
                  <span className="text-sm font-medium text-muted-foreground">OVERVIEW</span>
                  <div className="h-px flex-grow bg-border"></div>
                </div>

                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground mb-6">
                  Our team of 10 STEM students from diverse backgrounds has come together to investigate protein
                  expression optimization in both yeast and E. coli systems, drawing inspiration from CSU's
                  groundbreaking nanoligamer research.
                </p>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
                  <h3 className="text-xl font-medium mb-2">Research Background & Motivation</h3>
                  <p className="text-muted-foreground mb-4">
                    Alzheimer's disease is a major cause of cognitive decline in the U.S. with few effective treatments.
                    We were inspired by a CSU professor's research on inflammation using nanoligamers.
                  </p>
                  <div className="bg-background border border-border rounded-md p-4">
                    <p className="text-sm font-medium mb-1">Citation</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Sharma, N., et al. (2024). "Novel nanoligamer approach for targeting neuroinflammation in
                      Alzheimer's disease." Journal of Neuroinflammation, 21(1), 182-195.
                    </p>
                    <Link
                      href="https://jneuroinflammation.biomedcentral.com/articles/10.1186/s12974-024-03182-9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary flex items-center gap-1 hover:underline transition-colors duration-300"
                    >
                      View original research <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Our original goal was to use yeast to mimic the nanoligamer approach. However, we learned that
                    nanoligamers are custom-made by a Colorado company and Saccharomyces cerevisiae cannot produce them.
                    This led us to focus on the broader inflammasome system and the proteins that build up with aging,
                    contributing to neurodegenerative diseases.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-muted border border-border rounded-lg p-6 transition-transform hover:scale-[1.02] duration-300">
                    <h3 className="text-xl font-medium mb-4">Research Focus</h3>
                    <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                      <li>Protein expression optimization</li>
                      <li>Comparative analysis of expression systems</li>
                      <li>Implications for neuroinflammatory research</li>
                    </ul>
                  </div>

                  <div className="bg-muted border border-border rounded-lg p-6 transition-transform hover:scale-[1.02] duration-300">
                    <h3 className="text-xl font-medium mb-4">Key Objectives</h3>
                    <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                      <li>Evaluate expression efficiency</li>
                      <li>Compare system advantages</li>
                      <li>Optimize protocols</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="project-phases" className="mt-16 scroll-mt-24">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-grow bg-border"></div>
                  <span className="text-sm font-medium text-muted-foreground">PHASES</span>
                  <div className="h-px flex-grow bg-border"></div>
                </div>

                <h2 className="text-2xl font-bold mb-6">Project Phases</h2>

                <div className="relative border-l-2 border-primary/30 pl-6 space-y-12 mb-8">
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 id="research-question" className="text-xl font-medium mb-3 scroll-mt-24">
                      Phase 1: Team Formation & Ideation
                    </h3>
                    <div className="bg-muted border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md">
                      <h4 className="font-medium mb-3">Icebreakers & Team Building</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                        <li>Engaged in exercises to get to know each other, understand values, and establish trust.</li>
                        <li>
                          Discussed individual strengths, backgrounds, and interests to determine contributions to the
                          project.
                        </li>
                        <li>Explored how each team member's expertise could shape the research direction.</li>
                      </ul>

                      <h4 className="font-medium mb-3">Brainstorming & Research Question Development</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>
                          Considered various topics, including stem cells, brain tumors, Alzheimer's, microplastics,
                          water quality, and cannabis effects.
                        </li>
                        <li>
                          Aiming for a bio-based project, we focused on issues that incorporated both lab and data work.
                        </li>
                        <li>Narrowed ideas based on feasibility, scientific merit, and potential impact.</li>
                        <li>Adopted an "always questioning" mindset to guide our decision-making process.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 id="project-planning" className="text-xl font-medium mb-3 scroll-mt-24">
                      Phase 2: Project Proposal & Funding
                    </h3>
                    <div className="bg-muted border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md">
                      <h4 className="font-medium mb-3">Proposal Preparation</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                        <li>
                          Developed a formal project plan, defining objectives, methodologies, and expected outcomes.
                        </li>
                        <li>Identified major challenges and structured the research timeline.</li>
                        <li>Ensured the proposal met institutional requirements and funding criteria.</li>
                      </ul>

                      <h4 className="font-medium mb-3">Funding Acquisition</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Submitted a funding proposal to our anonymous investor.</li>
                        <li>
                          Upon approval, received financial support to purchase the plasmid and other essential
                          materials.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 id="laboratory-work" className="text-xl font-medium mb-3 scroll-mt-24">
                      Phase 3-4: Research Preparation & Experimental Work
                    </h3>
                    <div className="bg-muted border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md">
                      <h4 className="font-medium mb-3">Manuscript & Protocol Review</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                        <li>Studied scientific literature to refine our approach.</li>
                        <li>
                          Investigated prior research on neuroinflammation, yeast expression systems, and protein
                          purification.
                        </li>
                      </ul>

                      <div className="relative h-[200px] md:h-[300px] mb-6 rounded-lg overflow-hidden">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uPzf4WBgDQcOfJY2TKEMIDxgauZqiX.png"
                          alt="Laboratory work with protein samples"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h4 className="font-medium mb-3">Plasmid Design & Preparation</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                        <li>Designed and ordered the plasmid for E. coli transformation.</li>
                        <li>Conducted transformation procedures and verified plasmid integrity.</li>
                      </ul>

                      <h4 className="font-medium mb-3">Yeast Expression Trials</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Attempted subcloning into a yeast vector (pRS423-GAL).</li>
                        <li>Encountered issues with restriction sites and had to reassess the cloning strategy.</li>
                        <li>Pivoted to a new approach using Gibson Assembly to correct enzyme selection errors.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 id="data-analysis" className="text-xl font-medium mb-3 scroll-mt-24">
                      Phase 5: Data Analysis
                    </h3>
                    <div className="bg-muted border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md">
                      <h4 className="font-medium mb-3">Experimental Validation</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-6">
                        <li>Analyzed transformation efficiency and protein expression results.</li>
                        <li>Evaluated enzyme digestion, gel electrophoresis, and sequencing data.</li>
                      </ul>

                      <div className="relative h-[200px] md:h-[300px] mb-6 rounded-lg overflow-hidden">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uTOWr2qOw1LoYBjeYSAo79qvRTFkwc.png"
                          alt="Expression kinetics data analysis"
                          fill
                          className="object-contain bg-white"
                        />
                      </div>

                      <h4 className="font-medium mb-3">Interpreting Findings</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Assessed results to determine whether our approach successfully expressed the protein.</li>
                        <li>
                          Compared data from different expression systems (E. coli vs. yeast, if yeast experiments are
                          recovered).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section id="experimental-design" className="mt-16 scroll-mt-24">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-grow bg-border"></div>
                  <span className="text-sm font-medium text-muted-foreground">METHODOLOGY</span>
                  <div className="h-px flex-grow bg-border"></div>
                </div>

                <h2 className="text-2xl font-bold mb-6">Experimental Design</h2>

                <div className="bg-muted border border-border rounded-lg p-6 mb-8 transition-all duration-300 hover:shadow-md">
                  <h3 className="text-xl font-medium mb-4">Plasmid System Design</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">E. coli Plasmid (pPOP2-E)</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>A high-copy, Ampicillin-resistant plasmid containing the human POP2 gene.</li>
                        <li>Features a T7 promoter and designated restriction sites.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Yeast Plasmid (pRS423-GAL)</h4>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Intended to drive expression in yeast with the GAL promoter.</li>
                        <li>Our goal was to subclone POP2 into this vector without disrupting the GAL promoter.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-muted border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-md">
                  <h3 className="text-xl font-medium mb-4">Transformation & Cloning Process</h3>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Initial Strategy</h4>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Planned to use NotI and XhoI sites for subcloning.</li>
                      <li>Issue: The XhoI site would remove or disrupt the GAL promoter.</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Alternative Approaches Explored</h4>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>
                        Considered NotI with SacII. However, SacII is designed to work with a coenzyme and does not
                        ligate well under our conditions.
                      </li>
                      <li>
                        In our ordering process, we mistakenly used the wrong enzymes: The POP2 fragment should have
                        been cut with BtgI and NotI instead of NotI and XhoI.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                    <h4 className="font-medium mb-2">Decision-Making Process</h4>
                    <p className="text-sm text-muted-foreground">
                      Extensive team discussions and literature reviews led us from the nanoligamer idea to a broader
                      focus on neuroinflammation. We initially planned to compare protein expression in E. coli and
                      yeast. Challenges with restriction site selection and enzyme compatibility forced us to pivot.
                      Regular feedback from mentors and a CSU professor helped shape our new approach.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Current Pivot</h4>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      <li>Due to these issues and a tight deadline, we decided to pivot our approach.</li>
                      <li>We excluded the yeast expression comparison in the short term.</li>
                      <li>
                        Instead, we re-amplified POP2 by PCR and used Gibson Assembly to add correct flanking sites.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-md"
              >
                <ChevronLeft size={16} />
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )

  function renderSidebarContent() {
    return (
      <>
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase mb-3">Overview</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="#overview"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "overview" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("overview")
                  setSidebarOpen(false)
                }}
              >
                <FileText className="h-4 w-4" />
                Project Overview
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase mb-3">Project Phases</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="#research-question"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "research-question" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("research-question")
                  setSidebarOpen(false)
                }}
              >
                <Clock className="h-4 w-4" />
                Team Formation & Ideation
              </Link>
            </li>
            <li>
              <Link
                href="#project-planning"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "project-planning" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("project-planning")
                  setSidebarOpen(false)
                }}
              >
                <Clock className="h-4 w-4" />
                Project Proposal & Funding
              </Link>
            </li>
            <li>
              <Link
                href="#laboratory-work"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "laboratory-work" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("laboratory-work")
                  setSidebarOpen(false)
                }}
              >
                <Clock className="h-4 w-4" />
                Research & Experimental Work
              </Link>
            </li>
            <li>
              <Link
                href="#data-analysis"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "data-analysis" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("data-analysis")
                  setSidebarOpen(false)
                }}
              >
                <Clock className="h-4 w-4" />
                Data Analysis
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase mb-3">Methodology</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="#experimental-design"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "experimental-design" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("experimental-design")
                  setSidebarOpen(false)
                }}
              >
                <Flask className="h-4 w-4" />
                Experimental Design
              </Link>
            </li>
            <li>
              <Link
                href="#ecoli-transformation"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "ecoli-transformation" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("ecoli-transformation")
                  setSidebarOpen(false)
                }}
              >
                <Flask className="h-4 w-4" />
                E. coli Transformation
              </Link>
            </li>
            <li>
              <Link
                href="#yeast-transformation"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "yeast-transformation" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("yeast-transformation")
                  setSidebarOpen(false)
                }}
              >
                <Flask className="h-4 w-4" />
                Yeast Transformation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase mb-3">Results</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="#key-findings"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "key-findings" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("key-findings")
                  setSidebarOpen(false)
                }}
              >
                <BarChart className="h-4 w-4" />
                Key Findings
              </Link>
            </li>
            <li>
              <Link
                href="#analysis"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "analysis" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("analysis")
                  setSidebarOpen(false)
                }}
              >
                <BarChart className="h-4 w-4" />
                Analysis
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase mb-3">Media</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="/data/gallery"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 text-muted-foreground`}
                onClick={() => {
                  setSidebarOpen(false)
                }}
              >
                <Camera className="h-4 w-4" />
                Lab Gallery
              </Link>
            </li>
            <li>
              <Link
                href="/data"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 text-muted-foreground`}
                onClick={() => {
                  setSidebarOpen(false)
                }}
              >
                <BarChart className="h-4 w-4" />
                Interactive Data
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase mb-3">Team</div>
          <ul className="space-y-1">
            <li>
              <Link
                href="#team"
                className={`flex items-center gap-2 text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors duration-300 ${activeSection === "team" ? "bg-muted text-primary" : "text-muted-foreground"}`}
                onClick={() => {
                  setActiveSection("team")
                  setSidebarOpen(false)
                }}
              >
                <Users className="h-4 w-4" />
                Our Team
              </Link>
            </li>
          </ul>
        </div>
      </>
    )
  }
}

