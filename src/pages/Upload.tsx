import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileText, X, Loader2, CheckCircle } from "lucide-react";
import { uploadSleepFile } from "../services/api";
import useSleepStore from "../store/useSleepStore"; // 👈 스토어 import

const Upload = () => {
  const navigate = useNavigate();
  const setSleepData = useSleepStore((state) => state.setSleepData); // 👈 저장 함수 가져오기

  // 상태 관리
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [sleepDate, setSleepDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // 드래그 앤 드롭 이벤트 핸들러
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  }, []);

  // 파일 선택 인풋 핸들러
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 업로드 및 분석 시작
  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      // 1. 백엔드 API 호출
      const result = await uploadSleepFile(file);
      console.log("백엔드 응답 성공:", result);

      // 2. 받아온 데이터를 전역 스토어에 저장 (★핵심)
      setSleepData(result);

      // 3. 리포트 페이지로 이동
      navigate("/report");
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("서버 연결에 실패했습니다. 백엔드가 켜져 있는지 확인해주세요!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
      {/* 헤더 섹션 */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">
          수면 데이터 업로드
        </h1>
        <p className="text-slate-500">
          웨어러블 기기나 EEG 장비에서 추출한 데이터 파일(.csv, .txt)을
          업로드해주세요.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
        {/* 1. 날짜 선택 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            수면 날짜
          </label>
          <input
            type="date"
            value={sleepDate}
            onChange={(e) => setSleepDate(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* 2. 드래그 앤 드롭 영역 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-700">
            데이터 파일
          </label>

          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer group
                ${
                  isDragging
                    ? "border-blue-500 bg-blue-50 scale-[1.02]"
                    : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                }
              `}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileInput}
              />
              <div
                className={`p-4 rounded-full bg-blue-50 mb-4 group-hover:scale-110 transition duration-300 ${
                  isDragging ? "bg-blue-100" : ""
                }`}
              >
                <UploadCloud
                  className={`w-8 h-8 ${
                    isDragging ? "text-blue-600" : "text-blue-500"
                  }`}
                />
              </div>
              <p className="text-slate-900 font-medium">
                파일을 여기에 끌어다 놓으세요
              </p>
              <p className="text-slate-500 text-sm mt-1">
                또는 클릭하여 파일 선택
              </p>
            </div>
          ) : (
            <div className="relative p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4 animate-fade-in">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-slate-900 truncate">
                  {file.name}
                </p>
                <p className="text-sm text-slate-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-2 hover:bg-white rounded-full transition text-slate-400 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* 3. 분석 시작 버튼 */}
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`
            w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
            ${
              !file
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 hover:-translate-y-1"
            }
          `}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              AI가 수면 데이터를 분석 중입니다...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              수면 분석 시작하기
            </>
          )}
        </button>
      </div>

      <div className="text-center text-sm text-slate-400">
        <p>지원 파일 형식: CSV, TXT (Raw Data)</p>
        <p>개인 정보는 암호화되어 처리됩니다.</p>
      </div>
    </div>
  );
};

export default Upload;
