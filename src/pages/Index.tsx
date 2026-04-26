import { useMemo, useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ProblemPanel from "@/components/ProblemPanel";
import CountdownToNextRelease from "@/components/CountdownToNextRelease";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentWeek, weekId } from "@/data/problems";
import { Sparkles } from "lucide-react";

const Index = () => {
  const week = useMemo(() => getCurrentWeek(), []);
  const [tab, setTab] = useState<"A" | "B">("A");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
          <div className="container relative py-12 md:py-16 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground border border-border">
              <Sparkles className="w-3.5 h-3.5 text-accent" /> STEMist Mathathon
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-extrabold tracking-tight">
              Problem of the <span className="text-primary">Week</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              The new Problem of the Week drops every Sunday. It's great practice for the STEMist Mathathon — choose the
              problem from your division and give it a try! However, feel free to try both problems if you'd like!
            </p>
            <div className="mt-5 flex justify-center">
              <CountdownToNextRelease />
            </div>
          </div>
        </section>

        <section className="container pb-16">
          {!week ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-soft">
              <h2 className="font-display text-2xl font-bold">The season hasn't started yet.</h2>
              <p className="text-muted-foreground mt-2">
                Come back at the first release date — the countdown above is ticking.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
                <div>
                  <h2 className="font-display text-2xl font-bold">Week {week.week}</h2>
                  {week.title && <p className="text-muted-foreground">{week.title}</p>}
                </div>
              </div>
              <Tabs value={tab} onValueChange={(v) => setTab(v as "A" | "B")}>
                <TabsList className="rounded-full p-1 bg-secondary mb-6">
                  <TabsTrigger value="A" className="rounded-full px-5">
                    Division A · Easier
                  </TabsTrigger>
                  <TabsTrigger value="B" className="rounded-full px-5">
                    Division B · Harder
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="A">
                  <ProblemPanel weekId={weekId(week.week)} division="A" problem={week.divisionA} />
                </TabsContent>
                <TabsContent value="B">
                  <ProblemPanel weekId={weekId(week.week)} division="B" problem={week.divisionB} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
