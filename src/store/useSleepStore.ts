import { create } from "zustand";
import type { SleepReportResponse } from "../types/sleep";

interface SleepState {
  // 수면 분석 데이터 (초기값은 null)
  sleepData: SleepReportResponse | null;

  // 데이터를 저장하는 함수 (Action)
  setSleepData: (data: SleepReportResponse) => void;

  // 데이터를 초기화하는 함수
  clearSleepData: () => void;
}

const useSleepStore = create<SleepState>((set) => ({
  sleepData: null,

  setSleepData: (data) => set({ sleepData: data }),

  clearSleepData: () => set({ sleepData: null }),
}));

export default useSleepStore;
