// Thông tin chi tiết về 6 nhóm RIASEC
export const RIASEC_INFO = {
  R: {
    code: 'R',
    name: 'Realistic',
    vi: 'Kỹ thuật – Thực hành',
    color: '#0284c7',
    desc: 'Thích làm việc với máy móc, công cụ, vật liệu hoặc ở ngoài trời hơn là giấy tờ, lý thuyết.',
  },
  I: {
    code: 'I',
    name: 'Investigative',
    vi: 'Nghiên cứu – Phân tích',
    color: '#6366f1',
    desc: 'Thích quan sát, tìm hiểu, phân tích và giải quyết vấn đề bằng tư duy logic.',
  },
  A: {
    code: 'A',
    name: 'Artistic',
    vi: 'Nghệ thuật – Sáng tạo',
    color: '#db2777',
    desc: 'Thích thể hiện bản thân qua nghệ thuật, ý tưởng độc đáo, ít khuôn khổ cố định.',
  },
  S: {
    code: 'S',
    name: 'Social',
    vi: 'Xã hội – Hỗ trợ',
    color: '#16a34a',
    desc: 'Thích giúp đỡ, giảng dạy, chăm sóc và làm việc cùng với người khác.',
  },
  E: {
    code: 'E',
    name: 'Enterprising',
    vi: 'Kinh doanh – Quản lý',
    color: '#ea580c',
    desc: 'Thích lãnh đạo, thuyết phục, kinh doanh và chấp nhận rủi ro để đạt mục tiêu.',
  },
  C: {
    code: 'C',
    name: 'Conventional',
    vi: 'Tổ chức – Văn phòng',
    color: '#a16207',
    desc: 'Thích sự rõ ràng, ngăn nắp, làm theo quy trình và xử lý số liệu cẩn thận.',
  },
}

export const RIASEC_ORDER = ['R', 'I', 'A', 'S', 'E', 'C']

// Từ khoá đặc trưng (đã bỏ dấu, viết thường) dùng để so khớp với `tenNganh`.
export const RIASEC_KEYWORDS = {
  R: [
    'co khi', 'co dien tu', 'dien tu vien thong', 'ky thuat dien',
    'tu dong hoa', 'xay dung', 'cau duong', 'giao thong', 'hang hai',
    'hang khong', 'nong nghiep', 'lam nghiep', 'thu y', 'chan nuoi',
    'thuy san', 'dau khi', 'mo dia chat', 'ky thuat o to', 'ky thuat nhiet',
    'ky thuat tau thuy', 'cong nghe ky thuat',
  ],
  I: [
    'khoa hoc may tinh', 'cong nghe thong tin', 'khoa hoc du lieu',
    'toan hoc', 'vat ly', 'hoa hoc', 'sinh hoc', 'cong nghe sinh hoc',
    'y khoa', 'rang ham mat', 'duoc hoc', 'khoa hoc moi truong',
    'thong ke', 'tri tue nhan tao', 'an toan thong tin', 'ky thuat phan mem',
    'vi mach ban dan', 'ky thuat y sinh', 'dia chat', 'cong nghe thuc pham',
    'hai duong hoc', 'khoa hoc vat lieu', 'luat',
  ],
  A: [
    'thiet ke do hoa', 'my thuat', 'kien truc', 'am nhac',
    'san khau dien anh', 'truyen thong da phuong tien', 'bao chi',
    'sang tac', 'thiet ke thoi trang', 'thiet ke noi that', 'quay phim',
    'bien kich', 'nhiep anh', 'dien xuat', 'thiet ke cong nghiep',
  ],
  S: [
    'tam ly hoc', 'xa hoi hoc', 'cong tac xa hoi', 'giao duc', 'su pham',
    'dieu duong', 'ho sinh', 'y te cong cong', 'phuc hoi chuc nang',
    'quan ly giao duc', 'viet nam hoc', 'dong phuong hoc', 'du lich',
    'lu hanh', 'khach san', 'nha hang', 'dinh duong', 'xet nghiem y hoc',
    'ngon ngu', 'han quoc hoc', 'nhat ban hoc',
  ],
  E: [
    'quan tri kinh doanh', 'marketing', 'kinh doanh quoc te',
    'tai chinh ngan hang', 'quan tri su kien', 'thuong mai dien tu',
    'cong nghe tai chinh', 'quan he quoc te', 'quan he cong chung',
    'logistics', 'dau tu', 'quan tri khach san', 'luat kinh te',
  ],
  C: [
    'ke toan', 'kiem toan', 'quan tri thong tin', 'quan tri van phong',
    'hanh chinh', 'luu tru', 'thue', 'bao hiem', 'thu ky', 'logistics',
  ],
}

/** Hàm này giúp bỏ dấu tiếng Việt để máy tính dễ so sánh chữ (vd: 'Đại Học' -> 'dai hoc') */
export function normalizeText(str = '') {
  return str
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Hàm này gom toàn bộ ngành của tất cả trường đại học bạn đang có thành một danh sách dễ đọc */
export function flattenNganh(data) {
  const list = []
  ;(data?.truong || []).forEach((truong) => {
    ;(truong?.nganh || []).forEach((n) => {
      if (!n?.tenNganh) return
      list.push({
        tenNganh: n.tenNganh.trim(),
        maNganh: n.maNganh,
        tenTruong: truong.tenTruong,
        vietTat: truong.vietTat || truong.tenTruong,
      })
    })
  })
  return list
}

/** Hàm quan trọng nhất: Nhận vào nhóm tính cách (vd: RIA) và tự động tìm ngành học phù hợp */
export function suggestNganh(universitiesData, topCodes = []) {
  const flat = flattenNganh(universitiesData)
  const grouped = new Map()

  flat.forEach((item) => {
    const norm = normalizeText(item.tenNganh)
    const matchedHere = topCodes.filter((code) =>
      (RIASEC_KEYWORDS[code] || []).some((kw) => norm.includes(kw))
    )
    if (matchedHere.length === 0) return

    if (!grouped.has(norm)) {
      grouped.set(norm, {
        tenNganh: item.tenNganh,
        schools: new Set(),
        matchedGroups: new Set(),
      })
    }
    const entry = grouped.get(norm)
    entry.schools.add(item.vietTat)
    matchedHere.forEach((c) => entry.matchedGroups.add(c))
  })

  return Array.from(grouped.values())
    .map((entry) => ({
      tenNganh: entry.tenNganh,
      schools: Array.from(entry.schools),
      matchedGroups: RIASEC_ORDER.filter((c) => entry.matchedGroups.has(c)),
      matchScore: entry.matchedGroups.size,
    }))
    .sort(
      (a, b) =>
        b.matchScore - a.matchScore ||
        a.tenNganh.localeCompare(b.tenNganh, 'vi')
    )
}