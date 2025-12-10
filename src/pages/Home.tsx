import { Link } from 'react-router-dom';
import { UploadCloud, BarChart2, BrainCircuit, Calendar, ChevronRight } from 'lucide-react';
import moonImg from '../assets/moon-icon.jpg';

const Home = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section: 배경 그라데이션 추가로 꽉 찬 느낌 */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-3xl p-8 md:p-12 overflow-hidden shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          
          {/* 텍스트 영역 */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-2">
              💤 AI 기반 수면 케어 솔루션
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              당신의 꿀잠, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                데이터
              </span>로 시작하세요
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
              오늘 밤 수면이 궁금하신가요? <br />
              웨어러블 데이터를 업로드하고 <strong>AI 코칭</strong>을 받아보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link 
                to="/upload" 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 hover:-translate-y-1"
              >
                <UploadCloud className="w-5 h-5" />
                분석 시작하기
              </Link>
              <Link 
                to="/report" 
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition hover:-translate-y-1"
              >
                지난 리포트
              </Link>
            </div>
          </div>

          {/* 이미지 영역: 부드러운 그림자와 둥둥 떠있는 효과 */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img 
                src={moonImg} 
                alt="Sleep Care Moon" 
                className="relative w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl animate-[bounce_3s_infinite]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Grid: 카드 디자인 강화 */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">주요 기능</h2>
          <span className="text-sm text-slate-500">Sleep Care 365 서비스</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard 
            to="/upload"
            icon={<UploadCloud className="w-6 h-6 text-white" />}
            iconBg="bg-blue-500"
            title="데이터 업로드"
            desc="EEG 및 웨어러블 파일을 업로드하면 AI가 수면 단계를 분석합니다."
          />
          <FeatureCard 
            to="/report"
            icon={<BarChart2 className="w-6 h-6 text-white" />}
            iconBg="bg-indigo-500"
            title="수면 리포트"
            desc="REM 수면, 깊은 수면 비율을 시각화된 그래프로 확인하세요."
          />
          <FeatureCard 
            to="/coach"
            icon={<BrainCircuit className="w-6 h-6 text-white" />}
            iconBg="bg-emerald-500"
            title="AI 수면 코치"
            desc="나의 수면 패턴에 맞는 맞춤형 개선 가이드를 받아보세요."
          />
          <FeatureCard 
            to="/pattern"
            icon={<Calendar className="w-6 h-6 text-white" />}
            iconBg="bg-orange-500"
            title="수면 패턴 관리"
            desc="주간/월간 데이터를 통해 장기적인 수면 변화를 추적합니다."
          />
        </div>
      </section>
    </div>
  );
};

// 카드 컴포넌트 디자인 강화
const FeatureCard = ({ to, icon, iconBg, title, desc }: any) => (
  <Link 
    to={to} 
    className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
  >
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-xl shadow-md ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </Link>
);

export default Home;