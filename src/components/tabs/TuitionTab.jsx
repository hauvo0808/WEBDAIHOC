import { useState, useEffect, useRef } from 'react'
import universities from '../../data/universities.json'

const GLOBAL_MIN = 0
const GLOBAL_MAX = 1_000_000_000

function formatVND(amount) {
  if (amount === 0) return 'Miễn phí'
  if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(1).replace('.0', '') + ' tỷ'
  if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(0) + 'tr'
  return amount.toLocaleString('vi-VN') + 'đ'
}

function formatVNDFull(amount) {
  if (amount === 0) return 'Miễn phí'
  return amount.toLocaleString('vi-VN') + ' ₫'
}

function useCountUp(target, duration = 1200, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    if (target === 0) { setValue(0); return }
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 4)
      setValue(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return value
}

function AnimatedBar({ min, max, visible }) {
  const leftPct = (min / GLOBAL_MAX) * 100
  const widthPct = ((max - min) / GLOBAL_MAX) * 100

  return (
    <div className="relative h-1.5 rounded-full w-full overflow-visible" style={{ background: 'var(--color-line)' }}>
      <div
        className="absolute top-0 h-1.5 rounded-full"
        style={{
          left: `${leftPct}%`,
          width: visible ? `${widthPct}%` : '0%',
          background: 'linear-gradient(90deg, var(--color-brand-400), var(--color-brand-600))',
          transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.1s',
        }}
      />
      {visible && (
        <>
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-md"
            style={{
              left: `calc(${leftPct}% - 6px)`,
              background: 'var(--color-brand-400)',
              transition: 'left 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-md"
            style={{
              left: `calc(${leftPct + widthPct}% - 6px)`,
              background: 'var(--color-brand-600)',
              transition: 'left 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </>
      )}
    </div>
  )
}

function TuitionCard({ u, index, visible }) {
  const minVal = useCountUp(u.hocPhi.min, 1000, visible)
  const maxVal = useCountUp(u.hocPhi.max, 1200, visible)
  const [hovered, setHovered] = useState(false)

  const rangePercent = Math.round(((u.hocPhi.max - u.hocPhi.min) / GLOBAL_MAX) * 100)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)`,
        transitionDelay: `${index * 60}ms`,
        background: hovered ? 'var(--color-paper-raised)' : 'var(--color-paper-raised)',
        border: hovered ? '1.5px solid var(--color-brand-200)' : '1.5px solid var(--color-line)',
        borderRadius: '16px',
        padding: '20px 24px',
        cursor: 'default',
        boxShadow: hovered
          ? '0 8px 32px rgba(234,88,12,0.10), 0 1.5px 4px rgba(0,0,0,0.04)'
          : '0 1.5px 4px rgba(0,0,0,0.04)',
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 60}ms, border 0.2s ease, box-shadow 0.2s ease`,
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 800,
              fontSize: '17px',
              color: 'var(--color-ink)',
              lineHeight: 1.3,
            }}>
              {u.tenTruong}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--color-brand-600)',
              background: 'var(--color-brand-50)',
              border: '1px solid var(--color-brand-200)',
              borderRadius: '6px',
              padding: '1px 7px',
              letterSpacing: '0.05em',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
              {u.vietTat}
            </span>
          </div>
        </div>

        {/* Range badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: rangePercent > 15 ? 'var(--color-risk-50)' : 'var(--color-pass-50)',
          borderRadius: '8px',
          padding: '3px 10px',
          marginLeft: '14px',
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 900,
            fontFamily: 'var(--font-mono)',
            color: rangePercent > 15 ? 'var(--color-risk-600)' : 'var(--color-pass-600)',
          }}>
            ~{rangePercent}%
          </span>
          <span style={{ fontSize: '10px', color: 'var(--color-ink-soft)' }}>biên độ</span>
        </div>
      </div>

      {/* Bar */}
      <div style={{ marginBottom: '15px' }}>
        <AnimatedBar min={u.hocPhi.min} max={u.hocPhi.max} visible={visible} />
      </div>

      {/* Numbers row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '14px', color: 'var(--color-ink-soft)', marginBottom: '1px' }}>Thấp nhất</div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: '20px',
            color: u.hocPhi.min === 0 ? 'var(--color-pass-600)' : 'var(--color-ink)',
          }}>
            {visible ? formatVNDFull(minVal) : '—'}
          </div>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--color-line)', fontSize: '20px', lineHeight: 1 }}>
          ——→
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: 'var(--color-ink-soft)', marginBottom: '1px' }}>Cao nhất</div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: '16px',
            color: 'var(--color-brand-600)',
          }}>
            {visible ? formatVNDFull(maxVal) : '—'}
          </div>
        </div>
      </div>

      {/* Ghi chú */}
      {u.hocPhi.ghiChu && (
        <div style={{
          marginTop: '10px',
          paddingTop: '10px',
          borderTop: '1px solid var(--color-line)',
          fontSize: '11px',
          color: 'var(--color-ink-soft)',
          fontStyle: 'italic',
        }}>
          * {u.hocPhi.ghiChu}
        </div>
      )}
    </div>
  )
}

