import React, { useEffect, useState, useRef } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, TrendingUp, Activity, Target } from "lucide-react";
import { getSleepHistory } from "../services/api";
import type { SleepReportResponse } from "../types/sleep";

// ✅ 날짜 포맷팅 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}`;
};

const Pattern = () => {
  // 타입을 any로 열어두거나 인터페이스를 수정해야 하지만,
  // 일단 any로 처리하여 sleep_score 접근을 허용합니다.
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [tooltipContent, setTooltipContent] = useState<{
    date: string;
    score: number;
  } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const heatmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSleepHistory();
        console.log("받아온 데이터 확인:", data); // ✅ 콘솔에서 데이터 구조 확인용

        const sortedData = [...data].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setHistory(sortedData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ [수정] 통계 계산 (안전장치 추가)
  const calculateStats = () => {
    if (history.length === 0)
      return { avgSleep: 0, avgEff: 0, score: 0, count: 0 };

    const totalSleep = history.reduce(
      (sum, item) => sum + Number(item.summary?.totalSleepTime || 0),
      0
    );
    const totalEff = history.reduce(
      (sum, item) => sum + Number(item.summary?.sleepEfficiency || 0),
      0
    );

    // 💥 핵심 수정: item.sleepScore가 없으면 item.sleep_score를 사용
    const totalScore = history.reduce((sum, item) => {
      const score = item.sleepScore ?? item.sleep_score ?? 0;
      return sum + Number(score);
    }, 0);

    return {
      avgSleep: Math.round(totalSleep / history.length),
      avgEff: Math.round(totalEff / history.length),
      score: Math.round(totalScore / history.length),
      count: history.length,
    };
  };

  const stats = calculateStats();

  // ✅ [수정] 차트 데이터 가공 (안전장치 추가)
  const chartData = history.map((item) => {
    // 여기서도 sleepScore와 sleep_score 둘 다 체크
    const safeScore = item.sleepScore ?? item.sleep_score ?? 0;

    return {
      date: formatDate(item.date),
      totalSleep: parseFloat(
        (Number(item.summary?.totalSleepTime || 0) / 60).toFixed(1)
      ),
      deepSleep: parseFloat(
        (
          (Number(item.summary?.totalSleepTime || 0) *
            ((item.summary?.stages?.deep || 0) / 100)) /
          60
        ).toFixed(1)
      ),
      efficiency: item.summary?.sleepEfficiency || 0,
      score: safeScore,
    };
  });

  const handleMouseEnter = (
    event: React.MouseEvent,
    date: string,
    score: number
  ) => {
    if (heatmapRef.current) {
      const heatmapRect = heatmapRef.current.getBoundingClientRect();
      const targetRect = (
        event.currentTarget as HTMLDivElement
      ).getBoundingClientRect();
      const x = targetRect.left - heatmapRect.left + targetRect.width / 2;
      const y = targetRect.top - heatmapRect.top - 10;
      setTooltipPos({ x, y });
      setTooltipContent({ date: formatDate(date), score });
    }
  };

  if (loading)
    return <div className="text-center py-20">데이터를 불러오는 중...</div>;

  return (
    <div className="space-y-8 animate-fade-in-up pb-20 relative">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Calendar className="w-8 h-8 text-indigo-600" />
          수면 패턴 분석
        </h1>
        <p className="text-slate-500 mt-2">
          DB에 저장된 {stats.count}건의 데이터를 분석한 결과입니다.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="평균 수면 시간"
          value={`${Math.floor(stats.avgSleep / 60)}시간 ${
            stats.avgSleep % 60
          }분`}
          icon={<Activity className="w-5 h-5 text-blue-500" />}
        />
        <StatCard
          label="평균 수면 효율"
          value={`${stats.avgEff}%`}
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
        />
        <StatCard
          label="평균 점수"
          value={`${stats.score}점`}
          icon={<Target className="w-5 h-5 text-purple-500" />}
          desc={stats.score > 80 ? "매우 좋음" : "관리 필요"}
        />
        <StatCard
          label="누적 분석 리포트"
          value={`${stats.count}건`}
          icon={<Calendar className="w-5 h-5 text-orange-500" />}
        />
      </section>

      {history.length > 0 ? (
        <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            최근 수면 변화 추이
          </h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
              >
                <CartesianGrid stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b" }}
                />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: "시간 (h)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip content={<CustomRechartsTooltip />} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="totalSleep"
                  name="총 수면 시간"
                  barSize={20}
                  fill="#cbd5e1"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="deepSleep"
                  name="깊은 잠 (N3+N4)"
                  barSize={20}
                  fill="#4f46e5"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="efficiency"
                  name="수면 효율 (%)"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>
      ) : (
        <div className="p-10 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300">
          <p className="text-slate-500">아직 저장된 수면 기록이 없습니다.</p>
        </div>
      )}

      <section
        className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm relative"
        ref={heatmapRef}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-slate-900">
            월간 수면 일관성 (Consistency)
          </h2>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-slate-100 border border-slate-200"></div>{" "}
              No Data
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-indigo-200"></div> Bad
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-indigo-400"></div> Good
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-indigo-600"></div> Excellent
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
          {history.map((log, idx) => {
            // 💥 핵심 수정: 여기서도 안전하게 값 가져오기
            const score = Number(log.sleepScore ?? log.sleep_score ?? 0);

            let colorClass = "bg-indigo-100 text-indigo-800";
            if (score >= 90) colorClass = "bg-indigo-600 text-white";
            else if (score >= 70) colorClass = "bg-indigo-400 text-white";
            else if (score > 0) colorClass = "bg-indigo-200 text-indigo-900";

            return (
              <div
                key={idx}
                onMouseEnter={(e) => handleMouseEnter(e, log.date, score)}
                onMouseLeave={() => setTooltipContent(null)}
                className={`
                  aspect-square rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer relative shadow-sm
                  ${colorClass}
                `}
              >
                <span className="text-[10px] opacity-80 uppercase mb-1">
                  {formatDate(log.date)}
                </span>
                <span className="text-xl font-bold">{score}</span>
              </div>
            );
          })}
        </div>

        {tooltipContent && (
          <div
            className="absolute z-50 bg-slate-900 text-white text-xs py-1 px-3 rounded-md shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full transition-opacity"
            style={{ top: tooltipPos.y, left: tooltipPos.x }}
          >
            <span className="font-bold">{tooltipContent.date}</span> :{" "}
            {tooltipContent.score}점
          </div>
        )}
      </section>
    </div>
  );
};

const StatCard = ({ label, value, icon, desc }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 transition duration-300">
    <div className="flex justify-between items-start mb-2">
      <p className="text-slate-500 text-xs font-bold uppercase">{label}</p>
      {icon}
    </div>
    <h3 className="text-2xl font-black text-slate-800">{value}</h3>
    {desc && <p className="text-xs text-indigo-600 font-medium mt-1">{desc}</p>}
  </div>
);

const CustomRechartsTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white p-3 rounded-lg shadow-xl text-xs">
        <p className="font-bold mb-2 text-base">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="mb-1" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name.includes("효율") ? "%" : "h"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default Pattern;
