export default function SectionHeader({ index, title, description, aside }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
      <div className="flex items-start gap-3.5">
        <span className="font-mono text-sm font-semibold text-brand-500/70 pt-1">
          {index}
        </span>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-[14px] text-ink-soft">{description}</p>
          )}
        </div>
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  )
}
