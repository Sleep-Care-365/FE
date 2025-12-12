import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Activity,
  BrainCircuit,
  Cpu,
  Layers,
  FileDigit,
  ArrowLeft,
} from "lucide-react";
import useSleepStore from "../store/useSleepStore"; // 👈 스토어 import

const Report = () => {
  const navigate = useNavigate();

  // 전역 스토어에서 데이터 가져오기 (★핵심)
  const data = useSleepStore((state) => state.sleepData);

  // 데이터가 없을 경우 (새로고침 등) 처리
  useEffect(() => {
    if (!data) {
      // 데이터가 없으면 안내 화면을 보여주거나 리다이렉트
      // 여기서는 아래 return 문에서 조건부 렌더링으로 처리함
    }
  }, [data, navigate]);

  // 데이터가 없는 경우의 화면
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <div className="p-4 bg-slate-100 rounded-full">
          <Activity className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          분석된 데이터가 없습니다.
        </h2>
        <p className="text-slate-500">먼저 수면 데이터를 업로드해주세요.</p>
        <button
          onClick={() => navigate("/upload")}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          데이터 업로드하러 가기
        </button>
      </div>
    );
  }

  // 데이터가 있을 경우 리포트 렌더링
  return (
    <div className="space-y-8 animate-fade-in-up pb-20">
      {/* 1. 헤더 */}
      <header className="border-b border-slate-200 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                AI Prediction
              </span>
              <span className="text-slate-400 text-sm">{data.date} 분석</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">
              EEG 수면 단계 분석 리포트
            </h1>
          </div>

          {/* 모델 정확도 배지 */}
          <div className="flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg">
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium">
                Model Accuracy
              </p>
              <p className="text-2xl font-bold text-emerald-400">
                {data.analysisInfo.accuracy}%
              </p>
            </div>
            <Activity className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </header>

      {/* 2. Technical Specs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TechCard
          icon={<BrainCircuit className="w-5 h-5 text-indigo-500" />}
          title="AI Model Architecture"
          value={data.analysisInfo.modelName}
          desc="CNN(Feature) + LSTM(Time-series)"
        />
        <TechCard
          icon={<Cpu className="w-5 h-5 text-blue-500" />}
          title="Input Channels"
          value={data.analysisInfo.usedChannels.join(", ")}
          desc="Standard 10-20 System (PhysioNet)"
        />
        <TechCard
          icon={<Layers className="w-5 h-5 text-purple-500" />}
          title="Classification Class"
          value="6 Stages"
          desc="W, R, N1, N2, N3, N4"
        />
      </section>

      {/* 3. Hypnogram (6단계 차트) */}
      <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Predicted Hypnogram (EEG Analysis)
          </h2>
          <div className="flex gap-2 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              Deep(N3/4)
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              Light(N1/2)
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-indigo-300 rounded-full"></div>REM
            </span>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data.stages}
              margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="startTime"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              {/* Y축 6단계 매핑: N4(0) ~ W(5) */}
              <YAxis
                domain={[0, 5.5]}
                ticks={[0, 1, 2, 3, 4, 5]}
                tickFormatter={(val) => {
                  const map = ["N4", "N3", "N2", "N1", "REM", "Wake"];
                  return map[val] || "";
                }}
                tick={{ fontSize: 11, fontWeight: 600, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="stepAfter"
                dataKey="level"
                stroke="#4F46E5"
                strokeWidth={2}
                fill="url(#colorLevel)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. 분석 상세 데이터 (테이블 형태) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatBox
          label="Total Epochs"
          value={data.analysisInfo.totalEpochs}
          unit="cnt"
        />
        <StatBox
          label="Deep Sleep (N3+N4)"
          value={data.summary.stages.deep}
          unit="%"
        />
        <StatBox label="REM Sleep" value={data.summary.stages.rem} unit="%" />
        <StatBox
          label="Sleep Efficiency"
          value={data.summary.sleepEfficiency}
          unit="%"
        />
      </section>

      {/* 5. AI 코멘트 */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex gap-4 items-start">
        <FileDigit className="w-8 h-8 text-slate-400 mt-1" />
        <div>
          <h3 className="font-bold text-slate-900 mb-1">AI Analysis Summary</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {data.aiCoaching}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 하위 컴포넌트들은 기존과 동일 ---

const TechCard = ({ icon, title, value, desc }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {title}
      </span>
    </div>
    <p className="text-lg font-bold text-slate-900 truncate">{value}</p>
    <p className="text-xs text-slate-500 mt-1">{desc}</p>
  </div>
);

const StatBox = ({ label, value, unit }: any) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 text-center">
    <p className="text-slate-400 text-xs font-medium mb-1">{label}</p>
    <p className="text-2xl font-black text-slate-800">
      {value}
      <span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>
    </p>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700">
        <p className="font-bold mb-1 text-slate-300">
          {label} ~ {d.endTime}
        </p>
        <p className="text-lg font-bold text-white mb-1">Stage {d.stage}</p>
        <p className="text-emerald-400">
          Confidence: {(d.confidence * 100).toFixed(0)}%
        </p>
      </div>
    );
  }
  return null;
};

export default Report;
