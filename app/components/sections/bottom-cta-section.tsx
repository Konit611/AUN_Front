import Button from "@/app/components/ui/button";

export default function BottomCTASection() {
  return (
    <section className="mx-6 mb-6 md:mx-0 md:mb-0 rounded-3xl md:rounded-none bg-accent-light px-8 py-10 md:px-12 md:py-32">
      <div className="max-w-[672px] mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
        <h2 className="font-display font-bold text-xl md:text-[48px] md:leading-[1] text-accent">
          あなたにぴったりの
          <br />
          ペアリングを知りたい？
        </h2>

        <p className="hidden md:block font-body text-lg text-accent/70 leading-relaxed">
          簡単な質問に答えるだけで、
          <br />
          あなたの好みや今日の気分に合わせた最適な日本酒をAIがセレクトします。
        </p>

        <Button variant="primary" size="lg" href="/diagnosis" className="md:px-12 md:py-6 md:text-xl">
          タイプ診断をする
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="ml-1"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </section>
  );
}
