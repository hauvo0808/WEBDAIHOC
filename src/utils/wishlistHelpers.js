// src/utils/wishlistHelpers.js
// File này chứa các hàm xử lý danh sách nguyện vọng
// Không có giao diện gì ở đây — chỉ là "công thức tính toán"

// ─── Thêm 1 nguyện vọng vào danh sách ───────────────────────────────────────
// Nếu ngành đó đã có rồi thì bỏ qua (tránh trùng)
export function addToWishlist(wishlist, newItem) {
  const isDuplicate = wishlist.some(
    (item) => item.truongId === newItem.truongId && item.maNganh === newItem.maNganh
  )
  if (isDuplicate) return wishlist

  return [
    ...wishlist,
    {
      ...newItem,
      id: crypto.randomUUID(),   // tạo mã định danh duy nhất tự động
      rank: wishlist.length,     // xếp cuối danh sách
    },
  ]
}

// ─── Xoá 1 nguyện vọng khỏi danh sách ──────────────────────────────────────
export function removeFromWishlist(wishlist, id) {
  return wishlist
    .filter((item) => item.id !== id)
    .map((item, index) => ({ ...item, rank: index })) // cập nhật lại số thứ tự
}

// ─── Đổi chỗ 2 nguyện vọng (dùng cho drag & drop) ──────────────────────────
export function reorderWishlist(wishlist, fromIndex, toIndex) {
  const result = [...wishlist]
  const [moved] = result.splice(fromIndex, 1) // lấy item ra khỏi vị trí cũ
  result.splice(toIndex, 0, moved)             // chèn vào vị trí mới
  return result.map((item, index) => ({ ...item, rank: index })) // cập nhật rank
}

// ─── Cập nhật điểm khi thí sinh thay đổi điểm học bạ ───────────────────────
// scores = object điểm các môn, priorityScore = điểm ưu tiên
export function updateWishlistScores(wishlist, scores, priorityScore, calcScore, classifyResult) {
  return wishlist.map((item) => {
    const diemThiSinh = calcScore(scores, item.toHopChon) + priorityScore
    const ketQua = classifyResult(diemThiSinh, item.diemChuan['2025'])
    return { ...item, diemThiSinh, ketQua }
  })
}

// ─── Nhãn hiển thị cho kết quả xét tuyển ────────────────────────────────────
export function getKetQuaLabel(ketQua) {
  const map = {
    pass:  { text: 'Đậu khả năng cao', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    maybe: { text: 'Có thể đậu',       color: 'text-amber-600  bg-amber-50  border-amber-200'  },
    risk:  { text: 'Rủi ro',           color: 'text-red-600    bg-red-50    border-red-200'    },
    none:  { text: 'Chưa tính',        color: 'text-slate-500  bg-slate-50  border-slate-200'  },
  }
  return map[ketQua] ?? map.none
}