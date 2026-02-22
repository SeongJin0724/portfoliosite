export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-6 md:py-8 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-display font-bold text-foreground">
          LSJ<span className="text-accent">.</span>
        </span>
        <p className="text-xs md:text-sm text-muted-foreground font-body text-center sm:text-right">
          © {year} 이성진. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
