// Bảng tổ hợp xét tuyển theo quy định của Bộ GD&ĐT.
// Mỗi tổ hợp gồm: mã, nhóm (A/B/C/D) và 3 môn thành phần (id khớp với utils/subjects.js).

export const COMBINATIONS = [
  // Nhóm A
  { code: 'A00', group: 'A', subjects: ['toan', 'ly', 'hoa'] },
  { code: 'A01', group: 'A', subjects: ['toan', 'ly', 'anh'] },
  { code: 'A02', group: 'A', subjects: ['toan', 'ly', 'sinh'] },
  { code: 'A03', group: 'A', subjects: ['toan', 'ly', 'su'] },
  { code: 'A04', group: 'A', subjects: ['toan', 'ly', 'dia'] },
  { code: 'A05', group: 'A', subjects: ['toan', 'hoa', 'su'] },
  { code: 'A06', group: 'A', subjects: ['toan', 'hoa', 'dia'] },
  { code: 'A07', group: 'A', subjects: ['toan', 'su', 'dia'] },
  { code: 'A08', group: 'A', subjects: ['toan', 'su', 'gdktpl'] },

  // Nhóm B
  { code: 'B00', group: 'B', subjects: ['toan', 'hoa', 'sinh'] },
  { code: 'B01', group: 'B', subjects: ['toan', 'sinh', 'su'] },
  { code: 'B02', group: 'B', subjects: ['toan', 'sinh', 'dia'] },
  { code: 'B03', group: 'B', subjects: ['toan', 'sinh', 'van'] },

  // Nhóm C
  { code: 'C00', group: 'C', subjects: ['van', 'su', 'dia'] },
  { code: 'C01', group: 'C', subjects: ['van', 'toan', 'ly'] },
  { code: 'C02', group: 'C', subjects: ['van', 'toan', 'hoa'] },
  { code: 'C03', group: 'C', subjects: ['van', 'toan', 'su'] },
  { code: 'C04', group: 'C', subjects: ['van', 'toan', 'dia'] },
  { code: 'C05', group: 'C', subjects: ['van', 'ly', 'hoa'] },
  { code: 'C06', group: 'C', subjects: ['van', 'ly', 'sinh'] },
  { code: 'C07', group: 'C', subjects: ['van', 'ly', 'su'] },
  { code: 'C08', group: 'C', subjects: ['van', 'hoa', 'sinh'] },
  { code: 'C09', group: 'C', subjects: ['van', 'ly', 'dia'] },
  { code: 'C10', group: 'C', subjects: ['van', 'hoa', 'su'] },
  { code: 'C11', group: 'C', subjects: ['van', 'dia', 'hoa'] },
  { code: 'C12', group: 'C', subjects: ['van', 'sinh', 'su'] },
  { code: 'C13', group: 'C', subjects: ['van', 'sinh', 'dia'] },

  // Nhóm D
  { code: 'D01', group: 'D', subjects: ['van', 'toan', 'anh'] },
  { code: 'D02', group: 'D', subjects: ['van', 'toan', 'nga'] },
  { code: 'D03', group: 'D', subjects: ['van', 'toan', 'phap'] },
  { code: 'D04', group: 'D', subjects: ['van', 'toan', 'trung'] },
  { code: 'D05', group: 'D', subjects: ['van', 'toan', 'duc'] },
  { code: 'D06', group: 'D', subjects: ['van', 'toan', 'nhat'] },
  { code: 'D07', group: 'D', subjects: ['toan', 'hoa', 'anh'] },
  { code: 'D08', group: 'D', subjects: ['toan', 'sinh', 'anh'] },
  { code: 'D09', group: 'D', subjects: ['toan', 'su', 'anh'] },
  { code: 'D10', group: 'D', subjects: ['toan', 'dia', 'anh'] },
  { code: 'D11', group: 'D', subjects: ['van', 'ly', 'anh'] },
  { code: 'D12', group: 'D', subjects: ['van', 'hoa', 'anh'] },
  { code: 'D13', group: 'D', subjects: ['van', 'sinh', 'anh'] },
  { code: 'D14', group: 'D', subjects: ['van', 'su', 'anh'] },
  { code: 'D15', group: 'D', subjects: ['van', 'dia', 'anh'] },
]

export const COMBINATION_MAP = COMBINATIONS.reduce((map, c) => {
  map[c.code] = c
  return map
}, {})
