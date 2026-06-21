import { useEffect, useMemo, useRef } from 'react'
import { MapPin } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import EmptyState from '../ui/EmptyState'
import { StatusStamp } from '../ui/StatusTag'
import universitiesData from '../../data/universities.json'
import { buildSchoolSuggestions, countByStatus } from '../../utils/admissionLogic'
import { fireSuccessConfetti } from '../../utils/confetti'

export default function SchoolSuggestionTab({ allCombinationResults, onGoToInput }) {
  const suggestions = useMemo(
    () => buildSchoolSuggestions(universitiesData, allCombinationResults),
    [allCombinationResults]
  )
  const counts = useMemo(() => countByStatus(suggestions), [suggestions])

  const prevPassCount = useRef(0)
  useEffect(() => {
    if (counts.pass > 0 && prevPassCount.current === 0) {
      fireSuccessConfetti()
    }
    prevPassCount.current = counts.pass
  }, [counts.pass])

  return (
    <div>
      <SectionHeader
        index="03"
        title="Gợi ý trường Đại học"
        description="So sánh tổ hợp tốt nhất phù hợp với từng ngành so với điểm chuẩn 2025, xếp theo điểm chuẩn từ cao xuống thấp."
        aside={
          suggestions.length > 0 && (
            <div className="flex gap-2">
              <StatChip label="Chắc chắn đậu" value={counts.pass} tone="pass" />
              <StatChip label="Có khả năng" value={counts.maybe} tone="maybe" />
              <StatChip label="Nguy hiểm" value={counts.risk} tone="risk" />
            </div>
          )
        }
      />

      {suggestions.length === 0 ? (
        <EmptyState onGoToInput={onGoToInput} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {suggestions.map((item, i) => (
            <SchoolCard
              key={`${item.schoolId}-${item.maNganh}`}
              item={item}
              delay={i * 30}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function StatChip({ label, value, tone }) {
  const toneClass = {
    pass: 'bg-pass-50 text-pass-600',
    maybe: 'bg-maybe-50 text-maybe-600',
    risk: 'bg-risk-50 text-risk-600',
  }[tone]
  return (
    <div className={`rounded-lg px-3 py-1.5 text-center ${toneClass}`}>
      <p className="font-mono text-sm font-bold leading-none">{value}</p>
      <p className="mt-0.5 text-[10px] font-medium leading-none">{label}</p>
    </div>
  )
}

function SchoolCard({ item, delay }) {
  const range = 8 // độ rộng thang trực quan quanh điểm chuẩn (±4)
  const lower = item.diemChuan2025 - range / 2
  const studentPercent = Math.min(
    100,
    Math.max(0, ((item.diemThiSinh - lower) / range) * 100)
  )

  const barColor = {
    pass: 'bg-pass-500',
    maybe: 'bg-maybe-500',
    risk: 'bg-risk-500',
  }[item.status.key]

  return (
    <div
      className={`animate-rise group rounded-2xl border bg-paper-raised p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.status.cardClass}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-ink-soft">
          <MapPin className="h-3 w-3" />
          {item.schoolShort}
        </div>
        <StatusStamp status={item.status} />
      </div>

      <h3 style={{ marginTop: '12px', fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 800, lineHeight: 1.3, color: 'var(--color-ink)' }}>
        {item.tenNganh}
      </h3>
      <p className="mt-0.5 truncate text-[12.5px] text-ink-soft">
        {item.schoolName}
      </p>

      <div className="my-4 h-px bg-line" />

      <div className="grid grid-cols-3 gap-2 text-center">
        <Metric label="Tổ hợp dùng" value={item.toHopDung} mono />
        <Metric label="Điểm chuẩn" value={item.diemChuan2025.toFixed(2)} mono />
        <Metric
          label="Điểm của bạn"
          value={item.diemThiSinh.toFixed(2)}
          mono
          emphasize
        />
      </div>

      <div className="mt-4">
        <div className="relative h-1.5 rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${studentPercent}%` }}
          />
          <div className="absolute left-1/2 top-1/2 h-2.5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/50" />
        </div>
        <p className="mt-1.5 text-center text-[11px] text-ink-soft">
          {item.diff >= 0 ? '+' : ''}
          {item.diff.toFixed(2)} điểm so với chuẩn 2025
        </p>
      </div>
    </div>
  )
}

function Metric({ label, value, mono, emphasize }) {
  return (
    <div>
      <p
        style={{
  fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
  fontSize: '16px',
  fontWeight: 800,
  color: emphasize ? 'var(--color-brand-600)' : 'var(--color-ink)',
}}
      >
        {value}
      </p>
      <p className="mt-0.5 text-[10.5px] text-ink-soft">{label}</p>
    </div>
  )
}
