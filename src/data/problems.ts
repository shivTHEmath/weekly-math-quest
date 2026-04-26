// ============================================================
// PROBLEM OF THE WEEK — Data file
// ------------------------------------------------------------
// Add one entry to PROBLEMS for each week. Weeks are numbered
// starting from week 1. The current week is determined by
// counting how many "Saturday 11:59pm PST" boundaries have
// passed since SEASON_START (inclusive of week 1 from start).
//
// LaTeX: write everything as a normal string. Use \\ for
// backslashes, e.g. "\\frac{1}{2}". The site renders with
// MathJax, so use $...$ for inline math and $$...$$ for display
// math inside `problem` and `solution`.
//
// answers: list ALL accepted answer strings. The grader accepts
// any input that is either an exact (normalized) match OR
// numerically equivalent (to ~10 decimals) when parsed as
// LaTeX or AsciiMath. Examples for "one half":
//   answers: ["1/2", "0.5", "\\frac{1}{2}"]
// ============================================================

export type Problem = {
  statement: string  // LaTeX/markdown allowed
  answers: string[]  // accepted answers
  solution: string   // LaTeX/markdown allowed
}

export type WeekProblems = {
  week: number             // 1-indexed
  title?: string           // optional theme/title for the week
  divisionA: Problem       // easier
  divisionB: Problem       // harder
}

// First Saturday 11:59pm PST when week 1 should be live.
// Update this to the date you want the season to begin.
// Time is fixed at Saturday 23:59 America/Los_Angeles.
export const SEASON_START_ISO = "2025-01-04T23:59:00-08:00"

export const PROBLEMS: WeekProblems[] = [
  {
    week: 1,
    title: "Welcome to the Mathathon",
    divisionA: {
      statement: "Compute $\\dfrac{1}{2} + \\dfrac{1}{3}$.",
      answers: ["5/6", "\\frac{5}{6}", "0.8333333333"],
      solution: "Common denominator is $6$: $\\dfrac{1}{2}+\\dfrac{1}{3}=\\dfrac{3}{6}+\\dfrac{2}{6}=\\boxed{\\dfrac{5}{6}}.$",
    },
    divisionB: {
      statement: "Find the smallest positive integer $n$ such that $n!$ ends in exactly $5$ trailing zeros.",
      answers: ["25"],
      solution: "The number of trailing zeros of $n!$ equals $\\sum_{k\\ge 1} \\lfloor n/5^k\\rfloor$. For $n=24$: $4$. For $n=25$: $5+1=6$. For $n=20,21,22,23,24$ we get $4$, and for $n=25$ we already get $6$. So no $n$ gives exactly $5$? Wait — checking $n=20$ gives $4+0=4$; $n=24$ gives $4$; $n=25$ jumps to $6$. So in fact no $n$ gives exactly $5$ — replace this with your real problem. (Placeholder.)",
    },
  },
]

// ----------------------------------------------------------------
// Week resolution helpers
// ----------------------------------------------------------------

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

/** Returns the 1-indexed current week, or 0 if the season hasn't started. */
export function getCurrentWeekNumber(now: Date = new Date()): number {
  const start = new Date(SEASON_START_ISO).getTime()
  const diff = now.getTime() - start
  if (diff < 0) return 0
  return Math.floor(diff / WEEK_MS) + 1
}

/** Returns the WeekProblems entry for the current week, or null. */
export function getCurrentWeek(now: Date = new Date()): WeekProblems | null {
  const n = getCurrentWeekNumber(now)
  if (n <= 0) return null
  return PROBLEMS.find(p => p.week === n) ?? null
}

/** Returns the Date when the next problem is released. */
export function getNextReleaseDate(now: Date = new Date()): Date {
  const start = new Date(SEASON_START_ISO).getTime()
  const diff = now.getTime() - start
  const weeksPassed = Math.max(0, Math.floor(diff / WEEK_MS) + 1)
  return new Date(start + weeksPassed * WEEK_MS)
}

/** Returns all weeks that have already been released (excluding current). */
export function getArchivedWeeks(now: Date = new Date()): WeekProblems[] {
  const current = getCurrentWeekNumber(now)
  return PROBLEMS.filter(p => p.week < current).sort((a, b) => b.week - a.week)
}

/** Stable id for a week, used as DB key. */
export function weekId(week: number): string {
  return `w${String(week).padStart(4, "0")}`
}