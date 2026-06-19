import { PencilLine, ListOrdered, Landmark, LineChart } from 'lucide-react'

export const TABS = [
  {
    id: 'nhap-diem',
    index: '01',
    label: 'Nhập điểm',
    description: 'Học bạ & diện ưu tiên',
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
    label: 'Gợi ý trường',
    description: 'Đối chiếu điểm chuẩn',
    icon: Landmark,
  },
  {
    id: 'bieu-do',
    index: '04',
    label: 'Biểu đồ',
    description: 'Biến động 3 năm',
    icon: LineChart,
  },
]
