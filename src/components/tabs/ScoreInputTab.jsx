import { RotateCcw } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { SUBJECT_GROUPS } from '../../utils/subjects'
import { KHU_VUC_OPTIONS, DOI_TUONG_OPTIONS } from '../../utils/priorityScore'

export default function ScoreInputTab({
  scores, onChangeScore, onResetScores,
  khuVuc, onChangeKhuVuc, doiTuong, onChangeDoiTuong,
}) {
  const filledCount = Object.values(scores).filter(v => v !== '' && parseFloat(v) > 0).length

  const handleInput = (id, raw) => {
    if (raw !== '' && !/^\d{0,2}(\.\d{0,2})?$/.test(raw)) return
    onChangeScore(id, raw)
  }

  const handleBlur = (id, raw) => {
    if (raw === '') return
    let val = parseFloat(raw)
    if (Number.isNaN(val)) return onChangeScore(id, '')
    val = Math.min(10, Math.max(0, val))
    onChangeScore(id, String(val))
  }

  const inputStyle = {
    width: '100%',
    border: '1.5px solid var(--color-line)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '16px',
    color: 'var(--color-ink)',
    background: 'var(--color-paper)',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s, background 0.15s',
  }

  const selectStyle = {
    ...inputStyle,
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  }

  return (
    <div>
      <SectionHeader
        index="01"
        title="Nhập điểm Học bạ"
        description="Điểm trung bình từng môn theo thang 0–10. Chỉ những môn có điểm mới được tính vào tổ hợp xét tuyển."
        aside={
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-ink-soft)', fontWeight: 600 }}>
              {filledCount}/14 môn
            </span>
            <button
              onClick={onResetScores}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                border: '1.5px solid var(--color-line)',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '13px', fontWeight: 600,
                color: 'var(--color-ink-soft)',
                background: 'var(--color-paper-raised)',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-risk-500)'; e.currentTarget.style.color = 'var(--color-risk-600)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-line)'; e.currentTarget.style.color = 'var(--color-ink-soft)' }}
            >
              <RotateCcw size={13} />
              Xoá hết
            </button>
          </div>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {SUBJECT_GROUPS.map((group) => (
          <div key={group.id} style={{
            border: '1.5px solid var(--color-line)',
            borderRadius: '16px',
            padding: '20px 24px',
            background: 'var(--color-paper-raised)',
            boxShadow: '0 1.5px 4px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-600)',
              marginBottom: '16px',
            }}>
              {group.label}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '12px',
            }}>
              {group.subjects.map((subject) => (
                <label key={subject.id} style={{ display: 'block' }}>
                  <span style={{
                    display: 'block',
                    marginBottom: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--color-ink-soft)',
                  }}>
                    {subject.label}
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0 – 10"
                    value={scores[subject.id]}
                    onChange={e => handleInput(subject.id, e.target.value)}
                    onBlur={e => handleBlur(subject.id, e.target.value)}
                    style={inputStyle}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--color-brand-500)'
                      e.target.style.background = 'var(--color-paper-raised)'
                      e.target.style.boxShadow = '0 0 0 4px var(--color-brand-100)'
                    }}
                    onBlurCapture={e => {
                      e.target.style.borderColor = 'var(--color-line)'
                      e.target.style.background = 'var(--color-paper)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Ưu tiên */}
        <div style={{
          border: '1.5px solid var(--color-line)',
          borderRadius: '16px',
          padding: '20px 24px',
          background: 'var(--color-paper-raised)',
          boxShadow: '0 1.5px 4px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-brand-600)',
            marginBottom: '16px',
          }}>
            Diện ưu tiên
          </h3>
          <div style={{ display: 'grid', gap: '14px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <label style={{ display: 'block' }}>
              <span style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-soft)' }}>
                Khu vực ưu tiên
              </span>
              <select value={khuVuc} onChange={e => onChangeKhuVuc(e.target.value)} style={selectStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--color-brand-500)'; e.target.style.boxShadow = '0 0 0 4px var(--color-brand-100)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--color-line)'; e.target.style.boxShadow = 'none' }}
              >
                {KHU_VUC_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label} (+{opt.score})</option>
                ))}
              </select>
            </label>
            <label style={{ display: 'block' }}>
              <span style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--color-ink-soft)' }}>
                Đối tượng ưu tiên
              </span>
              <select value={doiTuong} onChange={e => onChangeDoiTuong(e.target.value)} style={selectStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--color-brand-500)'; e.target.style.boxShadow = '0 0 0 4px var(--color-brand-100)' }}
                onBlur={e => { e.target.style.borderColor = 'var(--color-line)'; e.target.style.boxShadow = 'none' }}
              >
                {DOI_TUONG_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}{opt.score > 0 ? ` (+${opt.score})` : ''}</option>
                ))}
              </select>
            </label>
          </div>
          <p style={{ marginTop: '14px', fontSize: '12.5px', lineHeight: 1.7, color: 'var(--color-ink-soft)' }}>
            Điểm cộng thực tế theo công thức Bộ GD&ĐT: nếu điểm tổ hợp 3 môn gốc ≥ 22.5, điểm ưu tiên giảm dần theo{' '}
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>(30 − điểm gốc) / 7.5</span>.
          </p>
        </div>
      </div>
    </div>
  )
}