// ChartData 타입을 사용하기 위해 불러옵니다 (없으면 any로 대체 가능하지만 명시 권장)
export interface WeeklyTrend {
  date: string;     // 'Mon', 'Tue'...
  totalSleep: number; // 시간(h)
  deepSleep: number;  // 시간(h) (N3 + N4)
  efficiency: number; // %
  score: number;      // 0~100
}

export interface DailyLog {
  date: string;     // '2025-05-01'
  score: number;    // 수면 점수
  status: 'Good' | 'Warning' | 'Bad';
}

export const PATTERN_DATA = {
  // 상단 요약 통계
  stats: {
    avgSleepTime: "7시간 12분",
    avgEfficiency: "88%",
    consistencyScore: 92, // 수면 규칙성 점수
    totalAnalysis: 24,    // 분석된 총 일수
  },

  // 주간 추이 데이터 (차트용)
  weeklyTrend: [
    { date: 'Mon', totalSleep: 6.5, deepSleep: 1.2, efficiency: 82, score: 78 },
    { date: 'Tue', totalSleep: 7.2, deepSleep: 1.5, efficiency: 88, score: 85 },
    { date: 'Wed', totalSleep: 5.8, deepSleep: 0.8, efficiency: 75, score: 60 }, // 수면 부족
    { date: 'Thu', totalSleep: 7.5, deepSleep: 1.8, efficiency: 91, score: 92 },
    { date: 'Fri', totalSleep: 8.0, deepSleep: 2.1, efficiency: 94, score: 96 },
    { date: 'Sat', totalSleep: 9.2, deepSleep: 2.5, efficiency: 90, score: 88 }, // 주말 과수면
    { date: 'Sun', totalSleep: 7.0, deepSleep: 1.4, efficiency: 85, score: 82 },
  ] as WeeklyTrend[],

  // 월간 히트맵 데이터 (30일치 더미 데이터 생성)
  monthlyLogs: Array.from({ length: 30 }, (_, i) => {
    const score = Math.floor(Math.random() * (100 - 60) + 60); // 60~100 랜덤 점수
    return {
      date: `2025-05-${String(i + 1).padStart(2, '0')}`,
      score: score,
      status: score >= 90 ? 'Good' : score >= 75 ? 'Warning' : 'Bad'
    };
  }) as DailyLog[]
};