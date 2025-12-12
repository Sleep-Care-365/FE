// 수면 단계 타입 (6단계)
export type SleepStage = "W" | "N1" | "N2" | "N3" | "N4" | "R";

// 분석 결과 리포트 인터페이스
export interface SleepReport {
  id: string;
  date: string;
  sleepScore: number; // 👈 [추가] 이 부분이 빠져서 에러가 났습니다!

  // 분석 정보
  analysisInfo: {
    modelName: string;
    accuracy: number;
    usedChannels: string[];
    totalEpochs: number;
  };

  // 요약 정보
  summary: {
    totalSleepTime: number;
    sleepEfficiency: number;
    stages: {
      wake: number;
      rem: number;
      light: number;
      deep: number;
    };
  };

  // 시계열 차트 데이터
  stages: {
    startTime: string;
    endTime: string;
    stage: SleepStage;
    level: number;
    confidence: number;
  }[];

  aiCoaching: string;
}

// 별칭 (API 응답 타입으로 사용)
export type SleepReportResponse = SleepReport;
