const STAMP_STYLES = {
  pass: 'border-pass-600 text-pass-600',
  maybe: 'border-maybe-600 text-maybe-600',
  risk: 'border-risk-600 text-risk-600',
}

const STAMP_LABEL = {
  pass: 'ĐẬU',
  maybe: 'CÓ KHẢ NĂNG',
  risk: 'RỦI RO',
}

export function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${status.badgeClass}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full bg-white/80`} />
      {status.label}
    </span>
  )
}

export function StatusStamp({ status }) {
  return (
    <div
      className={`pointer-events-none select-none rounded-md border-[2.5px] px-2.5 py-1 text-center font-display text-[11px] font-bold uppercase tracking-wide ${STAMP_STYLES[status.key]} animate-stamp`}
      style={{ transform: 'rotate(-8deg)' }}
    >
      {STAMP_LABEL[status.key]}
    </div>
  )
}
