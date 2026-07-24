import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase 클라이언트를 즉시 생성하지 않고, 실제 호출 시점에 생성합니다.
// 이렇게 하면 Vercel 빌드(정적 페이지 생성) 단계에서 환경변수가 없어도 에러가 발생하지 않습니다.
let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase URL 또는 Anon Key가 설정되지 않았습니다. ' +
      'Vercel 대시보드 → Settings → Environment Variables 에서 ' +
      'NEXT_PUBLIC_SUPABASE_URL 과 NEXT_PUBLIC_SUPABASE_ANON_KEY 를 추가해주세요.'
    );
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}
