import { useState, useEffect } from 'react';
// Import thư viện vẽ biểu đồ (dự án của bạn đã có sẵn Recharts)
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

import questions from '../../data/hollandQuestions.json';
import universitiesData from '../../data/universities.json';
import { RIASEC_INFO, RIASEC_ORDER, suggestNganh } from '../../utils/hollandLogic';

export default function HollandTestTab() {
  // --- 1. BỘ NHỚ STATE ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  // Biến mới: Nhớ xem người dùng đã nộp bài (làm xong 60 câu) chưa
  const [isFinished, setIsFinished] = useState(false);

  // --- 2. TỰ ĐỘNG LƯU TRÌNH DUYỆT ---
  useEffect(() => {
    const savedIndex = localStorage.getItem('holland_index');
    const savedAnswers = localStorage.getItem('holland_answers');
    const savedFinished = localStorage.getItem('holland_finished');
    if (savedIndex) setCurrentIndex(Number(savedIndex));
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedFinished) setIsFinished(savedFinished === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('holland_index', currentIndex);
    localStorage.setItem('holland_answers', JSON.stringify(answers));
    localStorage.setItem('holland_finished', isFinished);
  }, [currentIndex, answers, isFinished]);

  // --- 3. CÁC HÀM XỬ LÝ NÚT BẤM ---
  const handleSelect = (score) => {
    const currentQuestion = questions[currentIndex];
    setAnswers({
      ...answers,
      [currentQuestion.id]: { category: currentQuestion.category, score: score }
    });

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // THAY ĐỔI LỚN TẠI ĐÂY: Thay vì hiện hộp thoại Alert, ta bật cờ isFinished = true
      setIsFinished(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleRestart = () => {
    if (window.confirm("Bạn có chắc muốn làm lại từ đầu? Mọi kết quả sẽ bị xóa.")) {
      setAnswers({});
      setCurrentIndex(0);
      setIsFinished(false);
    }
  };

  // --- 4. TÍNH TOÁN KẾT QUẢ (Chỉ chạy khi đã làm xong) ---
  if (isFinished) {
    // a. Tạo cái giỏ trống để cộng điểm cho 6 nhóm
    const totalScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    // b. Lấy sổ đáp án ra cộng dồn vào giỏ
    Object.values(answers).forEach((ans) => {
      totalScores[ans.category] += ans.score;
    });

    // c. Xếp hạng điểm từ cao xuống thấp và lấy 3 chữ cái đứng đầu làm Mã Holland
    const sortedCodes = [...RIASEC_ORDER].sort((a, b) => totalScores[b] - totalScores[a]);
    const top3Codes = sortedCodes.slice(0, 3);
    const hollandCode = top3Codes.join(''); // Ví dụ tạo ra chữ "RIA"

    // d. Chuẩn bị dữ liệu để vẽ biểu đồ cột
    const chartData = RIASEC_ORDER.map((code) => ({
      name: code,
      diem: totalScores[code],
      fill: RIASEC_INFO[code].color // Lấy màu sắc đã định nghĩa cho từng nhóm
    }));

    // e. Tìm ngành học phù hợp bằng hàm suggestNganh (ở file hollandLogic)
    const suggestedCareers = suggestNganh(universitiesData, top3Codes);

    // GIAO DIỆN KẾT QUẢ
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-slate-200 animate-rise">
        {/* Nút làm lại */}
        <div className="flex justify-end mb-4">
          <button onClick={handleRestart} className="text-sm text-slate-500 hover:text-indigo-600 underline">
            Làm lại bài test
          </button>
        </div>

        {/* Khối hiển thị Mã Holland */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Kết quả tính cách</h2>
          <p className="text-slate-500 mt-2">Mã Holland đại diện cho bạn là:</p>
          <div className="text-5xl md:text-6xl font-extrabold text-indigo-600 mt-4 tracking-widest">
            {hollandCode}
          </div>
        </div>

        {/* Khối vẽ biểu đồ */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Biểu đồ điểm số RIASEC</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{fontWeight: 'bold'}} />
                <YAxis />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="diem" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Giải thích 3 nhóm tính cách nổi trội */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Đặc điểm nổi trội của bạn</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {top3Codes.map(code => {
              const info = RIASEC_INFO[code];
              return (
                <div key={code} className="p-4 rounded-xl border" style={{borderColor: info.color, backgroundColor: `${info.color}10`}}>
                  <div className="text-2xl font-black mb-1" style={{color: info.color}}>{info.code}</div>
                  <div className="font-bold text-slate-800 mb-2">{info.name} ({info.vi})</div>
                  <div className="text-sm text-slate-600">{info.desc}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Danh sách ngành học gợi ý */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Ngành học gợi ý cho bạn</h3>
          {suggestedCareers.length === 0 ? (
            <div className="text-slate-500 italic">Chưa tìm thấy ngành học nào khớp hoàn toàn với dữ liệu hiện tại.</div>
          ) : (
            <div className="space-y-3">
              {suggestedCareers.slice(0, 10).map((nganh, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-md transition">
                  <div>
                    <div className="font-bold text-slate-800 text-lg capitalize">{nganh.tenNganh}</div>
                    <div className="text-sm text-slate-500 mt-1">
                      Đào tạo tại: {nganh.schools.join(', ')}
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 flex gap-2">
                    {/* Hiển thị các "tag" huy hiệu nhóm tính cách khớp với ngành này */}
                    {nganh.matchedGroups.map(c => (
                      <span key={c} className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{backgroundColor: RIASEC_INFO[c].color}}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- 5. GIAO DIỆN LÚC ĐANG LÀM TEST (Giữ nguyên như cũ) ---
  const currentQuestion = questions[currentIndex];
  const progressPercent = Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Tiến độ làm bài</span>
          <span>{progressPercent}% ({Object.keys(answers).length}/60)</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5">
          <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="mb-2 text-indigo-600 font-bold tracking-wide text-sm uppercase">CÂU HỎI {currentIndex + 1}</div>
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed min-h-[5rem]">
        {currentQuestion.text}
      </h2>

      <div className="flex flex-col gap-3 mb-8">
        {[
          { text: "Rất không thích", score: 1 },
          { text: "Không thích", score: 2 },
          { text: "Bình thường", score: 3 },
          { text: "Thích", score: 4 },
          { text: "Rất thích", score: 5 }
        ].map((option) => {
          const isSelected = answers[currentQuestion.id]?.score === option.score;
          return (
            <button 
              key={option.score}
              onClick={() => handleSelect(option.score)} 
              className={`p-4 text-left border rounded-xl transition font-medium ${
                isSelected ? "bg-indigo-50 border-indigo-500 text-indigo-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button 
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 font-medium rounded-lg ${currentIndex === 0 ? "text-slate-300 cursor-not-allowed" : "text-slate-600 hover:bg-slate-100"}`}
        >
          ← Câu trước
        </button>
      </div>
    </div>
  );
}