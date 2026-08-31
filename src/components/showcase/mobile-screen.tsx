export function MobileScreen() {
  return (
    <div className="flex h-full flex-col justify-between p-4 pt-9">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink/35">
          SubnGo · now
        </p>
        <div className="mt-3 rounded-xl border border-accent-green/25 bg-accent-green/10 p-3">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            <span className="font-mono text-[9px] uppercase tracking-wide text-accent-green">
              Confirmed
            </span>
          </div>
          <p className="mt-2 text-xs font-medium text-ink">3rd period · Room 214</p>
          <p className="mt-0.5 text-[11px] text-ink/55">Lincoln Elementary · 8:00 AM</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="w-fit max-w-[85%] rounded-lg rounded-bl-sm bg-surface-alt px-2.5 py-1.5 text-[11px] text-ink/75">
          On my way
        </div>
        <button className="mt-2 w-full rounded-lg bg-brand py-2 text-[11px] font-medium text-white">
          View details
        </button>
      </div>
    </div>
  );
}
