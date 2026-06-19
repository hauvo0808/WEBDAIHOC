import { getBestMatchForCombos } from './scoring'

export const STATUS = {
  PASS: {
    key: 'pass',
    label: 'Chắc chắn đậu',
    badgeClass: 'bg-pass-500 text-white',
    cardClass: 'border-pass-500/40',
    chipDot: 'bg-pass-500',
  },
  MAYBE: {
    key: 'maybe',
    label: 'Có khả năng',
    badgeClass: 'bg-maybe-500 text-white',
    cardClass: 'border-maybe-500/40',
    chipDot: 'bg-maybe-500',
  },
  RISK: {
    key: 'risk',
    label: 'Nguy hiểm',
    badgeClass: 'bg-risk-500 text-white',
    cardClass: 'border-risk-500/40', 
    chipDot: 'bg-risk-500',
  },
}

/**
 * Phân loại theo chênh lệch (điểm thí sinh - điểm chuẩn 2025):
 *  - >= 3   -> Chắc chắn đậu
 *  - [0, 3) -> Có khả năng
 *  - < 0    -> Nguy hiểm
 */
export function classifyByDiff(diff) {
  if (diff >= 3) return STATUS.PASS
  if (diff >= 0) return STATUS.MAYBE
  return STATUS.RISK
}

/**
 * Ghép điểm thí sinh (theo tổ hợp tốt nhất phù hợp với từng ngành) với điểm
 * chuẩn 2025 của từng ngành trong universities.json, trả về danh sách đã
 * sắp xếp giảm dần theo điểm chuẩn 2025.
 *
 * @param {object} universitiesData dữ liệu từ data/universities.json
 * @param {Array} allCombinationResults kết quả từ calculateAllCombinations()
 */
export function buildSchoolSuggestions(universitiesData, allCombinationResults) {
  const items = []

  for (const truong of universitiesData.truong) {
    for (const nganh of truong.nganh) {
      const match = getBestMatchForCombos(allCombinationResults, nganh.toHop)
      if (!match) continue // thí sinh chưa nhập đủ điểm cho tổ hợp nào của ngành này

      const diemChuan2025 = nganh.diemChuan['2025']
      const diff = Math.round((match.total - diemChuan2025) * 100) / 100
      const status = classifyByDiff(diff)

      items.push({
        schoolId: truong.id,
        schoolName: truong.tenTruong,
        schoolShort: truong.vietTat,
        maNganh: nganh.maNganh,
        tenNganh: nganh.tenNganh,
        toHop: nganh.toHop,
        toHopDung: match.code,
        diemThiSinh: match.total,
        diemChuan2025,
        diff,
        status,
      })
    }
  }

 const statusOrder = { pass: 0, maybe: 1, risk: 2 }
items.sort((a, b) => {
  const statusDiff = statusOrder[a.status.key] - statusOrder[b.status.key]
  if (statusDiff !== 0) return statusDiff
  return b.diemChuan2025 - a.diemChuan2025
})
return items
}

export function countByStatus(items) {
  return items.reduce(
    (acc, item) => {
      acc[item.status.key] += 1
      return acc
    },
    { pass: 0, maybe: 0, risk: 0 }
  )
}
