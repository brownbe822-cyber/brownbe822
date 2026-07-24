import SieveOfEratosthenes from "@/components/SieveOfEratosthenes";
import MathChatbot from "@/components/MathChatbot";

export default function Home() {
  return (
    <div className="flex-grow p-6 md:p-12">
      {/* 
        Hero Section 
        - Apple 스타일의 넓은 여백과 부드러운 그림자, 둥근 모서리 적용
        - glassmorphism 효과 (배경이 살짝 비치는 반투명)
      */}
      <section className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 md:p-16 max-w-4xl w-full mx-auto text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
          매쓰온(Math-On)
        </h2>
        
        <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-xl mx-auto">
          선생님과 학생들을 위한 깔끔하고 세련된 웹 서비스입니다. 
          아래의 기능들을 자유롭게 테스트해 보세요.
        </p>

        {/* 에라토스테네스의 체 컴포넌트 */}
        <SieveOfEratosthenes />
      </section>

      {/* 수학 AI 챗봇 */}
      <section className="max-w-4xl w-full mx-auto mt-10">
        <MathChatbot />
      </section>
    </div>
  );
}
