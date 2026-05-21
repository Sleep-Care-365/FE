import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// 💥 PWA 서비스 워커 등록을 위한 가상 모듈 임포트
import { registerSW } from "virtual:pwa-register";

// 💥 앱 구동 시 서비스 워커 즉시 실행 (바탕화면 설치 및 오프라인 작동 활성화)
registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
