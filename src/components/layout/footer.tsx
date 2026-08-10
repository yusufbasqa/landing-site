const FOOTER_LINKS = [
  { href: "#features", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#demo", label: "Request a demo" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-ink">
              Standin
            </p>
            <p className="mt-2 max-w-xs text-sm text-ink/55">
              Substitute coverage for schools that can&rsquo;t afford to wait.
            </p>
          </div>

          <nav className="flex gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink/60 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="font-mono text-xs text-ink/40">© 2026 Standin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
