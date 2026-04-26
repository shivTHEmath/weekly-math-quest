export default function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-20">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} STEMist Education</p>
        <p>New problems every Sunday.</p>
      </div>
    </footer>
  );
}
