import { COMBINATIONS } from './combinations'
import { calcActualPriorityBonus } from './priorityScore'

const round2 = (n) => Math.round(n * 100) / 100

const num = (v) => {
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : 0
}

/**
 * Tính điểm xét tuyển cho TẤT CẢ tổ hợp, chỉ giữ lại những tổ hợp mà thí sinh
 * đã nhập đủ điểm > 0 cho cả 3 môn thành phần (theo yêu cầu đề bài).
 *
 * @param {Record<string, string|number>} scores điểm từng môn, key = id môn
 * @param {string} khuVuc
 * @param {string} doiTuong
 * @returns {Array} danh sách tổ hợp hợp lệ, đã sắp xếp giảm dần theo tổng điểm
 */
export function calculateAllCombinations(scores, khuVuc, doiTuong) {
  const results = []

  for (const combo of COMBINATIONS) {
    const values = combo.subjects.map((id) => num(scores[id]))
    const isValid = values.every((v) => v > 0)
    if (!isValid) continue

    const baseScore = round2(values.reduce((a, b) => a + b, 0))
    const bonus = calcActualPriorityBonus(baseScore, khuVuc, doiTuong)
    const total = round2(baseScore + bonus)

    results.push({
      code: combo.code,
      group: combo.group,
      subjects: combo.subjects,
      baseScore,
      bonus,
      total,
    })
  }

  results.sort((a, b) => b.total - a.total)
  return results
}

export function getTopCombinations(scores, khuVuc, doiTuong, topN = 10) {
  return calculateAllCombinations(scores, khuVuc, doiTuong).slice(0, topN)
}

/**
 * Trong danh sách tổ hợp đã tính, tìm tổ hợp cho điểm CAO NHẤT trong số các mã
 * tổ hợp mà một ngành học chấp nhận xét tuyển (toHopList).
 * Trả về null nếu thí sinh chưa có tổ hợp hợp lệ nào trùng với ngành đó.
 */
export function getBestMatchForCombos(allResults, toHopList) {
  let best = null
  for (const result of allResults) {
    if (!toHopList.includes(result.code)) continue
    if (!best || result.total > best.total) best = result
  }
  return best
}

export function hasAnyValidCombination(allResults) {
  return allResults.length > 0
}
