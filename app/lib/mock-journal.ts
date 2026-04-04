/** 4축 프로필 (0~100, 50이 중간) */
export interface SakeProfile {
  /** S(0) Sweet 甘口 ←→ D(100) Dry 辛口 */
  sweetDry: number;
  /** H(0) Heavy 重厚 ←→ E(100) Easy 軽快 */
  heavyLight: number;
  /** R(0) Rich 華やか ←→ L(100) Low-key 穏やか */
  richCalm: number;
  /** B(0) Bold 力強い ←→ S(100) Smooth 滑らか */
  boldSmooth: number;
}

export interface TastingNote {
  profile: SakeProfile;
  aroma: string;
  taste: string;
  finish: string;
  temperature: string;
  pairing?: string;
  memo?: string;
}

export interface JournalEntry {
  id: string;
  sakeName: string;
  brewery?: string;
  category?: string;
  date: string;
  rating: number;
  tasting: TastingNote;
  imagePath?: string;
}

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    sakeName: "獺祭 純米大吟醸45",
    brewery: "旭酒造",
    category: "純米大吟醸",
    date: "2026.03.28",
    rating: 5,
    tasting: {
      profile: { sweetDry: 20, heavyLight: 70, richCalm: 15, boldSmooth: 65 },
      aroma: "メロン、白桃、ほのかな花の香り",
      taste: "滑らかで透明感のある甘み、軽い酸味",
      finish: "すっきりと長い余韻",
      temperature: "冷酒 10°C",
      pairing: "白身魚の刺身",
      memo: "開栓してすぐが一番華やか。",
    },
    imagePath: "/images/journal/sake-1.jpg",
  },
  {
    id: "2",
    sakeName: "久保田 萬寿",
    brewery: "朝日酒造",
    category: "純米大吟醸",
    date: "2026.03.25",
    rating: 4,
    tasting: {
      profile: { sweetDry: 55, heavyLight: 30, richCalm: 40, boldSmooth: 45 },
      aroma: "青りんご、洋梨、穏やかな吟醸香",
      taste: "まろやかなコク、ふくよかな旨味",
      finish: "キレが良くすっきり",
      temperature: "冷酒 12°C",
      pairing: "昆布締め",
    },
    imagePath: "/images/journal/sake-2.jpg",
  },
  {
    id: "3",
    sakeName: "新政 No.6 S-type",
    brewery: "新政酒造",
    category: "純米",
    date: "2026.03.20",
    rating: 5,
    tasting: {
      profile: { sweetDry: 35, heavyLight: 80, richCalm: 25, boldSmooth: 75 },
      aroma: "白ぶどう、ヨーグルトのような乳酸香",
      taste: "シャープな酸味、軽やかな甘み",
      finish: "ドライで切れ味鋭い",
      temperature: "冷酒 8°C",
      pairing: "牡蠣のポン酢",
      memo: "ワイン好きにも薦めたい一本。",
    },
    imagePath: "/images/journal/sake-3.jpg",
  },
  {
    id: "4",
    sakeName: "醸し人九平次 希望の月",
    brewery: "萬乗醸造",
    category: "純米大吟醸",
    date: "2026.03.15",
    rating: 4,
    tasting: {
      profile: { sweetDry: 60, heavyLight: 35, richCalm: 20, boldSmooth: 40 },
      aroma: "柑橘、ハーブ、ミネラル感",
      taste: "立体的な旨味、奥行きのある酸",
      finish: "エレガントで長い",
      temperature: "常温 15°C",
      pairing: "鶏の塩焼き",
    },
    imagePath: "/images/journal/sake-4.jpg",
  },
  {
    id: "5",
    sakeName: "黒龍 大吟醸",
    brewery: "黒龍酒造",
    category: "大吟醸",
    date: "2026.01.20",
    rating: 3,
    tasting: {
      profile: { sweetDry: 45, heavyLight: 55, richCalm: 60, boldSmooth: 80 },
      aroma: "バナナ、バニラ、控えめな花の香り",
      taste: "なめらかで柔らかい口当たり",
      finish: "穏やかに消えていく",
      temperature: "冷酒 10°C",
    },
    imagePath: "/images/journal/sake-5.jpg",
  },
  {
    id: "6",
    sakeName: "鍋島 New Moon",
    brewery: "富久千代酒造",
    category: "純米吟醸",
    date: "2026.01.05",
    rating: 5,
    tasting: {
      profile: { sweetDry: 25, heavyLight: 85, richCalm: 10, boldSmooth: 70 },
      aroma: "ライチ、マスカット、微かな発泡感",
      taste: "ジューシーな甘酸っぱさ、弾ける果実味",
      finish: "爽やかでフレッシュ",
      temperature: "冷酒 5°C",
      pairing: "生春巻き",
      memo: "開けたてのガス感が最高。",
    },
    imagePath: "/images/journal/sake-6.jpg",
  },
];

export function getJournalEntry(id: string): JournalEntry | undefined {
  return mockJournalEntries.find((e) => e.id === id);
}
