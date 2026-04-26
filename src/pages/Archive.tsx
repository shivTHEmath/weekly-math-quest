import { useMemo } from "react"
import SiteNav from "@/components/SiteNav"
import SiteFooter from "@/components/SiteFooter"
import { getArchivedWeeks, weekId } from "@/data/problems"
import { Tex } from "@/components/Math"
import Leaderboard from "@/components/Leaderboard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function Archive() {
  const weeks = useMemo(() => getArchivedWeeks(), [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />
      <main className="flex-1">
        <section className="container py-10 md:py-14">
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">Archive</h1>
          <p className="text-muted-foreground mt-2">All previous Problems of the Week, with solutions and final leaderboards.</p>
        </section>
        <section className="container pb-16">
          {weeks.length === 0 ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
              <p className="text-muted-foreground">No past weeks yet — check back after the first release.</p>
            </div>
          ) : (
            <Accordion type="multiple" className="space-y-3">
              {weeks.map((w) => (
                <AccordionItem key={w.week} value={`w${w.week}`} className="rounded-2xl border border-border bg-card px-5 shadow-soft data-[state=open]:shadow-glow">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <Badge className="rounded-full bg-gradient-primary text-primary-foreground">Week {w.week}</Badge>
                      <span className="font-display font-semibold">{w.title ?? `Problem set #${w.week}`}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2 gap-6 pt-2">
                      {(["A", "B"] as const).map((div) => {
                        const p = div === "A" ? w.divisionA : w.divisionB
                        return (
                          <div key={div} className="rounded-2xl bg-secondary/30 p-5 space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge variant="secondary" className="rounded-full">Division {div}</Badge>
                              <span className="text-xs text-muted-foreground">{div === "A" ? "Easier" : "Harder"}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Problem</h4>
                              <div className="prose prose-slate max-w-none text-foreground">
                                <Tex>{p.statement}</Tex>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">Solution</h4>
                              <div className="prose prose-slate max-w-none text-foreground">
                                <Tex>{p.solution}</Tex>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Answer: <span className="font-mono">{p.answers[0]}</span>
                            </p>
                            <Leaderboard weekId={weekId(w.week)} division={div} />
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}