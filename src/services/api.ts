import axios from "axios";
import type { SleepReportResponse } from "../types/sleep";

// 백엔드 주소 (FastAPI 기본 주소)
const API_BASE_URL = "http://localhost:8000/api/v1";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 파일 업로드 API 호출 함수
export const uploadSleepFile = async (
  file: File
): Promise<SleepReportResponse> => {
  const formData = new FormData();
  formData.append("file", file); // 백엔드의 'file' 파라미터 이름과 같아야 함

  const response = await api.post<SleepReportResponse>(
    "/analysis/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 전송 필수 헤더
      },
    }
  );

  return response.data;
};
