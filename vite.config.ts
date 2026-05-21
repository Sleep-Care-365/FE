import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        id: "/", // 💡 로그에 찍힌 ID 미지정 경고 해결
        start_url: "/", // 앱 시작 경로 보장
        name: "Sleep Care 365",
        short_name: "SleepCare365",
        description: "AI 기반 개인 맞춤형 수면 웰니스 솔루션",
        theme_color: "#1e1b4b",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",

        icons: [
          {
            src: "moon-icon.png",
            sizes: "192x192", // 512 이미지를 192 크기로도 사용하겠다고 선언
            type: "image/png",
          },
          {
            src: "moon-icon.png",
            sizes: "512x512", // 실제 물리적 크기와 일치해야 함
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
