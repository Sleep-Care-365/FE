import type { SleepReport } from '../types/sleep';

export const MOCK_REPORT: SleepReport = {
  id: 'report_2025_grad',
  date: '2025-05-20',
  
  // PDF 내용을 반영한 기술적 스펙 표시
  analysisInfo: {
    modelName: "Hybrid CNN-LSTM Network",
    accuracy: 82.4, // PDF의 Accuracy 0.82 반영 [cite: 453]
    usedChannels: ["EEG Fpz-Cz", "EEG Pz-Oz"], // [cite: 96]
    totalEpochs: 939 // PDF Test set support size [cite: 453]
  },

  summary: {
    totalSleepTime: 450,
    sleepEfficiency: 88,
    stages: {
      wake: 15,
      rem: 22,
      light: 45, // N1+N2
      deep: 18   // N3+N4
    }
  },

  aiCoaching: "EEG Fpz-Cz 채널 분석 결과, N3/N4 단계의 델타파 비중이 안정적입니다. CNN-LSTM 모델이 예측한 수면 사이클이 전형적인 건강한 패턴과 82% 일치합니다.",

  // 6단계 분류 (W, R, N1, N2, N3, N4)
  // Level: W=5, R=4, N1=3, N2=2, N3=1, N4=0
  stages: [
    { startTime: '23:00', endTime: '23:15', stage: 'W', level: 5, confidence: 0.98 },
    { startTime: '23:15', endTime: '23:45', stage: 'N1', level: 3, confidence: 0.85 },
    { startTime: '23:45', endTime: '00:30', stage: 'N2', level: 2, confidence: 0.92 },
    { startTime: '00:30', endTime: '01:00', stage: 'N3', level: 1, confidence: 0.88 },
    { startTime: '01:00', endTime: '01:30', stage: 'N4', level: 0, confidence: 0.91 }, // 깊은 잠 [cite: 134]
    { startTime: '01:30', endTime: '02:00', stage: 'R', level: 4, confidence: 0.89 },
    { startTime: '02:00', endTime: '03:00', stage: 'N2', level: 2, confidence: 0.94 },
    { startTime: '03:00', endTime: '03:30', stage: 'N3', level: 1, confidence: 0.82 },
    { startTime: '03:30', endTime: '04:00', stage: 'R', level: 4, confidence: 0.90 },
    { startTime: '04:00', endTime: '05:30', stage: 'N2', level: 2, confidence: 0.93 },
    { startTime: '05:30', endTime: '06:00', stage: 'R', level: 4, confidence: 0.88 },
    { startTime: '06:00', endTime: '06:30', stage: 'W', level: 5, confidence: 0.99 },
  ]
};