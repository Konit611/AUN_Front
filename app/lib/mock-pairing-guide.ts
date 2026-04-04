export interface PairingGuideItem {
  id: string;
  emoji: string;
  foodName: string;
  sakeName: string;
  temperature: string;
  season: string;
  description: string;
  foodImage: string;
  sakeImage: string;
}

export interface PairingCategory {
  slug: string;
  label: string;
  title: string;
  items: PairingGuideItem[];
}

const categories: PairingCategory[] = [
  {
    slug: "grilled",
    label: "焼き物",
    title: "焼き物のペアリング",
    items: [
      {
        id: "grilled-1",
        emoji: "🍢",
        foodName: "焼き鳥（タレ）",
        sakeName: "久保田 萬寿",
        temperature: "冷酒 5-10°C",
        season: "冬",
        description:
          "芳醇なコクのあるタレには、同じく深みのある萬寿を。甘辛い醤油の風味と、酒のまろやかな旨味が口の中で静かに重なり合います。",
        foodImage: "/images/pairing/yakitori-tare.jpg",
        sakeImage: "/images/pairing/kubota-manju.jpg",
      },
      {
        id: "grilled-2",
        emoji: "🐟",
        foodName: "塩焼き（鮭・鯖）",
        sakeName: "八海山 特別本醸造",
        temperature: "常温 15-20°C",
        season: "通年",
        description:
          "魚の脂をさっぱりと流す、キレのある辛口。素材本来の味を引き立てるこの組み合わせは、毎日の夕食を格上げする究極の定番です。",
        foodImage: "/images/pairing/shioyaki-salmon.jpg",
        sakeImage: "/images/pairing/hakkaisan.jpg",
      },
      {
        id: "grilled-3",
        emoji: "🥩",
        foodName: "牛の炙り焼き",
        sakeName: "獺祭 純米大吟醸 磨き三割九分",
        temperature: "ぬる燗 40°C",
        season: "冬",
        description:
          "和牛の甘みのある脂には、華やかな香りの獺祭を。少し温めることで酒の甘みが膨らみ、肉の濃厚な旨味と美しく調和します。",
        foodImage: "/images/pairing/wagyu-aburi.jpg",
        sakeImage: "/images/pairing/dassai.jpg",
      },
    ],
  },
  {
    slug: "sashimi",
    label: "刺身",
    title: "刺身のペアリング",
    items: [
      {
        id: "sashimi-1",
        emoji: "🐟",
        foodName: "まぐろの赤身",
        sakeName: "十四代 本丸",
        temperature: "冷酒 8-12°C",
        season: "通年",
        description:
          "まぐろの鉄分を含んだ旨味に、十四代のフルーティーな甘みがマッチ。赤身の力強さを優雅に包み込みます。",
        foodImage: "/images/pairing/maguro.jpg",
        sakeImage: "/images/pairing/juyondai.jpg",
      },
    ],
  },
  {
    slug: "nabe",
    label: "鍋物",
    title: "鍋物のペアリング",
    items: [
      {
        id: "nabe-1",
        emoji: "🫕",
        foodName: "もつ鍋",
        sakeName: "田酒 特別純米",
        temperature: "ぬる燗 40°C",
        season: "冬",
        description:
          "濃厚なもつの旨味を、田酒のしっかりとした米の味わいが受け止めます。温めた酒が体を芯から温めてくれます。",
        foodImage: "/images/pairing/motsunabe.jpg",
        sakeImage: "/images/pairing/denshu.jpg",
      },
    ],
  },
];

/** 시즌/조건 필터 (시간적 카테고리) */
const seasonFilters = [
  { key: "all", label: "すべて" },
  { key: "your-type", label: "あなたのタイプ" },
  { key: "winter", label: "冬", match: "冬" },
  { key: "year-round", label: "通年", match: "通年" },
];

/** 음식 카테고리 필터 */
const foodCategoryFilters = categories.map((c) => ({
  key: c.slug,
  label: c.label,
}));

export function getAllCategories(): PairingCategory[] {
  return categories;
}

export function getCategoryBySlug(slug: string): PairingCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSeasonFilters() {
  return seasonFilters;
}

export function getFoodCategoryFilters() {
  return foodCategoryFilters;
}

export function getAllPairings(): PairingGuideItem[] {
  return categories.flatMap((c) => c.items);
}
