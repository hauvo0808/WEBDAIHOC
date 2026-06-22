// src/hooks/useWishlist.js
// "Hook" = nơi chứa state + các hàm thao tác, gộp lại cho gọn
// Component nào cần wishlist thì gọi hook này — không phải viết lại

import { useState, useCallback } from 'react'
import {
  addToWishlist,
  removeFromWishlist,
  reorderWishlist,
  updateWishlistScores,
} from '../utils/wishlistHelpers'

export function useWishlist() {
  // ── State chính: danh sách nguyện vọng ──────────────────────────────────
  const [wishlist, setWishlist] = useState([])

  // ── Mở / đóng drawer ────────────────────────────────────────────────────
  const [isOpen, setIsOpen] = useState(false)
  const openDrawer  = useCallback(() => setIsOpen(true),  [])
  const closeDrawer = useCallback(() => setIsOpen(false), [])

  // ── Thêm nguyện vọng ────────────────────────────────────────────────────
  // item: object chứa thông tin trường + ngành (xem WishlistItem ở wishlistHelpers)
  const addItem = useCallback((item) => {
    setWishlist((prev) => addToWishlist(prev, item))
  }, [])

  // ── Xoá nguyện vọng ─────────────────────────────────────────────────────
  const removeItem = useCallback((id) => {
    setWishlist((prev) => removeFromWishlist(prev, id))
  }, [])

  // ── Kéo thả đổi vị trí ──────────────────────────────────────────────────
  const reorder = useCallback((fromIndex, toIndex) => {
    setWishlist((prev) => reorderWishlist(prev, fromIndex, toIndex))
  }, [])

  // ── Cập nhật điểm khi user nhập điểm mới ────────────────────────────────
  const syncScores = useCallback((scores, priorityScore, calcScore, classifyResult) => {
    setWishlist((prev) =>
      updateWishlistScores(prev, scores, priorityScore, calcScore, classifyResult)
    )
  }, [])

  return {
    wishlist,     // mảng nguyện vọng
    isOpen,       // drawer đang mở không
    openDrawer,   // hàm mở drawer
    closeDrawer,  // hàm đóng drawer
    addItem,      // thêm
    removeItem,   // xoá
    reorder,      // đổi chỗ
    syncScores,   // cập nhật điểm
  }
}