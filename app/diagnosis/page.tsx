"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { calculatePersonaCode } from "@/app/lib/persona";
import QuizHeader from "@/app/components/quiz/quiz-header";
import QuizProgress from "@/app/components/quiz/quiz-progress";
import QuizChoiceButton from "@/app/components/quiz/quiz-choice-button";
import QuizChoiceCard from "@/app/components/quiz/quiz-choice-card";
import QuizNavigationDots from "@/app/components/quiz/quiz-navigation-dots";

interface QuizChoice {
  id: string;
  text: string;
  image?: string;
}

interface QuizQuestion {
  id: number;
  text: string;
  choices: QuizChoice[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    text: "まず、あなたの好きな\n味覚の傾向は？",
    choices: [
      { id: "a", text: "甘いものが好き。デザートは別腹。" },
      { id: "b", text: "辛口・さっぱり派。キレのある味が好き。" },
    ],
  },
  {
    id: 2,
    text: "食事のとき、\nどんな飲み物を選ぶ？",
    choices: [
      { id: "a", text: "味がしっかりした飲み物。コクがあるのが好き。" },
      { id: "b", text: "さらっと軽い飲み物。水やお茶が多い。" },
    ],
  },
  {
    id: 3,
    text: "友達との飲み会で、\nどんなお酒を選びますか？",
    choices: [
      { id: "a", text: "まずはビールかハイボール！定番で盛り上がる。" },
      { id: "b", text: "その時の気分で日本酒やワインなど、じっくり選ぶ。" },
    ],
  },
  {
    id: 4,
    text: "旅行先での食事、\n何を重視する？",
    choices: [
      { id: "a", text: "地元の名物を食べたい！その土地ならではの味。" },
      { id: "b", text: "雰囲気の良いお店で、ゆっくり楽しみたい。" },
    ],
  },
  {
    id: 5,
    text: "休日の過ごし方、\nどちらが近い？",
    choices: [
      { id: "a", text: "友達と出かけてワイワイ。アクティブに過ごす。" },
      { id: "b", text: "家でゆっくり。本や映画を楽しむ。" },
    ],
  },
  {
    id: 6,
    text: "料理をするとき、\nどんなスタイル？",
    choices: [
      { id: "a", text: "レシピ通りにきっちり作る。分量は正確に。" },
      { id: "b", text: "感覚で作る。冷蔵庫にあるもので即興料理。" },
    ],
  },
  {
    id: 7,
    text: "お気に入りの季節は？",
    choices: [
      { id: "a", text: "春か秋。穏やかな気候が心地いい。" },
      { id: "b", text: "夏か冬。はっきりした季節感が好き。" },
    ],
  },
  {
    id: 8,
    text: "日本酒のイメージ、\n正直どう思う？",
    choices: [
      { id: "a", text: "ちょっと難しそう。でも興味はある。" },
      { id: "b", text: "好き！もっと詳しくなりたい。" },
    ],
  },
];

export default function DiagnosisPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [transitioning, setTransitioning] = useState(false);

  const question = questions[currentIndex];
  const total = questions.length;
  const selectedAnswer = answers[question.id];

  const handleSelect = useCallback(
    (choiceId: string) => {
      if (transitioning) return;
      setAnswers((prev) => ({ ...prev, [question.id]: choiceId }));
      setTransitioning(true);

      setTimeout(() => {
        if (currentIndex < total - 1) {
          setDirection("next");
          setCurrentIndex((prev) => prev + 1);
        } else {
          const finalAnswers = { ...answers, [question.id]: choiceId };
          const code = calculatePersonaCode(finalAnswers);
          router.push(`/result/${code}`);
        }
        setTransitioning(false);
      }, 400);
    },
    [currentIndex, total, question.id, transitioning],
  );

  const handleClose = useCallback(() => {
    router.push("/");
  }, [router]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection("prev");
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  return (
    <>
      {/* Mobile: full-screen overlay */}
      <div className="md:hidden fixed inset-0 z-[60] bg-bg flex flex-col">
        <QuizHeader onClose={handleClose} />

        <div className="flex-1 flex flex-col px-6 overflow-y-auto">
          <QuizProgress current={currentIndex + 1} total={total} />

          <div className="flex-1 flex flex-col items-center pt-20">
            {/* Question */}
            <h1
              key={`mobile-q-${question.id}-${direction}`}
              className="font-body font-bold text-2xl text-text-primary text-center tracking-[-0.6px] leading-[33px] whitespace-pre-line animate-slide-in"
            >
              {question.text}
            </h1>

            {/* Choices */}
            <div
              key={`mobile-c-${question.id}-${direction}`}
              className="w-full flex flex-col gap-4 mt-16 animate-slide-in"
            >
              {question.choices.map((choice) => (
                <QuizChoiceButton
                  key={choice.id}
                  text={choice.text}
                  selected={selectedAnswer === choice.id}
                  onClick={() => handleSelect(choice.id)}
                />
              ))}
            </div>

            {/* Back button (mobile) */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="mt-10 mb-6 flex items-center gap-3 px-8 py-3 rounded-full border-2 border-text-primary font-body font-bold text-base tracking-[-0.9px] text-text-primary cursor-pointer hover:border-accent hover:text-accent transition-colors duration-200"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M8 2L3 6.5L8 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                戻る
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PC: normal layout */}
      <div className="hidden md:flex flex-col items-center px-6 py-16 max-w-[1024px] mx-auto">
        {/* Counter */}
        <p
          key={`pc-counter-${question.id}`}
          className="font-display font-bold text-2xl tracking-[-1.2px] text-accent mb-8 animate-slide-in"
        >
          {currentIndex + 1} / {total}
        </p>

        {/* Question */}
        <h1
          key={`pc-q-${question.id}-${direction}`}
          className="font-display font-bold text-[60px] text-text-primary text-center tracking-[-1.5px] leading-[60px] whitespace-pre-line mb-20 animate-slide-in"
        >
          {question.text}
        </h1>

        {/* Choice cards */}
        <div
          key={`pc-c-${question.id}-${direction}`}
          className="grid grid-cols-2 gap-8 w-full max-w-[896px] animate-slide-in"
        >
          {question.choices.map((choice) => (
            <QuizChoiceCard
              key={choice.id}
              text={choice.text}
              image={choice.image}
              selected={selectedAnswer === choice.id}
              onClick={() => handleSelect(choice.id)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center gap-12 mt-24 w-80">
          <QuizNavigationDots total={total} current={currentIndex + 1} />

          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="flex items-center gap-4 px-[50px] py-[18px] rounded-full border-2 border-text-primary font-body font-bold text-lg tracking-[-0.9px] text-text-primary cursor-pointer hover:border-accent hover:text-accent transition-colors duration-200"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M8 2L3 6.5L8 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              戻る
            </button>
          )}
        </div>
      </div>
    </>
  );
}
