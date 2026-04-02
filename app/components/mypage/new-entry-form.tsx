"use client";

import { useState } from "react";
import StarRating from "./star-rating";

export default function NewEntryForm() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      {/* Sake Name */}
      <div className="flex flex-col gap-2 md:gap-3">
        <label className="font-body font-medium text-sm md:font-bold text-text-secondary md:text-accent tracking-wide">
          日本酒の名前 <span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          placeholder="例: 獺祭 純米大吟醸45"
          className="w-full bg-surface border border-border md:border-border/30 rounded-lg md:rounded-[32px] px-4 md:px-5 py-4 md:py-5 text-sm md:text-base font-body text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Brewery */}
      <div className="flex flex-col gap-2 md:gap-3">
        <label className="font-body font-medium text-sm md:font-bold text-text-secondary md:text-accent tracking-wide">
          醸造所
        </label>
        <input
          type="text"
          placeholder="例: 旭酒造"
          className="w-full bg-surface border border-border md:border-border/30 rounded-lg md:rounded-[32px] px-4 md:px-5 py-4 md:py-5 text-sm md:text-base font-body text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Photo Upload */}
      <div className="flex flex-col gap-2 md:gap-3">
        <label className="font-body font-medium text-sm md:font-bold text-text-secondary md:text-accent tracking-wide">
          写真
        </label>
        <button
          type="button"
          className="w-full bg-surface-raised/50 border-2 border-dashed border-border md:border-border/40 rounded-2xl md:rounded-[48px] py-16 md:py-20 flex flex-col items-center justify-center gap-2 hover:border-accent/30 transition-colors"
        >
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary">
            <rect x="1" y="3" width="22" height="18" rx="3" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17" cy="7" r="1" fill="currentColor" />
          </svg>
          <span className="text-sm text-text-secondary font-body">写真を追加</span>
        </button>
      </div>

      {/* Tasting Notes */}
      <div className="flex flex-col gap-2 md:gap-3">
        <label className="font-body font-medium text-sm md:font-bold text-text-secondary md:text-accent tracking-wide">
          テイスティングノート &amp; 思い出 <span className="text-red-700">*</span>
        </label>
        <textarea
          placeholder="例: フルーティーで軽やか。渋谷の屋上居酒屋で同僚と"
          rows={4}
          className="w-full bg-surface border border-border md:border-border/30 rounded-lg md:rounded-[32px] px-4 md:px-5 py-4 md:py-5 text-sm md:text-base font-body text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {/* Date + Rating row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {/* Date */}
        <div className="flex flex-col gap-2 md:gap-3">
          <label className="font-body font-medium text-sm md:font-bold text-text-secondary md:text-accent tracking-wide">
            日付 <span className="text-red-700">*</span>
          </label>
          <input
            type="date"
            className="w-full bg-surface border border-border md:border-border/30 rounded-lg md:rounded-[32px] px-4 md:px-5 py-4 md:py-5 text-sm md:text-base font-body text-text-primary focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-2 md:gap-3">
          <label className="font-body font-medium text-sm md:font-bold text-text-secondary md:text-accent tracking-wide">
            評価
          </label>
          <div className="flex items-center h-[52px] md:h-16">
            <StarRating rating={rating} size="md" interactive onChange={setRating} />
          </div>
        </div>
      </div>

      {/* Submit - Desktop */}
      <div className="hidden md:flex justify-center pt-8">
        <button
          type="submit"
          className="px-16 py-5 bg-accent text-white font-body font-bold text-lg rounded-full shadow-[0_20px_25px_-5px_rgba(20,36,80,0.1)] hover:bg-accent-hover transition-colors"
        >
          保存する
        </button>
      </div>
    </div>
  );
}
