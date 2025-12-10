# Sleep Care 365 - Frontend

Sleep Care 365의 프론트엔드 레포지토리입니다.  
본 프로젝트는 EEG/웨어러블 데이터를 시각화하고, AI 기반 수면 코칭을 제공하는 웹 대시보드를 구현합니다.

--------------------------------------------

## 📅 프로젝트 개요
- **프로젝트명:** Sleep Care 365 (졸업작품)
- **개발 기간:** 2025.11 ~ 2025.12
- **목표:** EEG/웨어러블 데이터를 분석하여 수면 단계를 시각화하고,
  AI 기반 맞춤형 수면 개선 솔루션을 제공하는 웹 서비스 구축

--------------------------------------------

## 🛠 기술 스택 (Tech Stack)

### Core
- React 18  
- TypeScript  
- Vite  

### Styling & UI
- Tailwind CSS  
- Lucide React (아이콘)  
- clsx / tailwind-merge  

### State & Logic
- Zustand (전역 상태 관리)  
- React Router DOM v6 (라우팅)  
- Recharts (수면 그래프, 패턴 분석)  
- Axios (HTTP Client)  

--------------------------------------------

## ✨ 주요 기능 (Key Features)

### 1. 🏠 메인 대시보드
- 업로드 / 리포트 / 코칭 / 패턴 분석 페이지로 이동  
- 직관적인 카드형 UI와 인터랙션 제공  

### 2. 📂 데이터 업로드
- EEG(.edf), Wearable(.csv) 파일 업로드 기능 제공  
- Drag & Drop 지원  
- 분석 로딩 및 자동 결과 페이지 이동  

### 3. 📊 수면 분석 리포트 (Sleep Report)
- 6단계 수면(Hypnogram) 시각화 (W, N1, N2, N3, N4, REM)  
- CNN+LSTM 기반 모델 분석 결과 표시  
- 수면 효율성, 깊은 잠 비율 등 핵심 지표 제공  

### 4. 🤖 AI 수면 코칭
- 진단 기반 개선 솔루션 카드 제공  
- 대화형 챗봇 UI

### 5. 📅 패턴 분석 (Trend Analysis)
- 주간/월간 수면 패턴 시각화  
- Heatmap 기반 수면 일관성 분석  

--------------------------------------------

## 📂 폴더 구조 (Project Structure)

src/  
├── assets/ — 이미지 및 정적 리소스  
├── components/ — 공용 UI 컴포넌트  
│   └── layout/ — Header, Footer 등  
├── mocks/ — Mock API 데이터  
│   ├── mockSleepData.ts  
│   ├── mockCoachData.ts  
│   └── mockPatternData.ts  
├── pages/ — 주요 페이지  
│   ├── Home.tsx  
│   ├── Upload.tsx  
│   ├── Report.tsx  
│   ├── Coach.tsx  
│   └── Pattern.tsx  
├── types/ — TypeScript 타입 정의  
├── App.tsx — 라우팅 설정  
└── main.tsx — 엔트리 포인트  

--------------------------------------------

## 🚀 실행 방법 (Getting Started)

### 1. 저장소 클론
git clone https://github.com/Sleep-Care-365/FE.git  
cd FE

### 2. 패키지 설치
npm install

### 3. 개발 서버 실행
npm run dev  
➡ http://localhost:5173 접속  

--------------------------------------------

## 🔗 백엔드 연동 정보
- **AI Model:** Hybrid CNN + LSTM  
- **Expected Input:** Fpz-Cz, Pz-Oz 단일 채널 EEG  
- **Data Format:** JSON (타입 정의: src/types/sleep.ts 참고)

--------------------------------------------

## 👥 Contributors
- Frontend Developer: (정명성 / GitHub: Watchiiee)

