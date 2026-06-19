import { RotateCcw } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { SUBJECT_GROUPS } from '../../utils/subjects'
import { KHU_VUC_OPTIONS, DOI_TUONG_OPTIONS } from '../../utils/priorityScore'

export default function ScoreInputTab({
  scores,
  onChangeScore,
  onResetScores,
  khuVuc,
  onChangeKhuVuc,
  doiTuong,
  onChangeDoiTuong,
}) {
  const filledCount = Object.values(scores).filter(
    (v) => v !== '' && parseFloat(v) > 0
  ).length

  const handleInput = (id, raw) => {
    // Cho phép gõ tự do (kể cả số thập phân dở dang như "7."),
    // chỉ chặn ký tự không hợp lệ.
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

  return (
    <div>
      <SectionHeader
        index="01"
        title="Nhập điểm Học bạ"
        description="Điểm trung bình từng môn theo thang 0 – 10. Chỉ những môn có điểm mới được tính vào các tổ hợp xét tuyển."
        aside={
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12.5px] text-ink-soft">
              {filledCount}/14 môn
            </span>
            <button
              onClick={onResetScores}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-raised px-3 py-1.5 text-[12.5px] font-medium text-ink-soft transition-colors hover:border-risk-500/40 hover:text-risk-600"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Xoá hết
            </button>
          </div>
        }
      />

      <div className="space-y-5">
        {SUBJECT_GROUPS.map((group) => (
          <div
            key={group.id}
            className="rounded-2xl border border-line bg-paper-raised p-5 shadow-sm"
          >
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-brand-600">
              {group.label}
            </h3>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
              {group.subjects.map((subject) => (
                <label key={subject.id} className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                    {subject.label}
                  </span>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0 – 10"
                    value={scores[subject.id]}
                    onChange={(e) => handleInput(subject.id, e.target.value)}
                    onBlur={(e) => handleBlur(subject.id, e.target.value)}
                    className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 font-mono text-[15px] text-ink outline-none transition-all duration-150 focus:border-brand-500 focus:bg-paper-raised focus:ring-4 focus:ring-brand-100"
                  />
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-sm">
          <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-brand-600">
            Diện ưu tiên
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                Khu vực ưu tiên
              </span>
              <select
                value={khuVuc}
                onChange={(e) => onChangeKhuVuc(e.target.value)}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none transition-all duration-150 focus:border-brand-500 focus:bg-paper-raised focus:ring-4 focus:ring-brand-100"
              >
                {KHU_VUC_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} (+{opt.score})
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
                Đối tượng ưu tiên
              </span>
              <select
                value={doiTuong}
                onChange={(e) => onChangeDoiTuong(e.target.value)}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none transition-all duration-150 focus:border-brand-500 focus:bg-paper-raised focus:ring-4 focus:ring-brand-100"
              >
                {DOI_TUONG_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                    {opt.score > 0 ? ` (+${opt.score})` : ''}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="mt-3.5 text-[12.5px] leading-relaxed text-ink-soft">
            Điểm cộng thực tế được tính theo công thức của Bộ GD&ĐT: nếu điểm
            tổ hợp 3 môn gốc ≥ 22.5, điểm ưu tiên sẽ giảm dần theo công thức{' '}
            <span className="font-mono">(30 − điểm gốc) / 7.5</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
