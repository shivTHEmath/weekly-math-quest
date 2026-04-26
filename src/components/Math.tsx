import { MathJaxContext, MathJax } from "better-react-mathjax"
import { ReactNode } from "react"

const config = {
  loader: { load: ["[tex]/ams", "[tex]/boldsymbol", "input/asciimath"] },
  tex: {
    packages: { "[+]": ["ams", "boldsymbol"] },
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
  },
  asciimath: {
    delimiters: [["`", "`"]],
  },
  options: {
    enableMenu: false,
  },
}

export function MathProvider({ children }: { children: ReactNode }) {
  return <MathJaxContext config={config}>{children}</MathJaxContext>
}

export function Tex({ children, className }: { children: string; className?: string }) {
  return (
    <MathJax dynamic className={className}>
      {children}
    </MathJax>
  )
}

/** Render a raw AsciiMath string (no delimiters needed). */
export function AsciiTex({ children, className }: { children: string; className?: string }) {
  // Escape backticks so they don't break the delimiter
  const safe = children.replace(/`/g, "")
  return (
    <MathJax dynamic className={className}>
      {`\`${safe}\``}
    </MathJax>
  )
}