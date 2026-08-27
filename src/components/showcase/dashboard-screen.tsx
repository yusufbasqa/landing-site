const CANDIDATES = [
  { name: "M. Alvarez", score: 92, active: true },
  { name: "J. Patel", score: 88, active: false },
  { name: "D. Osei", score: 81, active: false },
];

const NAV = ["Dashboard", "Coverage", "Substitutes", "Schools"];

export function DashboardScreen() {
  return (
    <div className="flex h-full text-[11px]">
      <div className="hidden w-36 flex-col gap-1 border-r border-border/70 bg-surface-alt/50 p-3 sm:flex">
        <div className="mb-3 flex items-center gap-1.5 px-2">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="font-display text-xs font-semibold text-ink">Standin</span>
        </div>
        {NAV.map((label, i) => (
          <div
            key={label}
            className={`rounded-md px-2 py-1.5 ${
              i === 1 ? "bg-brand/10 font-medium text-brand" : "text-ink/45"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="flex-1 p-4">
        <p className="font-mono text-[10px] uppercase tracking-wide text-ink/40">
          Open · 3rd period · Room 214
        </p>
        <div className="mt-3 space-y-1.5">
          {CANDIDATES.map((c) => (
            <div
              key={c.name}
              className={`flex items-center justify-between rounded-md border px-2.5 py-1.5 ${
                c.active ? "border-brand/30 bg-brand/5" : "border-border bg-surface-raised"
              }`}
            >
              <span className="font-medium text-ink">{c.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-ink/40">{c.score}</span>
                {c.active && (
                  <span className="rounded-full bg-accent-green/10 px-1.5 py-0.5 font-mono text-[9px] text-accent-green">
                    Confirmed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
