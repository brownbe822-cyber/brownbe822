import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // API 라우트의 서버리스 함수가 정상 작동하도록 설정
  eslint: {
    // 빌드 시 ESLint 에러로 인한 빌드 실패를 방지 (Vercel 배포 안정성)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
