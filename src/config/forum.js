// ============================================================
// CẤU HÌNH DIỄN ĐÀN HỎI ĐÁP
// Thêm / xoá domain email trường ở đây để cấp quyền trả lời
// ============================================================

export const ALLOWED_DOMAINS = [
  { domain: 'hcmut.edu.vn',    label: 'Đại học Bách Khoa TP.HCM' },
  { domain: 'hcmus.edu.vn',    label: 'ĐH Khoa học Tự nhiên TP.HCM' },
  { domain: 'ueh.edu.vn',      label: 'ĐH Kinh tế TP.HCM' },
  { domain: 'hcmute.edu.vn',   label: 'ĐH Sư phạm Kỹ thuật TP.HCM' },
  { domain: 'uit.edu.vn',      label: 'ĐH Công nghệ Thông tin TP.HCM' },
  { domain: 'ftu.edu.vn',      label: 'ĐH Ngoại thương TP.HCM' },
  { domain: 'tdtu.edu.vn',     label: 'ĐH Tôn Đức Thắng' },
  { domain: 'hcmue.edu.vn',    label: 'ĐH Sư phạm TP.HCM' },
  { domain: 'iuh.edu.vn',      label: 'ĐH Công nghiệp TP.HCM' },
  { domain: 'ump.edu.vn',      label: 'ĐH Y Dược TP.HCM' },
]

export function checkEmailDomain(email) {
  const lower = (email || '').toLowerCase().trim()
  const matched = ALLOWED_DOMAINS.find((d) => lower.endsWith('@' + d.domain))
  return matched || null
}

export const SEED_QUESTIONS = [
  {
    id: 1,
    authorName: 'Nguyễn Minh Tuấn',
    content: 'Ngành Khoa học máy tính BKU học những môn gì năm 1? Có khó không ạ?',
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    answers: [
      {
        id: 2,
        authorName: 'Trần Thị Lan',
        authorEmail: 'lan.tt@hcmut.edu.vn',
        authorSchool: 'Đại học Bách Khoa TP.HCM',
        content: 'Năm 1 chủ yếu là đại cương: Giải tích, Đại số, Vật lý, Lập trình C. Khó nhưng nếu ôn đều thì qua hết. Phần Giải tích cần chú ý nhất đó bạn!',
        createdAt: Date.now() - 1000 * 60 * 60 * 2,
      },
    ],
  },
  {
    id: 3,
    authorName: 'Lê Phương Anh',
    content: 'Học UIT ra trường làm việc ở đâu? Lương có cao không ạ? Em đang phân vân giữa UIT và BKU.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    answers: [
      {
        id: 4,
        authorName: 'Phạm Đức Huy',
        authorEmail: 'huy.pd@uit.edu.vn',
        authorSchool: 'ĐH Công nghệ Thông tin TP.HCM',
        content: 'Mình ra trường 2 năm, đang làm Backend ở một công ty Nhật, lương khởi điểm khoảng 15-18 triệu. UIT và BKU đều được nhà tuyển dụng đánh giá cao, bạn chọn trường nào điểm phù hợp hơn là được!',
        createdAt: Date.now() - 1000 * 60 * 60 * 20,
      },
      {
        id: 5,
        authorName: 'Võ Thị Hằng',
        authorEmail: 'hang.vt@hcmut.edu.vn',
        authorSchool: 'Đại học Bách Khoa TP.HCM',
        content: 'Mình học BKU ngành KHMT. Theo mình thì BKU thiên về lý thuyết nền hơn còn UIT thiên thực hành sớm hơn. Cả hai đều tốt, tuỳ bạn thích hướng nào.',
        createdAt: Date.now() - 1000 * 60 * 60 * 18,
      },
    ],
  },
  {
    id: 6,
    authorName: 'Đỗ Hoàng Nam',
    content: 'Ngành Y khoa UMP học mấy năm và chi phí học toàn khoá tốn bao nhiêu ạ?',
    createdAt: Date.now() - 1000 * 60 * 30,
    answers: [],
  },
]