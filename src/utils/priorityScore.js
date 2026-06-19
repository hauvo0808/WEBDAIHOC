// Quy định điểm ưu tiên Khu vực & Đối tượng theo Thông tư 08/2022/TT-BGDĐT.

export const KHU_VUC_OPTIONS = [
  { value: 'KV1', label: 'KV1 - Khu vực 1', score: 0.75 },
  { value: 'KV2-NT', label: 'KV2-NT - Khu vực 2 nông thôn', score: 0.5 },
  { value: 'KV2', label: 'KV2 - Khu vực 2', score: 0.25 },
  { value: 'KV3', label: 'KV3 - Khu vực 3', score: 0 },
]

export const DOI_TUONG_OPTIONS = [
  { value: 'none', label: 'Không thuộc diện ưu tiên', score: 0 },
  { value: 'DT1', label: 'Đối tượng 01', score: 2.0 },
  { value: 'DT2', label: 'Đối tượng 02', score: 2.0 },
  { value: 'DT3', label: 'Đối tượng 03', score: 2.0 },
  { value: 'DT4', label: 'Đối tượng 04', score: 2.0 },
  { value: 'DT5', label: 'Đối tượng 05', score: 1.0 },
  { value: 'DT6', label: 'Đối tượng 06', score: 1.0 },
  { value: 'DT7', label: 'Đối tượng 07', score: 1.0 },
]

const findScore = (options, value) =>
  options.find((o) => o.value === value)?.score ?? 0

/**
 * Tính điểm cộng ưu tiên THỰC TẾ áp dụng cho một tổ hợp cụ thể.
 *
 * Công thức Bộ GD&ĐT (áp dụng từ 2023):
 *  - Tổng ưu tiên = Điểm KV + Điểm ĐT
 *  - Nếu điểm tổ hợp gốc (3 môn, thang 30) >= 22.5:
 *      Điểm cộng thực tế = Tổng ưu tiên * ((30 - Điểm tổ hợp gốc) / 7.5)
 *  - Nếu điểm tổ hợp gốc < 22.5:
 *      Điểm cộng thực tế = Tổng ưu tiên
 *
 * @param {number} baseScore điểm tổ hợp gốc (tổng 3 môn, thang 30)
 * @param {string} khuVuc giá trị trong KHU_VUC_OPTIONS
 * @param {string} doiTuong giá trị trong DOI_TUONG_OPTIONS
 */
export function calcActualPriorityBonus(baseScore, khuVuc, doiTuong) {
  const kvScore = findScore(KHU_VUC_OPTIONS, khuVuc)
  const dtScore = findScore(DOI_TUONG_OPTIONS, doiTuong)
  const totalPriority = kvScore + dtScore

  if (totalPriority === 0) return 0

  const bonus =
    baseScore >= 22.5
      ? totalPriority * ((30 - baseScore) / 7.5)
      : totalPriority

  return Math.round(bonus * 100) / 100
}

export function getKhuVucScore(khuVuc) {
  return findScore(KHU_VUC_OPTIONS, khuVuc)
}

export function getDoiTuongScore(doiTuong) {
  return findScore(DOI_TUONG_OPTIONS, doiTuong)
}
