# Bảng Vàng 2026 — Hỗ trợ xét tuyển Đại học bằng Học bạ

Web app giúp sĩ tử Việt Nam nhập điểm học bạ, tính điểm 36+ tổ hợp xét tuyển,
đối chiếu với điểm chuẩn 2025 của 10 trường ĐH tại TP.HCM, và xem biểu đồ biến
động điểm chuẩn 3 năm.

## Cài đặt & chạy thử

```bash
npm install
npm run dev
```

Mở trình duyệt tại địa chỉ Vite in ra (thường là `http://localhost:5173`).

Build bản production:

```bash
npm run build
npm run preview
```

## Cấu trúc thư mục

```
src/
├── App.jsx                     # State chính (điểm, ưu tiên, tab đang chọn)
├── index.css                   # Token màu/font cho Tailwind v4 (@theme)
├── config/
│   └── tabs.js                 # Khai báo 4 tab điều hướng
├── data/
│   └── universities.json       # ⭐ DỮ LIỆU MẪU — chỉnh ở đây
├── utils/
│   ├── subjects.js              # 14 môn học, nhóm hiển thị
│   ├── combinations.js          # Bảng 42 tổ hợp xét tuyển (A/B/C/D)
│   ├── priorityScore.js         # Công thức điểm ưu tiên KV + Đối tượng
│   ├── scoring.js                # Tính điểm tất cả tổ hợp từ điểm đã nhập
│   ├── admissionLogic.js        # Phân loại Đậu / Có khả năng / Rủi ro
│   └── confetti.js              # Hiệu ứng pháo giấy (canvas-confetti)
└── components/
    ├── layout/Sidebar.jsx       # Điều hướng (sidebar desktop / tab bar mobile)
    ├── ui/                       # SectionHeader, StatusTag, EmptyState
    └── tabs/                     # 4 màn hình: ScoreInput, TopCombinations,
                                   # SchoolSuggestion, Chart
```

## Cập nhật dữ liệu điểm chuẩn

Toàn bộ điểm chuẩn nằm trong **`src/data/universities.json`** — đây là **dữ
liệu mẫu (mock)**, không phải số liệu chính thức. Mỗi ngành có dạng:

```json
{
  "maNganh": "7480201",
  "tenNganh": "Khoa học máy tính",
  "toHop": ["A00", "A01", "D07"],
  "diemChuan": { "2023": 28.5, "2024": 28.9, "2025": 27.8 }
}
```

- `toHop` phải dùng đúng mã tổ hợp đã khai báo trong `src/utils/combinations.js`
  (vd. `A00`, `D01`, `C03`...) thì mới được tab "Gợi ý trường" và "Biểu đồ"
  nhận diện và so khớp điểm.
- Thêm trường mới: copy một object trong mảng `truong`, đổi `id`, `tenTruong`,
  `vietTat` và danh sách `nganh`.

## Logic tính điểm (tóm tắt)

- **Điểm ưu tiên thực tế** = Tổng ưu tiên (KV + Đối tượng) nếu điểm tổ hợp gốc
  `< 22.5`; ngược lại = Tổng ưu tiên × `(30 − điểm gốc) / 7.5` (đúng công thức
  Thông tư 08/2022/TT-BGDĐT).
- **Top tổ hợp**: chỉ tính những tổ hợp có đủ 3 môn > 0 điểm.
- **Gợi ý trường**: với mỗi ngành, hệ thống chọn tổ hợp cho điểm CAO NHẤT
  trong số các tổ hợp ngành đó chấp nhận (thay vì luôn dùng 1 tổ hợp cố định),
  để đảm bảo so sánh công bằng. Ngành nào thí sinh chưa đủ điểm tổ hợp phù hợp
  sẽ không hiển thị.
