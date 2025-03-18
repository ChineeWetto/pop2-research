"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, BarChart, LineChart, Dna, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function DataHighlights() {
  const [activeTab, setActiveTab] = useState("findings")

  return (
    <div className="w-full">
      <Tabs defaultValue="findings" onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <ScrollArea className="w-full sm:w-auto">
            <TabsList className="inline-flex w-auto sm:w-[400px]">
              <TabsTrigger value="findings" className="whitespace-nowrap">
                Key Findings
              </TabsTrigger>
              <TabsTrigger value="comparison" className="whitespace-nowrap">
                System Comparison
              </TabsTrigger>
              <TabsTrigger value="structure" className="whitespace-nowrap">
                Protein Structure
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" className="sm:hidden" />
          </ScrollArea>

          <Link href="/data" className="text-sm text-primary flex items-center gap-1 hover:underline">
            View detailed data <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        <TabsContent value="findings" className="mt-0">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="overflow-hidden border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <LineChart className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Expression Kinetics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    E. coli reaches peak expression (80%) at 24 hours, while yeast peaks (65%) at 36 hours.
                  </p>
                  <div className="h-[120px] bg-muted rounded-md overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full px-4">
                        <div className="relative h-[2px] bg-muted-foreground/20 w-full mb-4">
                          <div className="absolute top-0 left-0 h-full bg-[#ff9ad5]" style={{ width: "80%" }}></div>
                          <div className="absolute top-0 left-0 h-full bg-[#90caf9]" style={{ width: "65%" }}></div>
                          <div className="absolute -top-3 left-[80%] transform -translate-x-1/2">
                            <div className="w-2 h-2 rounded-full bg-[#ff9ad5]"></div>
                            <div className="text-xs mt-1 text-[#ff9ad5] font-medium">80%</div>
                          </div>
                          <div className="absolute -bottom-5 left-[65%] transform -translate-x-1/2">
                            <div className="w-2 h-2 rounded-full bg-[#90caf9]"></div>
                            <div className="text-xs mt-1 text-[#90caf9] font-medium">65%</div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0h</span>
                          <span>24h</span>
                          <span>48h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex text-xs border-t border-border">
                  <div className="flex items-center gap-1 px-3 py-2 border-r border-border">
                    <div className="w-2 h-2 rounded-full bg-[#ff9ad5]"></div>
                    <span>E. coli</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-2">
                    <div className="w-2 h-2 rounded-full bg-[#90caf9]"></div>
                    <span>Yeast</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium">Temperature Effects</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Optimal temperatures differ between systems, affecting expression efficiency.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">25°C</span>
                    <div className="w-2/3 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <span className="text-xs">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">30°C</span>
                    <div className="w-2/3 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <span className="text-xs">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">37°C</span>
                    <div className="w-2/3 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <span className="text-xs">90%</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">E. coli optimal at 37°C, yeast at 30°C</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Dna className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium">System Advantages</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Each expression system offers distinct advantages for protein production.
                </p>
                <div className="space-y-3">
                  <div className="bg-muted p-2 rounded-md">
                    <span className="text-xs font-medium">E. coli Advantages:</span>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1 pl-4 list-disc">
                      <li>Higher overall yield (80%)</li>
                      <li>Faster initial expression rate</li>
                      <li>More economical at scale</li>
                    </ul>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <span className="text-xs font-medium">Yeast Advantages:</span>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1 pl-4 list-disc">
                      <li>Better post-translational modifications</li>
                      <li>Improved protein folding</li>
                      <li>More consistent expression over time</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="mt-0">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg font-medium mb-4">E. coli vs. Yeast Expression Systems</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[600px] px-4 sm:px-0 sm:min-w-0">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-sm font-medium">Feature</th>
                        <th className="text-left py-2 px-3 text-sm font-medium">E. coli</th>
                        <th className="text-left py-2 px-3 text-sm font-medium">Yeast</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 text-sm">Peak Expression</td>
                        <td className="py-2 px-3 text-sm">80% at 24h</td>
                        <td className="py-2 px-3 text-sm">65% at 36h</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 text-sm">Optimal Temperature</td>
                        <td className="py-2 px-3 text-sm">37°C</td>
                        <td className="py-2 px-3 text-sm">30°C</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 text-sm">Growth Rate</td>
                        <td className="py-2 px-3 text-sm">Rapid</td>
                        <td className="py-2 px-3 text-sm">Moderate</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 text-sm">Post-translational Modifications</td>
                        <td className="py-2 px-3 text-sm">Limited</td>
                        <td className="py-2 px-3 text-sm">Extensive</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 px-3 text-sm">Protein Folding</td>
                        <td className="py-2 px-3 text-sm">Sometimes problematic</td>
                        <td className="py-2 px-3 text-sm">Generally better</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-sm">Cost Efficiency</td>
                        <td className="py-2 px-3 text-sm">High</td>
                        <td className="py-2 px-3 text-sm">Moderate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  Our research demonstrates that system selection should be based on specific research requirements and
                  priorities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="mt-0">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">POP2 Protein Structure</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Human POP2 protein features several key functional regions that affect its role in inflammasome
                    regulation.
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#ff4d4d] mt-1"></div>
                      <div>
                        <span className="text-sm font-medium">Binding Site (residues 50-60)</span>
                        <p className="text-xs text-muted-foreground">Primary region for substrate interaction</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#4d94ff] mt-1"></div>
                      <div>
                        <span className="text-sm font-medium">Active Site (residues 100-110)</span>
                        <p className="text-xs text-muted-foreground">Catalytic center for enzymatic activity</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#9c51b6] mt-1"></div>
                      <div>
                        <span className="text-sm font-medium">α-Helix Regions</span>
                        <p className="text-xs text-muted-foreground">Secondary structure elements</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/data#structure" className="text-sm text-primary flex items-center gap-1 hover:underline">
                    Explore 3D structure <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="bg-muted rounded-lg overflow-hidden relative h-[200px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Dna className="h-10 w-10 text-primary/50 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Interactive 3D structure available in detailed view
                      </p>
                      <Link href="/data#structure" className="text-xs text-primary mt-2 inline-block hover:underline">
                        View 3D Model
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

