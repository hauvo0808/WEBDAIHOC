import { GraduationCap } from 'lucide-react'
import { TABS } from '../../config/tabs'

export default function Sidebar({ activeTab, onChangeTab }) {
  return (
    <>
      {/* ---- Desktop: thanh điều hướng dọc bên trái ---- */}
      <aside className="hidden md:flex md:w-64 lg:w-72 shrink-0 flex-col border-r border-line bg-paper-raised">
        <Brand />

        <nav className="flex-1 px-4 pb-6">
          <ul className="space-y-1.5">
            {TABS.map((tab) => (
              <li key={tab.id}>
                <NavButton
                  tab={tab}
                  active={tab.id === activeTab}
                  onClick={() => onChangeTab(tab.id)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <Footer />
      </aside>

      {/* ---- Mobile: thanh tab cuộn ngang phía trên ---- */}
      <header className="md:hidden sticky top-0 z-30 border-b border-line bg-paper-raised/95 backdrop-blur">
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          <GraduationCap className="h-5 w-5 text-brand-600" strokeWidth={2.2} />
          <span className="font-display text-[15px] font-semibold tracking-tight">
            Bảng Vàng 2026
          </span>
        </div>
        <nav className="scroll-thin flex gap-1.5 overflow-x-auto px-3 pb-3 pt-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors duration-200 ${
                tab.id === activeTab
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                  : 'bg-gray-50 text-ink-soft hover:bg-brand-50 hover:text-brand-700'
              }`}
            >
              <span className="font-mono text-[11px] opacity-70">{tab.index}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>
    </>
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-6 pt-7 pb-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm shadow-brand-600/30">
        <GraduationCap className="h-5 w-5" strokeWidth={2.2} />
      </div>
      <div className="leading-tight">
        <p className="font-display text-[17px] font-semibold tracking-tight text-ink">
          Bảng Vàng 2026
        </p>
        <p className="text-[11.5px] text-ink-soft">Xét tuyển Học bạ THPT</p>
      </div>
    </div>
  )
}

function NavButton({ tab, active, onClick }) {
  const Icon = tab.icon
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-all duration-200 ${
        active
          ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
          : 'text-ink-soft hover:bg-brand-50 hover:text-brand-700'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
          active ? 'bg-white/15' : 'bg-gray-50 group-hover:bg-white'
        }`}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="flex items-baseline gap-1.5">
          <span className={`font-mono text-[11px] ${active ? 'text-white/70' : 'text-ink-soft/60'}`}>
            {tab.index}
          </span>
          <span className="truncate text-[14.5px] font-semibold">{tab.label}</span>
        </span>
        <span className={`block truncate text-[12px] ${active ? 'text-white/75' : 'text-ink-soft/70'}`}>
          {tab.description}
        </span>
      </span>
    </button>
  )
}

function Footer() {
  return (
    <div className="mx-4 mb-5 rounded-xl border border-dashed border-brand-200 bg-brand-50/60 px-3.5 py-3">
      <p className="text-[12px] leading-relaxed text-brand-700">
        Mùa tuyển sinh <span className="font-semibold">2026</span> — chúc các
        sĩ tử đạt kết quả như ý! 🎓
      </p>
    </div>
  )
}
