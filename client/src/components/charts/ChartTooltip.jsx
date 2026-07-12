export function ChartTooltip({ active, payload, label, valueFormatter = (value) => value }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-md">
      {label && <p className="mb-1 font-medium text-foreground">{label}</p>}
      <div className="flex flex-col gap-1">
        {payload.map((entry) => (
          <div key={entry.dataKey ?? entry.name} className="flex items-center gap-1.5">
            <span className="h-0.5 w-3 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-medium text-foreground">{valueFormatter(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
