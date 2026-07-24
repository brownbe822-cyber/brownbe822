"use client";

import { useState } from "react";
import { Play, Save, CheckCircle } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

export default function SieveOfEratosthenes() {
  const [maxNumber, setMaxNumber] = useState<number>(100);
  const [primes, setPrimes] = useState<number[]>([]);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // 에라토스테네스의 체 계산 로직
  const calculatePrimes = async () => {
    setIsCalculating(true);
    setSaveStatus("idle");
    setPrimes([]);

    // 잠시 UI 업데이트를 위해 딜레이 추가 (애니메이션 효과처럼 보이기 위함)
    await new Promise((resolve) => setTimeout(resolve, 300));

    const sieve = new Array(maxNumber + 1).fill(true);
    sieve[0] = false;
    sieve[1] = false;

    for (let p = 2; p * p <= maxNumber; p++) {
      if (sieve[p]) {
        for (let i = p * p; i <= maxNumber; i += p) {
          sieve[i] = false;
        }
      }
    }

    const calculatedPrimes = [];
    for (let p = 2; p <= maxNumber; p++) {
      if (sieve[p]) {
        calculatedPrimes.push(p);
      }
    }

    setPrimes(calculatedPrimes);
    setIsCalculating(false);
  };

  // Supabase에 결과 저장
  const saveToSupabase = async () => {
    if (primes.length === 0) return;

    setIsSaving(true);
    setSaveStatus("idle");

    const { error } = await getSupabase()
      .from("sieve_results")
      .insert([
        {
          max_number: maxNumber,
          prime_count: primes.length,
          primes_array: primes,
        },
      ]);

    if (error) {
      console.error("저장 중 에러 발생:", error);
      setSaveStatus("error");
    } else {
      setSaveStatus("success");
    }

    setIsSaving(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-sm border border-gray-100 mt-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">에라토스테네스의 체</h3>
        <p className="text-gray-500">입력한 숫자까지의 소수(Prime Numbers)를 찾습니다.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10">
        <div className="flex items-center gap-3">
          <label htmlFor="maxNumber" className="text-gray-700 font-medium">최대 숫자 (N):</label>
          <input
            id="maxNumber"
            type="number"
            min="2"
            max="1000"
            value={maxNumber}
            onChange={(e) => setMaxNumber(Number(e.target.value))}
            className="w-24 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-center"
          />
        </div>

        <button
          onClick={calculatePrimes}
          disabled={isCalculating}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm transition-all disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          {isCalculating ? "계산 중..." : "소수 찾기"}
        </button>

        {primes.length > 0 && (
          <button
            onClick={saveToSupabase}
            disabled={isSaving || saveStatus === "success"}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium shadow-sm transition-all ${
              saveStatus === "success" 
                ? "bg-green-100 text-green-700" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {saveStatus === "success" ? (
              <>
                <CheckCircle className="w-4 h-4" />
                저장 완료
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isSaving ? "저장 중..." : "Supabase에 저장"}
              </>
            )}
          </button>
        )}
      </div>

      {saveStatus === "error" && (
        <div className="text-red-500 text-sm text-center mb-6">
          데이터베이스 저장에 실패했습니다. 환경변수와 테이블 설정을 확인해주세요.
        </div>
      )}

      {/* 결과 표시 영역 */}
      {primes.length > 0 && (
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-700">
              찾아낸 소수 <span className="text-blue-500 font-semibold">{primes.length}</span>개
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {primes.map((prime) => (
              <span
                key={prime}
                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-700 font-medium shadow-sm"
              >
                {prime}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
