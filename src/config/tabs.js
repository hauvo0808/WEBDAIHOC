import { PencilLine, ListOrdered, Landmark, LineChart, Banknote, Compass, MessageCircle  } from 'lucide-react'

export const TABS = [
  {
    id: 'nhap-diem',
    index: '01',
    label: 'Nhập điểm',
    description: 'Nhập điểm & diện ưu tiên',
    icon: PencilLine,
  },
  {
    id: 'top-to-hop',
    index: '02',
    label: 'Top tổ hợp',
    description: '10 tổ hợp cao nhất',
    icon: ListOrdered,
  },
  {
    id: 'goi-y-truong',
    index: '03',
    label: 'Các trường gợi ý',
    description: 'Đối chiếu điểm chuẩn',
    icon: Landmark,
  },
  {
    id: 'bieu-do',
    index: '04',
    label: 'Biểu đồ điểm',
    description: 'Biến động 3 năm',
    icon: LineChart,
  },
  {
    id: 'tuition',
    index: '05',
    label: 'Học phí',
    description: 'học phí trung bình các trường',
    icon: Banknote,
  },
  // NÚT MỚI THÊM Ở ĐÂY:
  {
    id: 'holland',
    index: '06',
    label: 'Trắc nghiệm Holland',
    description: 'Khám phá tính cách',
    icon: Compass,
  },
   { id: 'dien-dan',   index: '05', label: 'Q&A',    description: 'Hỏi đáp thực',     icon: MessageCircle },
]