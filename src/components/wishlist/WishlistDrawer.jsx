// src/components/wishlist/WishlistDrawer.jsx
// Drawer trượt từ phải sang — chứa toàn bộ UI quản lý nguyện vọng
// Tính năng: search trường/ngành, thêm, xoá, kéo thả đổi thứ tự

import { useState, useRef } from 'react'
import { X, Search, GripVertical, Trash2, PlusCircle, ListChecks } from 'lucide-react'
import universities from '../../data/universities.json'
import { getKetQuaLabel } from '../../utils/wishlistHelpers'

// ─── Component chính ─────────────────────────────────────────────────────────
export default function WishlistDrawer({ wishlist, isOpen, onClose, onAdd, onRemove, onReorder }) {
  const [query, setQuery] = useState('')          // ô tìm kiếm
  const [dragIndex, setDragIndex] = useState(null) // đang kéo item nào

  // ── Lọc kết quả tìm kiếm ──────────────────────────────────────────────────
  // Duyệt qua toàn bộ universities.json, ghép trường + ngành thành danh sách phẳng
  const searchResults = query.trim().length < 2
    ? []
    : universities.truong.flatMap((truong) =>
        truong.nganh
          .filter((nganh) => {
            const q = query.toLowerCase()
            return (
              truong.tenTruong.toLowerCase().includes(q) ||
              truong.vietTat.toLowerCase().includes(q) ||
              nganh.tenNganh.toLowerCase().includes(q) ||
              nganh.maNganh.includes(q)
            )
          })
          .map((nganh) => ({ truong, nganh }))
      ).slice(0, 12) // tối đa 12 kết quả

  // ── Thêm nguyện vọng từ kết quả search ───────────────────────────────────
  function handleAdd(truong, nganh) {
    onAdd({
      truongId:    truong.id,
      tenTruong:   truong.tenTruong,
      vietTat:     truong.vietTat,
      maNganh:     nganh.maNganh,
      tenNganh:    nganh.tenNganh,
      toHop:       nganh.toHop,
      toHopChon:   nganh.toHop[0],   // mặc định chọn tổ hợp đầu tiên
      diemChuan:   nganh.diemChuan,
      diemThiSinh: null,
      ketQua:      'none',
    })
    setQuery('') // xoá ô tìm kiếm sau khi thêm
  }

  // ── Drag & drop handlers ──────────────────────────────────────────────────
  function handleDragStart(index) { setDragIndex(index) }
  function handleDragOver(e, index) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    onReorder(dragIndex, index)
    setDragIndex(index) // cập nhật index mới sau khi đã đổi chỗ
  }
  function handleDragEnd() { setDragIndex(null) }

  // ── Không render nếu drawer đóng ─────────────────────────────────────────
  if (!isOpen) return null

  return (
    <>
      {/* Lớp overlay mờ phía sau */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ListChecks size={20} className="text-indigo-600" />
            <h2 className="font-semibold text-slate-800 text-lg">Danh sách Nguyện vọng</h2>
            {wishlist.length > 0 && (
              <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Ô tìm kiếm */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm trường hoặc ngành... (nhập ít nhất 2 ký tự)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-200 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50"
            />
          </div>

          {/* Kết quả tìm kiếm */}
          {searchResults.length > 0 && (
            <div className="mt-2 border border-slate-200 rounded-xl overflow-hidden shadow-sm max-h-64 overflow-y-auto">
              {searchResults.map(({ truong, nganh }) => {
                const alreadyAdded = wishlist.some(
                  (w) => w.truongId === truong.id && w.maNganh === nganh.maNganh
                )
                return (
                  <div
                    key={`${truong.id}-${nganh.maNganh}`}
                    className="flex items-center justify-between px-3 py-2.5 hover:bg-indigo-50
                               border-b border-slate-100 last:border-0 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{nganh.tenNganh}</p>
                      <p className="text-xs text-slate-500">{truong.vietTat} · {nganh.toHop.join(', ')}</p>
                    </div>
                    <button
                      onClick={() => !alreadyAdded && handleAdd(truong, nganh)}
                      disabled={alreadyAdded}
                      className={`ml-3 flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors
                        ${alreadyAdded
                          ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                          : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'}`}
                    >
                      <PlusCircle size={13} />
                      {alreadyAdded ? 'Đã thêm' : 'Thêm'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {query.trim().length >= 2 && searchResults.length === 0 && (
            <p className="text-xs text-slate-400 mt-2 text-center py-2">
              Không tìm thấy kết quả nào
            </p>
          )}
        </div>

        {/* Danh sách nguyện vọng */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-16">
              <ListChecks size={40} className="text-slate-300" />
              <p className="text-slate-400 text-sm">Chưa có nguyện vọng nào</p>
              <p className="text-slate-300 text-xs">Tìm trường ở trên để thêm vào đây</p>
            </div>
          ) : (
            wishlist.map((item, index) => {
              const label = getKetQuaLabel(item.ketQua)
              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing
                    ${dragIndex === index ? 'opacity-50 scale-95' : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-sm'}`}
                >
                  {/* Số thứ tự NV */}
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-bold
                                  flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </div>

                  {/* Nội dung */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-snug truncate">
                      {item.tenNganh}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.tenTruong}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-xs text-slate-400">{item.toHopChon}</span>
                      <span className="text-xs text-slate-300">·</span>
                      <span className="text-xs text-slate-400">Chuẩn 2025: {item.diemChuan?.['2025'] ?? '—'}</span>
                      {item.diemThiSinh != null && (
                        <>
                          <span className="text-xs text-slate-300">·</span>
                          <span className="text-xs font-semibold text-slate-600">
                            Của bạn: {item.diemThiSinh.toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                    {/* Badge kết quả */}
                    <span className={`inline-block mt-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border ${label.color}`}>
                      {label.text}
                    </span>
                  </div>

                  {/* Nút kéo thả + xoá */}
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <GripVertical size={16} className="text-slate-300" />
                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
            <p className="text-xs text-slate-400 text-center">
              Kéo thả <GripVertical size={11} className="inline" /> để đổi thứ tự ưu tiên
            </p>
          </div>
        )}
      </div>
    </>
  )
}