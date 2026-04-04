import Link from "next/link";
import { getAllSakeIds, getSakeDetail } from "@/app/lib/mock-sake-detail";

export default function EncyclopediaPage() {
  const ids = getAllSakeIds();
  const sakes = ids.map((id) => getSakeDetail(id)!);

  return (
    <div className="px-6 md:px-8 pt-8 md:pt-16 pb-24 md:pb-20 max-w-[1536px] mx-auto">
      <div className="flex flex-col gap-2 mb-10 md:mb-16">
        <span className="font-body font-bold text-xs text-accent/60 tracking-[2.4px] uppercase">
          Sake Encyclopedia
        </span>
        <h1 className="font-display font-bold text-[28px] md:text-[72px] md:leading-[72px] md:tracking-[-3.6px] text-accent">
          日本酒図鑑
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {sakes.map((sake) => (
          <Link
            key={sake.id}
            href={`/encyclopedia/${sake.id}`}
            className="group bg-surface border border-border rounded-[48px] overflow-hidden hover:border-accent transition-colors"
          >
            <div className="bg-surface-raised m-4 rounded-[32px] overflow-hidden">
              <div className="h-[240px] md:h-[300px] flex items-center justify-center">
                <span className="text-5xl group-hover:scale-110 transition-transform">
                  🍶
                </span>
              </div>
            </div>
            <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
              <div className="flex gap-2">
                {sake.servingTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-0.5 text-[10px] font-body font-bold tracking-[1px] uppercase rounded-full border border-accent text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-display font-bold text-xl text-accent">
                {sake.name}
              </h2>
              <p className="font-body text-sm text-text-secondary">
                {sake.brewery} / {sake.region}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
