import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, CheckCircle2, ThermometerSun, BrainCircuit } from 'lucide-react';
import { COACHING_DATA, type ChatMessage } from '../mocks/mockCoachData';

const Coach = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(COACHING_DATA.initialChat);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // 메시지 전송 핸들러
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // 1. 유저 메시지 추가
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // 2. AI 응답 시뮬레이션 (1.5초 딜레이)
    setTimeout(() => {
      const aiResponseText = getAIResponse(inputText);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  // 간단한 키워드 기반 응답 로직 (Mock AI)
  const getAIResponse = (input: string): string => {
    if (input.includes('깊은 잠') || input.includes('N3')) {
      return "깊은 잠(N3)은 신체 회복에 필수적입니다. 어제 데이터에서는 델타파 비중이 낮았습니다. 낮 동안의 신체 활동량을 늘리면 도움이 될 수 있습니다.";
    }
    if (input.includes('꿈') || input.includes('REM')) {
      return "REM 수면은 기억력 강화와 감정 처리에 중요합니다. 현재 REM 비율은 22%로 매우 적절한 수준입니다.";
    }
    return "제가 이해하기 어려운 질문이네요. 수면 단계나 수면 습관에 대해 질문해 주시면 데이터를 기반으로 답변해 드릴게요.";
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col md:flex-row gap-6 pb-6">
      
      {/* 1. 좌측: AI 진단 대시보드 */}
      <section className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        <header>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-indigo-600" />
            AI Sleep Doctor
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            CNN-LSTM 모델이 분석한 개인 맞춤형 처방전입니다.
          </p>
        </header>

        {/* 종합 진단 카드 */}
        <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800 mb-1">{COACHING_DATA.diagnosis.title}</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {COACHING_DATA.diagnosis.summary}
              </p>
            </div>
          </div>
        </div>

        {/* 상세 처방 리스트 */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900">상세 개선 가이드</h3>
          {COACHING_DATA.prescriptions.map((item) => (
            <div key={item.id} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:border-indigo-100 transition">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 text-xs font-bold rounded ${item.impact === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
                  {item.impact} Impact
                </span>
                <span className="text-xs text-slate-400 font-medium">{item.category}</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-1">{item.issue}</h4>
              <p className="text-sm text-slate-500 mb-3">원인: {item.cause}</p>
              
              <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-xl text-indigo-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                {item.solution}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 우측: AI 채팅 인터페이스 */}
      <section className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col overflow-hidden h-full">
        {/* 채팅 헤더 */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Sleep Care AI</h3>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online • Data Linked
            </p>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-slate-200' : 'bg-indigo-600 text-white'}`}>
                {msg.sender === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-slate-400' : 'text-slate-300'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* 입력 영역 */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="수면 패턴에 대해 궁금한 점을 물어보세요..."
              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
            />
            <button 
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Coach;