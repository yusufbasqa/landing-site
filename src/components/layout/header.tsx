import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Product" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
        >
          <Image
            src="/logo.jpg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-md object-cover"
          />
          SubnGo
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink/65 transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="https://app.subngo.app/login"
            className="text-sm text-ink/65 transition-colors hover:text-ink"
          >
            Log in
          </a>

          <a
            href="#demo"
            className="rounded-[10px] bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-deep"
          >
            Request a demo
          </a>
        </div>
      </div>
    </header>
  );
}
