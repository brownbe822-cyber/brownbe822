import { PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-grow flex items-center justify-center p-6 md:p-12">
      {/* 
        Hero Section 
        - Apple 스타일의 넓은 여백과 부드러운 그림자, 둥근 모서리 적용
        - glassmorphism 효과 (배경이 살짝 비치는 반투명)
      */}
      <section className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 md:p-16 max-w-3xl w-full text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
          나만의 교육용 웹앱 만들기
        </h2>
        
        <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-xl mx-auto">
          선생님과 학생들을 위한 깔끔하고 세련된 웹 서비스입니다. 
          이 뼈대 코드 위에 자유롭게 새로운 기능들을 추가해 보세요.
        </p>

        <div className="flex justify-center">
          {/* 
            가짜(Placeholder) 버튼
            - 호버 시 약간 커지면서 그림자가 짙어지는 마이크로 인터랙션
          */}
          <button 
            type="button"
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium text-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-5 h-5" />
            새로운 기능 추가하기
          </button>
        </div>
      </section>
    </div>
  );
}
