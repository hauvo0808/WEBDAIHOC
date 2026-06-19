import SectionHeader from '../ui/SectionHeader'
import EmptyState from '../ui/EmptyState'
import { SUBJECT_LABEL } from '../../utils/subjects'

const RANK_STYLE = [
  'bg-brand-600 text-white', // #1
  'bg-ink text-white', // #2
  'bg-ink-soft text-white', // #3
]

export default function TopCombinationsTab({ results, onGoToInput }) {
  return (
    <div>
      <SectionHeader
        index="02"
        title="Top 10 tổ hợp cao nhất"
        description="Xếp hạng tổng điểm xét tuyển (3 môn + điểm ưu tiên thực tế) trong số các tổ hợp thí sinh đã nhập đủ điểm."
      />

      {results.length === 0 ? (
        <EmptyState onGoToInput={onGoToInput} />
      ) : (
        <ol className="space-y-2.5">
          {results.map((r, i) => (
            <li
              key={r.code}
              className="animate-rise flex items-center gap-4 rounded-xl border border-line bg-paper-raised px-4 py-3.5 transition-all duration-200 hover:border-brand-300 hover:shadow-md sm:px-5"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[13px] font-bold sm:h-9 sm:w-9 ${
                  RANK_STYLE[i] ?? 'bg-gray-100 text-ink-soft'
                }`}
              >
                {i + 1}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[12.5px] font-semibold text-ink">
                    {r.code}
                  </span>
                  <span className="truncate text-[13px] text-ink-soft">
                    {r.subjects.map((s) => SUBJECT_LABEL[s]).join(' · ')}
                  </span>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-display font-mono text-lg font-bold leading-none text-brand-600 sm:text-xl">
                  {r.total.toFixed(2)}
                </p>
                <p className="mt-1 text-[11px] text-ink-soft">
                  {r.baseScore.toFixed(2)} + ƯT {r.bonus.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
