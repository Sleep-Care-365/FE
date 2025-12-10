// PDF 논문에 기반한 6단계 수면 분류 (N4 추가)
export type SleepStage = 'W' | 'N1' | 'N2' | 'N3' | 'N4' | 'R';

export interface SleepReport {
  id: string;
  date: string;
  
  // AI 모델 분석 메타데이터 (전문성 강화)
  analysisInfo: {
    modelName: string;      // 예: "Hybrid CNN + LSTM"
    accuracy: number;       // 모델 예측 정확도
    usedChannels: string[]; // 분석에 사용된 채널 (Fpz-Cz, Pz-Oz)
    totalEpochs: number;    // 분석한 총 30초 단위 구간 수
  };

  summary: {
    totalSleepTime: number; // 분
    sleepEfficiency: number; // 수면 효율 (%)
    stages: {
      wake: number; // %
      rem: number;  // %
      light: number; // (N1 + N2) %
      deep: number;  // (N3 + N4) %
    };
  };
  
  // 차트용 시계열 데이터
  stages: {
    startTime: string;
    endTime: string;
    stage: SleepStage;
    level: number;   // 그래프 높이 (W=5, R=4, N1=3, N2=2, N3=1, N4=0)
    confidence: number; // AI 예측 신뢰도 (0~1.0)
  }[];

  aiCoaching: string;
}