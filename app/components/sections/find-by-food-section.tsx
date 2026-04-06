import Button from "@/app/components/ui/button";
import SectionHeading from "@/app/components/ui/section-heading";

const categories = ["焼き物", "刺身", "揚げ物", "鍋物"];

export default function FindByFoodSection() {
  return (
    <section className="bg-surface-raised px-6 py-16 md:px-12 md:py-32">
      <div className="max-w-[1184px] mx-auto flex flex-col gap-10 md:gap-16 items-start md:items-center">
        <SectionHeading title="料理から探す" align="center" />

        <div className="flex flex-wrap gap-3 md:gap-6 md:justify-center">
          {categories.map((cat) => (
            <Button key={cat} variant="ghost" size="sm" className="bg-accent-light border-0 text-accent font-bold text-sm md:text-lg md:px-12 md:py-5">
              {cat}
            </Button>
          ))}
          {/* More icon button */}
          <button aria-label="もっと見る" className="inline-flex items-center justify-center w-[59px] h-9 md:w-auto md:h-auto md:px-12 md:py-5 rounded-full bg-accent-light text-accent hover:bg-accent/10 transition-colors cursor-pointer">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              className="md:w-4 md:h-4"
            >
              <path
                d="M11.5 1.5L3.5 8L11.5 14.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(180 7.5 8)"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
