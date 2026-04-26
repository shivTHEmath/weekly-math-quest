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
    divisionA: {
      statement: "A lake contains $250$ trout, along with a variety of other fish. When a marine biologist catches and releases a sample of $180$ fish from the lake, $30$ are identified as trout. Assume that the ratio of trout to the total number of fish is the same in both the sample and the lake. How many fish are there in the lake?",
      answers: ["1500"],
      solution: "Note that $$\\frac{\\text{number of trout}}{\\text{total number of fish}} = \\frac{30}{180} = \\frac{1}{6}.$$ So, the total number of fish is $6$ times the number of trout. Since the lake contains $250$ trout, there are $250\\cdot 6 = \\boxed{1500}$ fish in the lake.",
    },
    divisionB: {
      statement: "Fifteen integers $a_1, a_2, a_3, \\dots, a_{15}$ are arranged in order on a number line. The integers are equally spaced and have the property that $$1 \\le a_1 \\le 10, \\quad 13 \\le a_2 \\le 20, \\quad \\text{and} \\quad 241 \\le a_{15} \\le 250.$$ What is the sum of digits of $a_{14}$?",
      answers: ["8"],
      solution: "We can find the possible values of the common difference by finding the numbers which satisfy the conditions. To do this, we find the minimum of the last two: $241-20=221$, and the maximum: $250-13=237$. There is a difference of $13$ between them, so only $17$ and $18$ work, as $17\\cdot 13=221$, so $17$ satisfies $221\\leq 13x\\leq 237$. The number $18$ is similarly found. $19$, however, is too much.\n\nNow, we check with the first and last equations using the same method. We know $241-10\\leq 14x\\leq 250-1$. Therefore, $231\\leq 14x\\leq 249$. We test both values, and we find that $18$ is too large to satisfy this inequality. On the other hand, $17$ satisfies it, so the common difference is $17$.\n\nThe last step is to find the first term. The first term can only be from $1$ to $3$ since any larger value would render the second inequality invalid. Testing these three, we find that only $a_1=3$ satisfies all the inequalities. Therefore, $a_{14}=13\\cdot 17+3=224$. The sum of the digits is $2+2+4=\\boxed{8}$.",
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