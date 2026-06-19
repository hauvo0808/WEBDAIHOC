// Danh sách 14 môn học dùng trong xét tuyển học bạ.
// `group` chỉ phục vụ việc sắp xếp giao diện nhập điểm theo từng khối kiến thức,
// không ảnh hưởng đến logic tính điểm tổ hợp.

export const SUBJECT_GROUPS = [
  {
    id: 'core',
    label: 'Môn bắt buộc',
    subjects: [
      { id: 'toan', label: 'Toán' },
      { id: 'van', label: 'Ngữ văn' },
    ],
  },
  {
    id: 'science',
    label: 'Khoa học tự nhiên',
    subjects: [
      { id: 'ly', label: 'Vật lý' },
      { id: 'hoa', label: 'Hóa học' },
      { id: 'sinh', label: 'Sinh học' },
    ],
  },
  {
    id: 'social',
    label: 'Khoa học xã hội',
    subjects: [
      { id: 'su', label: 'Lịch sử' },
      { id: 'dia', label: 'Địa lí' },
      { id: 'gdktpl', label: 'Giáo dục KT&PL' },
    ],
  },
  {
    id: 'language',
    label: 'Ngoại ngữ',
    subjects: [
      { id: 'anh', label: 'Tiếng Anh' },
      { id: 'nga', label: 'Tiếng Nga' },
      { id: 'phap', label: 'Tiếng Pháp' },
      { id: 'trung', label: 'Tiếng Trung' },
      { id: 'duc', label: 'Tiếng Đức' },
      { id: 'nhat', label: 'Tiếng Nhật' },
    ],
  },
]

// Bản phẳng (flat) tiện cho việc tra cứu nhãn môn học theo id.
export const SUBJECTS = SUBJECT_GROUPS.flatMap((g) => g.subjects)

export const SUBJECT_LABEL = SUBJECTS.reduce((map, s) => {
  map[s.id] = s.label
  return map
}, {})

export const EMPTY_SCORES = SUBJECTS.reduce((acc, s) => {
  acc[s.id] = ''
  return acc
}, {})
