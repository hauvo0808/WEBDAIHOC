import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, ShieldCheck, LogIn, LogOut, ChevronDown, ChevronUp, Clock, X } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { ALLOWED_DOMAINS, checkEmailDomain, SEED_QUESTIONS } from '../../config/forum'

const cloneSeeds = () => JSON.parse(JSON.stringify(SEED_QUESTIONS))

function timeAgo(ts) {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'vừa xong'
  if (m < 60) return `${m} phút trước`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} giờ trước`
  return `${Math.floor(h / 24)} ngày trước`
}

export default function ForumTab() {
  const [questions, setQuestions] = useState(cloneSeeds)
  const [verifiedUser, setVerifiedUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [newQ, setNewQ] = useState('')
  const [authorName, setAuthorName] = useState('')

  const addQuestion = () => {
    const content = newQ.trim()
    const name = authorName.trim() || 'Sĩ tử ẩn danh'
    if (!content) return
    setQuestions((prev) => [{ id: Date.now(), authorName: name, content, createdAt: Date.now(), answers: [] }, ...prev])
    setNewQ('')
    setAuthorName('')
  }

  const addAnswer = (questionId, answerContent) => {
    if (!verifiedUser) return
    setQuestions((prev) =>
      prev.map((q) =>
        q.id !== questionId ? q : {
          ...q,
          answers: [...q.answers, {
            id: Date.now(),
            authorName: verifiedUser.name,
            authorEmail: verifiedUser.email,
            authorSchool: verifiedUser.school,
            content: answerContent,
            createdAt: Date.now(),
          }],
        }
      )
    )
  }

  return (
    <div>
      <SectionHeader
        index="05"
        title="Diễn đàn Hỏi & Đáp"
        description="Học sinh đặt câu hỏi, cựu sinh viên có email trường xác thực sẽ giải đáp."
        aside={
          verifiedUser ? (
            <VerifiedBadge user={verifiedUser} onLogout={() => setVerifiedUser(null)} />
          ) : (
            <button onClick={() => setShowLogin(true)} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-brand-700 active:scale-95">
              <LogIn className="h-4 w-4" />
              Đăng nhập bằng email trường
            </button>
          )
        }
      />

      <AskBox newQ={newQ} setNewQ={setNewQ} authorName={authorName} setAuthorName={setAuthorName} onSubmit={addQuestion} />

      <div className="space-y-4 mt-4">
        {questions.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line bg-paper-raised/60 py-16 text-center">
            <MessageCircle className="mx-auto mb-3 h-8 w-8 text-brand-300" strokeWidth={1.5} />
            <p className="font-display text-base font-semibold text-ink">Chưa có câu hỏi nào</p>
            <p className="mt-1 text-[13px] text-ink-soft">Hãy là người đầu tiên đặt câu hỏi!</p>
          </div>
        )}
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} verifiedUser={verifiedUser} onAnswer={(content) => addAnswer(q.id, content)} onLoginRequest={() => setShowLogin(true)} />
        ))}
      </div>

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onVerified={(user) => { setVerifiedUser(user); setShowLogin(false) }} />
      )}
    </div>
  )
}

function AskBox({ newQ, setNewQ, authorName, setAuthorName, onSubmit }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-sm">
      <h3 className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-brand-600">Đặt câu hỏi của bạn</h3>
      <input type="text" placeholder="Tên của bạn (không bắt buộc)" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="mb-2.5 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-[13.5px] text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
      <textarea rows={3} placeholder="Bạn muốn hỏi gì về việc chọn trường, ngành học, cuộc sống sinh viên...?" value={newQ} onChange={(e) => setNewQ(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) onSubmit() }} className="w-full resize-none rounded-lg border border-line bg-paper px-3 py-2.5 text-[13.5px] text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[11.5px] text-ink-soft">Ctrl+Enter để gửi</p>
        <button onClick={onSubmit} disabled={!newQ.trim()} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-[13px] font-semibold text-white transition-all hover:bg-brand-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
          <Send className="h-3.5 w-3.5" />
          Gửi câu hỏi
        </button>
      </div>
    </div>
  )
}

function QuestionCard({ question: q, verifiedUser, onAnswer, onLoginRequest }) {
  const [open, setOpen] = useState(q.answers.length > 0)
  const [replyText, setReplyText] = useState('')
  const [showReply, setShowReply] = useState(false)

  const submitAnswer = () => {
    if (!replyText.trim()) return
    onAnswer(replyText.trim())
    setReplyText('')
    setShowReply(false)
    setOpen(true)
  }

  return (
    <div className="animate-rise rounded-2xl border border-line bg-paper-raised shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-[13px] font-bold text-brand-700">
              {q.authorName[0].toUpperCase()}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-ink">{q.authorName}</p>
              <p className="flex items-center gap-1 text-[11px] text-ink-soft"><Clock className="h-3 w-3" />{timeAgo(q.createdAt)}</p>
            </div>
          </div>
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700">{q.answers.length} trả lời</span>
        </div>

        <p className="mt-3 text-[14.5px] leading-relaxed text-ink">{q.content}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {q.answers.length > 0 && (
            <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-brand-600 hover:underline">
              {open ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              {open ? 'Ẩn câu trả lời' : `Xem ${q.answers.length} câu trả lời`}
            </button>
          )}
          {verifiedUser ? (
            <button onClick={() => setShowReply((v) => !v)} className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-brand-300 bg-brand-50 px-3 py-1.5 text-[12px] font-semibold text-brand-700 transition hover:bg-brand-100">
              <MessageCircle className="h-3.5 w-3.5" />
              {showReply ? 'Huỷ' : 'Trả lời'}
            </button>
          ) : (
            <button onClick={onLoginRequest} className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-[12px] font-medium text-ink-soft transition hover:border-brand-300 hover:text-brand-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Đăng nhập để trả lời
            </button>
          )}
        </div>

        {showReply && verifiedUser && (
          <div className="mt-3 rounded-xl border border-brand-200 bg-brand-50/50 p-3">
            <div className="mb-2 flex items-center gap-1.5 text-[11.5px] font-semibold text-brand-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Trả lời với tư cách {verifiedUser.name} · {verifiedUser.school}
            </div>
            <textarea rows={3} placeholder="Chia sẻ kinh nghiệm thực tế của bạn..." value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full resize-none rounded-lg border border-brand-200 bg-white px-3 py-2.5 text-[13.5px] text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
            <div className="mt-2 flex justify-end">
              <button onClick={submitAnswer} disabled={!replyText.trim()} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-[12.5px] font-semibold text-white transition hover:bg-brand-700 disabled:opacity-40">
                <Send className="h-3.5 w-3.5" />
                Gửi trả lời
              </button>
            </div>
          </div>
        )}
      </div>

      {open && q.answers.length > 0 && (
        <div className="border-t border-line bg-gray-50/60 divide-y divide-line">
          {q.answers.map((a) => <AnswerItem key={a.id} answer={a} />)}
        </div>
      )}
    </div>
  )
}

function AnswerItem({ answer: a }) {
  return (
    <div className="flex gap-3 px-5 py-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pass-500/15 font-display text-[13px] font-bold text-pass-600">
        {a.authorName[0].toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[13px] font-semibold text-ink">{a.authorName}</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-pass-50 px-2 py-0.5 text-[10.5px] font-semibold text-pass-600">
            <ShieldCheck className="h-3 w-3" />{a.authorSchool}
          </span>
        </div>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink">{a.content}</p>
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-ink-soft"><Clock className="h-3 w-3" />{timeAgo(a.createdAt)}</p>
      </div>
    </div>
  )
}

function VerifiedBadge({ user, onLogout }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-pass-500/30 bg-pass-50 px-3 py-1.5">
      <ShieldCheck className="h-4 w-4 text-pass-600" strokeWidth={2} />
      <div className="leading-tight">
        <p className="text-[12px] font-semibold text-pass-700">{user.name}</p>
        <p className="text-[10.5px] text-pass-600">{user.school}</p>
      </div>
      <button onClick={onLogout} className="ml-1 rounded-full p-1 text-pass-500 hover:bg-pass-100 hover:text-pass-700" title="Đăng xuất">
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function LoginModal({ onClose, onVerified }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [step, setStep] = useState('form')
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSubmit = () => {
    setError('')
    const matched = checkEmailDomain(email)
    if (!matched) {
      setError('Email này không thuộc danh sách trường được phép trả lời. Vui lòng dùng email do trường cấp (ví dụ: ten@hcmut.edu.vn).')
      return
    }
    if (!name.trim()) { setError('Vui lòng nhập tên của bạn.'); return }
    setStep('verifying')
    setTimeout(() => {
      setStep('done')
      setTimeout(() => { onVerified({ email, name: name.trim(), school: matched.label }) }, 1200)
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="w-full max-w-md rounded-2xl border border-line bg-paper-raised shadow-xl animate-rise">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-600" />
            <h2 className="font-display text-[17px] font-semibold text-ink">Xác thực email trường</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-ink-soft hover:bg-gray-100"><X className="h-4 w-4" /></button>
        </div>

        <div className="px-6 py-5">
          {step === 'form' && (
            <>
              <p className="mb-4 text-[13px] leading-relaxed text-ink-soft">Chỉ cựu sinh viên / sinh viên có email do trường cấp mới được phép trả lời câu hỏi. Điều này giúp đảm bảo thông tin chính xác và đáng tin cậy.</p>
              <div className="space-y-3">
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">Tên của bạn</span>
                  <input type="text" placeholder="Ví dụ: Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">Email trường của bạn</span>
                  <input ref={inputRef} type="email" placeholder="ten@hcmut.edu.vn" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }} className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 font-mono text-[14px] text-ink outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100" />
                </label>
              </div>
              {error && <div className="mt-3 rounded-lg bg-risk-50 px-3.5 py-2.5 text-[12.5px] text-risk-600">{error}</div>}
              <div className="mt-4 rounded-xl border border-line bg-paper p-3">
                <p className="mb-2 text-[11.5px] font-semibold uppercase tracking-wide text-ink-soft">Trường được phép trả lời</p>
                <div className="flex flex-wrap gap-1.5">
                  {ALLOWED_DOMAINS.map((d) => (
                    <span key={d.domain} className="rounded-full bg-brand-50 px-2 py-0.5 font-mono text-[10.5px] text-brand-700">@{d.domain}</span>
                  ))}
                </div>
              </div>
              <button onClick={handleSubmit} className="mt-4 w-full rounded-full bg-brand-600 py-2.5 text-[14px] font-semibold text-white transition hover:bg-brand-700 active:scale-95">Xác thực email</button>
            </>
          )}
          {step === 'verifying' && (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
              <p className="font-semibold text-ink">Đang xác thực email...</p>
              <p className="mt-1 text-[13px] text-ink-soft">(Demo — bỏ qua bước gửi mail thật)</p>
            </div>
          )}
          {step === 'done' && (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pass-50">
                <ShieldCheck className="h-7 w-7 text-pass-600" strokeWidth={2} />
              </div>
              <p className="font-display text-[17px] font-semibold text-pass-600">Xác thực thành công!</p>
              <p className="mt-1 text-[13px] text-ink-soft">Đang chuyển về diễn đàn...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}