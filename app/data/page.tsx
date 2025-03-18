"use client"
import Link from "next/link"
import { ChevronLeft, Database, FileText, BarChart3, Dna, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExpressionKineticsChart from "@/components/data-visualization/expression-kinetics-chart"
import TemperatureEffectsChart from "@/components/data-visualization/temperature-effects-chart"
import ProteinStructureViewer from "@/components/data-visualization/protein-structure-viewer"
import CombinedView from "@/components/data-visualization/combined-view"

export default function DataPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mt-4 mb-2">Research Data</h1>
            <p className="text-muted-foreground max-w-3xl">
              Interactive visualizations and raw data from our POP2 expression research project.
            </p>
          </div>
          <Link
            href="/data/upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload Data
          </Link>
        </div>

        <Tabs defaultValue="combined" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="combined" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Combined View</span>
            </TabsTrigger>
            <TabsTrigger value="expression" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Expression Kinetics</span>
            </TabsTrigger>
            <TabsTrigger value="temperature" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Temperature Effects</span>
            </TabsTrigger>
            <TabsTrigger value="structure" className="flex items-center gap-2">
              <Dna className="h-4 w-4" />
              <span>Protein Structure</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="combined" className="mt-0">
            <div className="bg-muted border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-medium mb-4">Interactive Data Explorer</h2>
              <p className="text-muted-foreground mb-6">
                Explore our research data through this interactive visualization tool. You can view the protein
                structure alongside expression data, or switch between different visualization modes.
              </p>

              <div className="h-[500px] md:h-[550px] mb-6">
                <CombinedView />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Visualization Guide</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Use the tabs to switch between different view modes</li>
                    <li>In split view, you can see the protein structure alongside expression data</li>
                    <li>The carousel mode automatically cycles through different visualizations</li>
                    <li>Use the controls to customize the protein structure view</li>
                  </ul>
                </div>

                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Key Findings</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>E. coli shows faster initial expression with peak at 24 hours</li>
                    <li>Yeast demonstrates more consistent expression over time</li>
                    <li>Temperature significantly affects expression efficiency in both systems</li>
                    <li>Binding and active sites are highlighted in the protein structure</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expression" className="mt-0">
            <div className="bg-muted border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-medium mb-4">Expression Kinetics</h2>
              <p className="text-muted-foreground mb-6">
                Time-course analysis of POP2 expression revealed distinct patterns between E. coli and yeast systems. E.
                coli demonstrated faster initial expression and higher overall yield, while yeast showed more gradual
                but steady expression.
              </p>

              <div className="h-[400px] md:h-[500px] mb-6">
                <ExpressionKineticsChart />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Key Observations</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>E. coli reaches peak expression (80%) at 24 hours</li>
                    <li>Yeast reaches peak expression (65%) at 36 hours</li>
                    <li>E. coli shows faster initial expression rate</li>
                    <li>Yeast demonstrates more consistent expression over time</li>
                  </ul>
                </div>

                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Download Raw Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download the raw data files to perform your own analysis or verification.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/data/files/expression-kinetics-ecoli.csv"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      E. coli Expression Data (CSV)
                    </Link>
                    <Link
                      href="/data/files/expression-kinetics-yeast.csv"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Yeast Expression Data (CSV)
                    </Link>
                    <Link
                      href="/data/files/expression-kinetics-methods.pdf"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Methodology Documentation (PDF)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="temperature" className="mt-0">
            <div className="bg-muted border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-medium mb-4">Temperature Effects</h2>
              <p className="text-muted-foreground mb-6">
                Our experiments tested expression at different temperatures to determine optimal conditions for each
                system. E. coli showed highest expression at 37°C, while yeast performed best at 30°C.
              </p>

              <div className="h-[400px] md:h-[500px] mb-6">
                <TemperatureEffectsChart />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Temperature Analysis</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>25°C: Low yield in both systems (30% efficiency)</li>
                    <li>30°C: Optimal for yeast (75% efficiency)</li>
                    <li>37°C: Optimal for E. coli (90% efficiency)</li>
                    <li>Higher temperatures reduced protein stability in both systems</li>
                  </ul>
                </div>

                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Download Raw Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download the raw data files to perform your own analysis or verification.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/data/files/temperature-effects-data.csv"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Temperature Effects Data (CSV)
                    </Link>
                    <Link
                      href="/data/files/temperature-methods.pdf"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Methodology Documentation (PDF)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="structure" className="mt-0">
            <div className="bg-muted border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-medium mb-4">POP2 Protein Structure</h2>
              <p className="text-muted-foreground mb-6">
                Interactive 3D visualization of the human POP2 protein structure. You can rotate, zoom, and explore the
                protein structure to better understand its conformation and binding sites.
              </p>

              <div className="h-[500px] md:h-[600px] mb-6 bg-background border border-border rounded-lg overflow-hidden">
                <ProteinStructureViewer />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Structure Information</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>PDB ID: 4IFP (or your specific PDB ID)</li>
                    <li>Resolution: 2.3 Å</li>
                    <li>Key binding sites highlighted in red</li>
                    <li>Active site residues highlighted in blue</li>
                  </ul>
                </div>

                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Download Files</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download structure files for use in your own molecular visualization software.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/data/files/pop2-structure.pdb"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      POP2 Structure (PDB)
                    </Link>
                    <Link
                      href="/data/files/pop2-pymol-session.pse"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      PyMOL Session File (PSE)
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