export default function TuitionTab() {
  const [sortBy, setSortBy] = useState('name')
  const [search, setSearch] = useState('')
  const [budget, setBudget] = useState('')
  const [visibleCards, setVisibleCards] = useState(new Set())
  const cardRefs = useRef([])

  const data = universities.truong.filter(u => u.hocPhi)

  const budgetNum = budget ? parseInt(budget.replace(/\D/g, '')) * 1_000_000 : null

  const filtered = [...data]
    .filter(u =>
      u.tenTruong.toLowerCase().includes(search.toLowerCase()) ||
      u.vietTat.toLowerCase().includes(search.toLowerCase())
    )
    .filter(u => budgetNum === null || u.hocPhi.min <= budgetNum)
    .sort((a, b) => {
      if (sortBy === 'min') return a.hocPhi.min - b.hocPhi.min
      if (sortBy === 'max') return b.hocPhi.max - a.hocPhi.max
      if (sortBy === 'range') return (b.hocPhi.max - b.hocPhi.min) - (a.hocPhi.max - a.hocPhi.min)
      return a.tenTruong.localeCompare(b.tenTruong, 'vi')
    })

  // Intersection Observer cho stagger animation
  useEffect(() => {
    const observers = []
    cardRefs.current.forEach((ref, i) => {
      if (!ref) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, i]))
            obs.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      obs.observe(ref)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [filtered.length, search, sortBy])

  // Reset visibility khi filter thay đổi
  useEffect(() => {
    setVisibleCards(new Set())
  }, [search, sortBy])

  // Stats
  const avgMin = Math.round(filtered.reduce((s, u) => s + u.hocPhi.min, 0) / (filtered.length || 1))
  const avgMax = Math.round(filtered.reduce((s, u) => s + u.hocPhi.max, 0) / (filtered.length || 1))
  const cheapest = filtered.reduce((a, b) => a.hocPhi.min < b.hocPhi.min ? a : b, filtered[0])
  const mostExpensive = filtered.reduce((a, b) => a.hocPhi.max > b.hocPhi.max ? a : b, filtered[0])

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>

      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--color-ink)',
            margin: 0,
          }}>
            Học phí
          </h2>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-ink-soft)',
            background: 'var(--color-line)',
            borderRadius: '6px',
            padding: '2px 8px',
          }}>
            {filtered.length} trường
          </span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--color-ink-soft)', margin: 0 }}>
          Biên độ học phí/năm · Kéo xuống để so sánh
        </p>
      </div>

      {/* Stats bar */}
      {filtered.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px',
          marginBottom: '24px',
        }}>
          {[
            { label: 'Rẻ nhất', value: cheapest?.vietTat, sub: formatVND(cheapest?.hocPhi.min), color: 'var(--color-pass-600)', bg: 'var(--color-pass-50)' },
            { label: 'Đắt nhất', value: mostExpensive?.vietTat, sub: formatVND(mostExpensive?.hocPhi.max), color: 'var(--color-risk-600)', bg: 'var(--color-risk-50)' },
            { label: 'TB thấp nhất', value: formatVND(avgMin), sub: 'trung bình', color: 'var(--color-ink)', bg: 'var(--color-paper-raised)' },
            { label: 'TB cao nhất', value: formatVND(avgMax), sub: 'trung bình', color: 'var(--color-brand-600)', bg: 'var(--color-paper-raised)' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: stat.bg,
              border: '1.5px solid var(--color-line)',
              borderRadius: '12px',
              padding: '14px 16px',
              animation: 'rise 0.5s cubic-bezier(0.16,1,0.3,1) both',
              animationDelay: `${i * 80}ms`,
            }}>
              <div style={{ fontSize: '11px', color: 'var(--color-ink-soft)', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '22px', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-ink-soft)', marginTop: '2px' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Tìm trường..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: '180px',
            border: '1.5px solid var(--color-line)',
            borderRadius: '10px',
            padding: '9px 14px',
            fontSize: '13px',
            fontFamily: 'var(--font-body)',
            background: 'var(--color-paper-raised)',
            color: 'var(--color-ink)',
            outline: 'none',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--color-brand-400)'}
          onBlur={e => e.target.style.borderColor = 'var(--color-line)'}
        />
        {[
          { val: 'name', label: 'A–Z' },
          { val: 'min', label: 'Rẻ nhất' },
          { val: 'max', label: 'Đắt nhất' },
          { val: 'range', label: 'Biên độ' },
        ].map(btn => (
          <button
            key={btn.val}
            onClick={() => setSortBy(btn.val)}
            style={{
              border: sortBy === btn.val ? '1.5px solid var(--color-brand-500)' : '1.5px solid var(--color-line)',
              borderRadius: '10px',
              padding: '9px 16px',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              background: sortBy === btn.val ? 'var(--color-brand-50)' : 'var(--color-paper-raised)',
              color: sortBy === btn.val ? 'var(--color-brand-600)' : 'var(--color-ink-soft)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
      {/* Bộ lọc ngân sách */}
      <div style={{
        background: 'var(--color-paper-raised)',
        border: '1.5px solid var(--color-brand-200)',
        borderRadius: '14px',
        padding: '16px 20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-ink)', marginBottom: '6px' }}>
            💰 Ngân sách của bạn (triệu ₫/năm)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="number"
              placeholder="VD: 50 (tức 50 triệu)"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              style={{
                flex: 1,
                border: '1.5px solid var(--color-brand-300)',
                borderRadius: '10px',
                padding: '9px 14px',
                fontSize: '14px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                background: 'var(--color-paper)',
                color: 'var(--color-brand-600)',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--color-brand-500)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-brand-300)'}
            />
            <span style={{ fontSize: '13px', color: 'var(--color-ink-soft)', whiteSpace: 'nowrap' }}>triệu/năm</span>
            {budget && (
              <button
                onClick={() => setBudget('')}
                style={{
                  border: 'none',
                  background: 'var(--color-line)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: 'var(--color-ink-soft)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Xoá lọc
              </button>
            )}
          </div>
        </div>

        {/* Kết quả lọc */}
        {budgetNum && (
          <div style={{
            background: filtered.length > 0 ? 'var(--color-pass-50)' : 'var(--color-risk-50)',
            border: `1.5px solid ${filtered.length > 0 ? 'var(--color-pass-200)' : 'var(--color-risk-200)'}`,
            borderRadius: '10px',
            padding: '10px 16px',
            textAlign: 'center',
            minWidth: '120px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 900,
              fontSize: '24px',
              color: filtered.length > 0 ? 'var(--color-pass-600)' : 'var(--color-risk-600)',
            }}>
              {filtered.length}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--color-ink-soft)' }}>
              trường phù hợp
            </div>
          </div>
        )}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        {[
          { color: 'var(--color-brand-400)', label: 'Thấp nhất' },
          { color: 'var(--color-brand-600)', label: 'Cao nhất' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: l.color }} />
            <span style={{ fontSize: '11px', color: 'var(--color-ink-soft)' }}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-ink-soft)', fontSize: '14px' }}>
          Không tìm thấy trường phù hợp.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((u, i) => (
            <div key={u.id} ref={el => cardRefs.current[i] = el}>
              <TuitionCard u={u} index={i} visible={visibleCards.has(i)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
