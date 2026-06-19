import { useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from 'recharts'
import SectionHeader from '../ui/SectionHeader'
import universitiesData from '../../data/universities.json'
import { getBestMatchForCombos } from '../../utils/scoring'

export default function ChartTab({ allCombinationResults }) {
  const schools = universitiesData.truong

  const [schoolId, setSchoolId] = useState(schools[0].id)
  const school = useMemo(
    () => schools.find((t) => t.id === schoolId) ?? schools[0],
    [schools, schoolId]
  )

  const [maNganh, setMaNganh] = useState(school.nganh[0].maNganh)
  const nganh = useMemo(
    () => school.nganh.find((n) => n.maNganh === maNganh) ?? school.nganh[0],
    [school, maNganh]
  )

  const handleSchoolChange = (id) => {
    setSchoolId(id)
    const next = schools.find((t) => t.id === id)
    setMaNganh(next.nganh[0].maNganh)
  }

  const chartData = useMemo(
    () => [
      { year: '2023', diemChuan: nganh.diemChuan['2023'] },
      { year: '2024', diemChuan: nganh.diemChuan['2024'] },
      { year: '2025', diemChuan: nganh.diemChuan['2025'] },
    ],
    [nganh]
  )

  const studentMatch = useMemo(
    () => getBestMatchForCombos(allCombinationResults, nganh.toHop),
    [allCombinationResults, nganh]
  )

  const yDomain = useMemo(() => {
    const values = chartData.map((d) => d.diemChuan)
    if (studentMatch) values.push(studentMatch.total)
    const min = Math.min(...values)
    const max = Math.max(...values)
    return [Math.max(0, Math.floor(min - 1.5)), Math.ceil(max + 1.5)]
  }, [chartData, studentMatch])

  return (
    <div>
      <SectionHeader
        index="04"
        title="Biểu đồ điểm chuẩn"
        description="Theo dõi biến động điểm chuẩn 3 năm gần nhất và đối chiếu với điểm xét tuyển hiện tại của bạn."
      />

      <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-sm sm:p-6">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
              Trường Đại học
            </span>
            <select
              value={schoolId}
              onChange={(e) => handleSchoolChange(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none transition-all duration-150 focus:border-brand-500 focus:bg-paper-raised focus:ring-4 focus:ring-brand-100"
            >
              {schools.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.tenTruong}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-ink-soft">
              Ngành học
            </span>
            <select
              value={maNganh}
              onChange={(e) => setMaNganh(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none transition-all duration-150 focus:border-brand-500 focus:bg-paper-raised focus:ring-4 focus:ring-brand-100"
            >
              {school.nganh.map((n) => (
                <option key={n.maNganh} value={n.maNganh}>
                  {n.tenNganh}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 pt-4 text-[12.5px] text-ink-soft">
          <span className="rounded-md border border-line px-2 py-0.5 font-mono">
            {nganh.maNganh}
          </span>
          <span>Tổ hợp xét tuyển: {nganh.toHop.join(', ')}</span>
        </div>

        <div className="mt-5 h-[320px] w-full sm:h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="#e7e5e4" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12.5, fill: '#57534e' }}
                axisLine={{ stroke: '#e7e5e4' }}
                tickLine={false}
              />
              <YAxis
                domain={yDomain}
                tick={{ fontSize: 12, fill: '#57534e' }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #e7e5e4',
                  fontSize: 13,
                  boxShadow: '0 8px 24px -8px rgba(0,0,0,0.15)',
                }}
                formatter={(value, name) => [Number(value).toFixed(2), name]}
              />
              <Legend wrapperStyle={{ fontSize: 12.5, paddingTop: 12 }} />
              <Line
                type="monotone"
                dataKey="diemChuan"
                name="Điểm chuẩn"
                stroke="#ea580c"
                strokeWidth={2.75}
                dot={{ r: 4.5, fill: '#ea580c', strokeWidth: 0 }}
                activeDot={{ r: 6.5 }}
                animationDuration={900}
                animationEasing="ease-out"
              />
              {studentMatch && (
                <ReferenceLine
                  y={studentMatch.total}
                  stroke="#1c1917"
                  strokeDasharray="7 5"
                  strokeWidth={2}
                  ifOverflow="extendDomain"
                  label={{
                    value: `Điểm của bạn (${studentMatch.code}): ${studentMatch.total.toFixed(2)}`,
                    position: 'insideTopRight',
                    fill: '#1c1917',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {!studentMatch && (
          <p className="mt-1 rounded-lg bg-brand-50 px-3.5 py-2.5 text-[12.5px] text-brand-700">
            Nhập đủ điểm cho một trong các tổ hợp{' '}
            <span className="font-semibold">{nganh.toHop.join(', ')}</span> ở
            tab &quot;Nhập điểm&quot; để xem đường tham chiếu điểm của bạn.
          </p>
        )}
      </div>
    </div>
  )
}
