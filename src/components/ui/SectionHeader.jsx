export default function SectionHeader({ index, title, description, aside }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
      <div className="flex items-start gap-3.5">
        <span className="font-mono text-sm font-bold text-brand-400 pt-1 opacity-60">
          {index}
        </span>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            lineHeight: 1.1,
            margin: 0,
          }}>
            {title}
          </h1>
          {description && (
            <p style={{
              marginTop: '6px',
              fontSize: '14px',
              color: 'var(--color-ink-soft)',
              fontWeight: 400,
              lineHeight: 1.6,
            }}>
              {description}
            </p>
          )}
        </div>
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  )
}