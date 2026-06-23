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
    authorName: 'Napoleon Nguyễn',
    content: ' Khoa học máy tính BKU học những môn gì ở năm nhất vậy ạ? Có môn nào khó cần lưu ý không ạ? Em cảm ơn :((((',
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    answers: [
      {
        id: 2,
        authorName: 'Lanxinhiu',
        authorEmail: 'lan.tt@hcmut.edu.vn',
        authorSchool: 'Đại học Bách Khoa TP.HCM',
        content: 'Năm nhất thì chủ yếu đại cương giải tích, đại số, lật lý, C++ thôi em. Khó do lý thuyết khô khan thôi chứ nếu ôn đều thì qua hết!',
        createdAt: Date.now() - 1000 * 60 * 60 * 1,
      },
      {
        id: 3,
        authorName: 'Hết nợ môn đổi tên',
        authorEmail: 'DangTuan.tt@hcmut.edu.vn',
        authorSchool: 'Đại học Bách Khoa TP.HCM',
        content: 'Đại cương bình thường thôi em, chả cần lo nhiều đâu',
        createdAt: Date.now() - 1000 * 60 * 60 * 2,
      },
      {
        id: 2,
        authorName: 'Tình bể bình',
        authorEmail: 'HaNam.tt@hcmut.edu.vn',
        authorSchool: 'Đại học Bách Khoa TP.HCM',
        content: 'chắc có mỗi giải tích 2 khoai nhất thôi',
        createdAt: Date.now() - 1000 * 60 * 60 * 3,
      },
    ],
  },
  {
    id: 3,
    authorName: 'Đậu ĐH đốt nhà',
    content: 'Học UIT ra trường làm việc ở đâu? Lương có cao không ạ? Em đang phân vân giữa UIT và BKU.',
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
    answers: [
      {
        id: 4,
        authorName: 'Hà Huy',
        authorEmail: 'huy.pd@uit.edu.vn',
        authorSchool: 'ĐH Công nghệ Thông tin TP.HCM',
        content: 'Anh là cựu sinh viên UIt ra trường 2 năm, đang làm Backend công ty Nhật, lương khởi điểm khoảng 14 triệu. UIT được nhà tuyển dụng đánh giá cao em à !',
        createdAt: Date.now() - 1000 * 60 * 60 * 17,
      },
      {
        id: 5,
        authorName: 'Võ Thị Hằng',
        authorEmail: 'hang.vt@hcmut.edu.vn',
        authorSchool: 'Đại học Bách Khoa TP.HCM',
        content: 'Mình học BKU ngành KHMT. Theo mình thì BKU thiên về lý thuyết nền hơn còn UIT thiên thực hành sớm hơn.',
        createdAt: Date.now() - 1000 * 60 * 60 * 18,
      },
      {
        id: 5,
        authorName: 'Thắng siêu nhân',
        authorEmail: 'Thangday.vt@hcmut.edu.vn',
        authorSchool: 'Đại học Bách Khoa TP.HCM',
        content: 'Quan trọng là em phù hợp với ngành nào hơn đó em .',
        createdAt: Date.now() - 1000 * 60 * 60 * 18,
      },
    ],
  },
  {
    id: 6,
    authorName: 'Đỗ Hoàng Nam',
    content: 'Ngành Y khoa UMP học mấy năm với chi phí học toàn khoá tốn bao nhiêu tiền vậy ạ mấy anh chị ơiiiii?',
    createdAt: Date.now() - 1000 * 60 * 30,
    answers: [],
  },
]