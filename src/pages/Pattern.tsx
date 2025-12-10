import { 
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Calendar, TrendingUp, Activity, Target } from 'lucide-react';
import { PATTERN_DATA } from '../mocks/mockPatternData';

const Pattern = () => {
  const data = PATTERN_DATA;

  return (
    <div className="space-y-8 animate-fade-in-up pb-20">
      
      {/* 1. 헤더 */}
      <header>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <Calendar className="w-8 h-8 text-indigo-600" />
          수면 패턴 분석
        </h1>
        <p className="text-slate-500 mt-2">
          지난 30일간의 수면 데이터(EEG)를 분석하여 장기적인 패턴 변화를 추적합니다.
        </p>
      </header>

      {/* 2. 요약 통계 카드 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          label="평균 수면 시간" 
          value={data.stats.avgSleepTime} 
          icon={<Activity className="w-5 h-5 text-blue-500" />} 
        />
        <StatCard 
          label="평균 수면 효율" 
          value={data.stats.avgEfficiency} 
          icon={<TrendingUp className="w-5 h-5 text-green-500" />} 
        />
        <StatCard 
          label="규칙성 점수" 
          value={`${data.stats.consistencyScore}점`} 
          icon={<Target className="w-5 h-5 text-purple-500" />} 
          desc="매우 규칙적임"
        />
        <StatCard 
          label="데이터 분석 일수" 
          value={`${data.stats.totalAnalysis}일`} 
          icon={<Calendar className="w-5 h-5 text-orange-500" />} 
        />
      </section>

      {/* 3. 주간 트렌드 차트 (Composed Chart) */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6">주간 수면 아키텍처 변화</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data.weeklyTrend} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
              {/* 왼쪽 Y축: 시간 */}
              <YAxis yAxisId="left" label={{ value: '시간 (h)', angle: -90, position: 'insideLeft' }} axisLine={false} tickLine={false} />
              {/* 오른쪽 Y축: 점수/효율 */}
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} axisLine={false} tickLine={false} />
              
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              {/* 총 수면 시간 (막대) */}
              <Bar yAxisId="left" dataKey="totalSleep" name="총 수면 시간" barSize={20} fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              {/* 깊은 잠 (막대 중첩 - 실제로는 별도 표시) */}
              <Bar yAxisId="left" dataKey="deepSleep" name="깊은 잠 (N3+N4)" barSize={20} fill="#4f46e5" radius={[4, 4, 0, 0]} />
              
              {/* 효율 및 점수 (선) */}
              <Line yAxisId="right" type="monotone" dataKey="efficiency" name="수면 효율 (%)" stroke="#10b981" strokeWidth={2} dot={{r: 4}} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. 월간 히트맵 (GitHub Style) */}
      <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-bold text-slate-900">월간 수면 일관성 (Consistency)</h2>
          <div className="flex gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-slate-100"></div>No Data</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-indigo-200"></div>Bad</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-indigo-400"></div>Good</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-indigo-600"></div>Excellent</span>
          </div>
        </div>

        {/* 그리드 캘린더 */}
        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-slate-400 mb-2">{day}</div>
          ))}
          
          {data.monthlyLogs.map((log, idx) => (
            <div 
              key={idx} 
              className={`
                aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all hover:scale-110 cursor-pointer relative group
                ${log.score >= 90 ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-lg' : 
                  log.score >= 75 ? 'bg-indigo-400 text-white' : 
                  'bg-indigo-100 text-indigo-800'}
              `}
            >
              {idx + 1}
              
              {/* 호버 시 툴팁 */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">
                {log.date}: {log.score}점
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

// 통계 카드 컴포넌트
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

// 차트 커스텀 툴팁
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white p-3 rounded-lg shadow-xl text-xs">
        <p className="font-bold mb-2 text-base">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="mb-1" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
            {entry.name.includes('효율') ? '%' : 'h'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default Pattern;