import SectionHeader from '../ui/SectionHeader'
import EmptyState from '../ui/EmptyState'
import { SUBJECT_LABEL } from '../../utils/subjects'

const RANK_STYLE = [
  { bg: 'var(--color-brand-600)', color: '#fff', shadow: '0 4px 12px rgba(234,88,12,0.35)' },
  { bg: 'var(--color-ink)', color: '#fff', shadow: '0 4px 12px rgba(28,25,23,0.25)' },
  { bg: 'var(--color-ink-soft)', color: '#fff', shadow: '0 4px 12px rgba(87,83,78,0.2)' },
]

export default function TopCombinationsTab({ results, onGoToInput }) {
  return (
    <div>
      <SectionHeader
        index="02"
        title="Top 10 tổ hợp"
        description="Xếp hạng tổng điểm xét tuyển (3 môn + điểm ưu tiên thực tế) trong số các tổ hợp thí sinh đã nhập đủ điểm."
      />

      {results.length === 0 ? (
        <EmptyState onGoToInput={onGoToInput} />
      ) : (
        <ol style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {results.map((r, i) => (
            <li
              key={r.code}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'var(--color-paper-raised)',
                border: '1.5px solid var(--color-line)',
                borderRadius: '16px',
                padding: '16px 20px',
                opacity: 0,
                animation: 'rise 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
                animationDelay: `${i * 40}ms`,
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-brand-200)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(234,88,12,0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-line)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Rank badge */}
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                fontWeight: 800,
                flexShrink: 0,
                background: RANK_STYLE[i]?.bg ?? 'var(--color-line)',
                color: RANK_STYLE[i]?.color ?? 'var(--color-ink-soft)',
                boxShadow: RANK_STYLE[i]?.shadow ?? 'none',
              }}>
                {i + 1}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                    background: 'var(--color-paper)',
                    border: '1px solid var(--color-line)',
                    borderRadius: '8px',
                    padding: '2px 10px',
                  }}>
                    {r.code}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: 'var(--color-ink-soft)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {r.subjects.map((s) => SUBJECT_LABEL[s]).join(' · ')}
                  </span>
                </div>
              </div>

              {/* Score */}
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '24px',
                  fontWeight: 800,
                  color: 'var(--color-brand-600)',
                  lineHeight: 1,
                }}>
                  {r.total.toFixed(2)}
                </div>
                <div style={{
                  marginTop: '4px',
                  fontSize: '11px',
                  color: 'var(--color-ink-soft)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {r.baseScore.toFixed(2)} + ƯT {r.bonus.toFixed(2)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}