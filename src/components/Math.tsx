import { MathJaxContext, MathJax } from "better-react-mathjax"
import { ReactNode } from "react"

const config = {
  loader: { load: ["[tex]/ams", "[tex]/boldsymbol"] },
  tex: {
    packages: { "[+]": ["ams", "boldsymbol"] },
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
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