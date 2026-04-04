"use client";

import { useState } from "react";
import StarRating from "./star-rating";

const profileAxes = [
  { key: "sweetDry", labels: ["甘口", "辛口"] },
  { key: "heavyLight", labels: ["重厚", "軽快"] },
  { key: "richCalm", labels: ["華やか", "穏やか"] },
  { key: "boldSmooth", labels: ["力強い", "滑らか"] },
] as const;

function inputClass(rounded: "lg" | "pill" = "lg") {
  return `w-full bg-surface border border-border md:border-border/30 ${
    rounded === "pill" ? "rounded-lg md:rounded-[32px]" : "rounded-lg md:rounded-[32px]"
  } px-4 md:px-5 py-4 md:py-5 text-sm md:text-base font-body text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent transition-colors`;
}

function labelClass() {
  return "font-body font-medium text-sm md:font-bold text-text-secondary md:text-accent tracking-wide";
}

export default function NewEntryForm() {
  const [rating, setRating] = useState(0);
  const [profile, setProfile] = useState({
    sweetDry: 50,
    heavyLight: 50,
    richCalm: 50,
    boldSmooth: 50,
  });

  const updateAxis = (key: string, value: number) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-6 md:gap-12">
      {/* Sake Name */}
      <div className="flex flex-col gap-2 md:gap-3">
        <label className={labelClass()}>
          日本酒の名前 <span className="text-red-700">*</span>
        </label>
        <input type="text" placeholder="例: 獺祭 純米大吟醸45" className={inputClass()} />
      </div>

      {/* Brewery */}
      <div className="flex flex-col gap-2 md:gap-3">
        <label className={labelClass()}>醸造所</label>
        <input type="text" placeholder="例: 旭酒造" className={inputClass()} />
      </div>

      {/* Photo Upload */}
      <div className="flex flex-col gap-2 md:gap-3">
        <label className={labelClass()}>写真</label>
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

      {/* Sake Profile — 4 Axes */}
      <div className="flex flex-col gap-2 md:gap-3">
        <label className={labelClass()}>
          味わいプロフィール <span className="text-red-700">*</span>
        </label>
        <div className="bg-surface border border-border md:border-border/30 rounded-2xl md:rounded-[32px] p-5 md:p-6 flex flex-col gap-5">
          {profileAxes.map((axis) => (
            <div key={axis.key} className="flex items-center gap-3">
              <span className="font-body font-bold text-xs text-accent w-14 text-right shrink-0">
                {axis.labels[0]}
              </span>
              <div className="flex-1 relative flex items-center">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={profile[axis.key]}
                  onChange={(e) => updateAxis(axis.key, Number(e.target.value))}
                  className="w-full h-6 appearance-none bg-transparent cursor-pointer
                    [&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:bg-border [&::-webkit-slider-runnable-track]:rounded-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:shadow-sm
                    [&::-moz-range-track]:h-[2px] [&::-moz-range-track]:bg-border [&::-moz-range-track]:rounded-full
                    [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-sm"
                />
                {/* Center tick */}
                <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-2 bg-border pointer-events-none" />
              </div>
              <span className="font-body font-bold text-xs text-accent w-14 shrink-0">
                {axis.labels[1]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tasting Fields */}
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col gap-2 md:gap-3">
          <label className={labelClass()}>香り</label>
          <input type="text" placeholder="例: メロン、白桃、ほのかな花の香り" className={inputClass()} />
        </div>
        <div className="flex flex-col gap-2 md:gap-3">
          <label className={labelClass()}>味わい</label>
          <input type="text" placeholder="例: 滑らかで透明感のある甘み" className={inputClass()} />
        </div>
        <div className="flex flex-col gap-2 md:gap-3">
          <label className={labelClass()}>余韻</label>
          <input type="text" placeholder="例: すっきりと長い余韻" className={inputClass()} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="flex flex-col gap-2 md:gap-3">
            <label className={labelClass()}>飲んだ温度</label>
            <input type="text" placeholder="例: 冷酒 10°C" className={inputClass()} />
          </div>
          <div className="flex flex-col gap-2 md:gap-3">
            <label className={labelClass()}>合わせた料理</label>
            <input type="text" placeholder="例: 白身魚の刺身" className={inputClass()} />
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-3">
          <label className={labelClass()}>メモ</label>
          <textarea
            placeholder="例: 開栓してすぐが一番華やか。友達にも薦めたい。"
            rows={3}
            className={`${inputClass()} resize-none`}
          />
        </div>
      </div>

      {/* Date + Rating row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div className="flex flex-col gap-2 md:gap-3">
          <label className={labelClass()}>
            日付 <span className="text-red-700">*</span>
          </label>
          <input type="date" className={inputClass()} />
        </div>
        <div className="flex flex-col gap-2 md:gap-3">
          <label className={labelClass()}>評価</label>
          <div className="flex items-center h-[52px] md:h-16">
            <StarRating rating={rating} size="md" interactive onChange={setRating} />
          </div>
        </div>
      </div>

      {/* Submit - Desktop */}
      <div className="hidden md:flex justify-center pt-8">
        <button
          type="submit"
          className="px-16 py-5 bg-accent text-white font-body font-bold text-lg rounded-full shadow-[0_20px_25px_-5px_rgba(20,36,80,0.1)] hover:bg-accent-hover transition-colors cursor-pointer"
        >
          保存する
        </button>
      </div>
    </div>
  );
}
