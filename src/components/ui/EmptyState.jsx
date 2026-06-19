import { ArrowRight, FileWarning } from 'lucide-react'

export default function EmptyState({ onGoToInput }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-paper-raised/60 px-6 py-16 text-center animate-rise">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-500">
        <FileWarning className="h-7 w-7" strokeWidth={1.8} />
      </div>
      <h3 className="font-display text-lg font-semibold text-ink">
        Chưa đủ dữ liệu để tính toán
      </h3>
      <p className="mt-1.5 max-w-sm text-[13.5px] text-ink-soft">
        Hãy nhập điểm cho ít nhất 3 môn thuộc cùng một tổ hợp xét tuyển ở
        bước &quot;Nhập điểm&quot; để xem kết quả tại đây.
      </p>
      <button
        onClick={onGoToInput}
        className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:bg-brand-700 hover:shadow-md hover:shadow-brand-600/25 active:scale-95"
      >
        Đi tới Nhập điểm
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
