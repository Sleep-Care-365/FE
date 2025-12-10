export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const COACHING_DATA = {
  // 1. 종합 진단 카드
  diagnosis: {
    status: 'Warning', // Good, Warning, Bad
    title: '깊은 수면(N3) 부족 및 잦은 각성',
    summary: 'CNN-LSTM 모델 분석 결과, Fpz-Cz 채널에서 수면 유지에 방해되는 고빈도 베타파가 다수 검출되었습니다. 전체 수면 시간은 충분하나 수면의 질(Quality) 개선이 필요합니다.',
  },

  // 2. 상세 분석 및 솔루션
  prescriptions: [
    {
      id: 1,
      category: 'Sleep Stage',
      issue: 'N3(Deep Sleep) 비율 8% 미만',
      cause: '잠들기 전 높은 신체 온도 및 스마트폰 사용 추정',
      solution: '취침 2시간 전 블루라이트 차단 및 족욕 권장',
      impact: 'High'
    },
    {
      id: 2,
      category: 'Latency',
      issue: '입면 시간(Sleep Latency) 45분 지연',
      cause: '불규칙한 수면 패턴으로 인한 일주기 리듬 불균형',
      solution: '매일 아침 30분 이상 햇볕 쬐기 (멜라토닌 조절)',
      impact: 'Medium'
    }
  ],

  // 3. 초기 채팅 기록
  initialChat: [
    {
      id: '1',
      sender: 'ai',
      text: '안녕하세요. Sleep Care 365 AI 코치입니다. 회원님의 EEG 데이터를 기반으로 분석한 결과, 깊은 잠(N3) 단계가 평소보다 부족한 것으로 나타났습니다. 이에 대해 더 자세히 설명해 드릴까요?',
      timestamp: '09:00'
    }
  ] as ChatMessage[]
};