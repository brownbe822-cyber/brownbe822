import { NextRequest, NextResponse } from "next/server";

// OpenAI API를 호출하는 서버사이드 라우트 핸들러
// OPENAI_API_KEY는 서버에서만 접근 가능한 환경변수로, 클라이언트에 노출되지 않습니다.
export async function POST(req: NextRequest) {
  const { message } = await req.json() as { message: string };

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenAI API 키가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "너는 중학생을 위한 친절하고 유능한 수학 선생님이야. " +
              "학생의 수학 질문에 쉽고 자세하게 단계별로 답변해줘. " +
              "수식은 가능한 한 읽기 쉽게 텍스트로 표현해줘. " +
              "답변은 항상 한국어로 해줘. " +
              "수학과 관련 없는 질문에는 '수학 관련 질문만 답변할 수 있어요!'라고 안내해줘.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "AI 응답 생성 중 오류가 발생했습니다." },
        { status: response.status }
      );
    }

    const reply: string = data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "AI 서버와 통신 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
