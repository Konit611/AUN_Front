export interface SakeDetailPairing {
  emoji: string;
  foodName: string;
  description: string;
  imagePlaceholder: string;
}

export interface SakeDetail {
  id: string;
  name: string;
  brewery: string;
  region: string;
  description: string;
  type: string;
  rice: string;
  polishing: string;
  flavorTags: { label: string; primary: boolean }[];
  servingTags: string[];
  pairings: SakeDetailPairing[];
}

const MOCK_SAKE_DETAILS: Record<string, SakeDetail> = {
  "dassai-45": {
    id: "dassai-45",
    name: "獺祭 純米大吟醸45",
    brewery: "旭酒造",
    region: "山口県",
    description:
      "最高の「普通」を目指した、旭酒造のスタンダード。磨き45%の贅沢な造りでありながら、日常に寄り添う親しみやすさと、果実のような華やかな香りが調和した一品です。",
    type: "純米大吟醸",
    rice: "山田錦",
    polishing: "45%",
    flavorTags: [
      { label: "フルーティー", primary: true },
      { label: "華やか", primary: true },
      { label: "軽い", primary: false },
      { label: "甘口", primary: false },
    ],
    servingTags: ["冷酒 5-10°C", "通年"],
    pairings: [
      {
        emoji: "🍢",
        foodName: "焼き鳥（タレ）",
        description:
          "甘辛いタレのコクが、獺祭のフルーティーな甘みと絶妙に引き立て合います。",
        imagePlaceholder: "yakitori",
      },
      {
        emoji: "🐟",
        foodName: "旬の刺身",
        description:
          "白身魚や帆立など、繊細な甘みを持つ魚介との相性は抜群です。",
        imagePlaceholder: "sashimi",
      },
      {
        emoji: "🧀",
        foodName: "カマンベール",
        description:
          "クリーミーなチーズの質感が、大吟醸の滑らかな口当たりと優雅に重なります。",
        imagePlaceholder: "cheese",
      },
    ],
  },
};

export function getSakeDetail(id: string): SakeDetail | undefined {
  return MOCK_SAKE_DETAILS[id];
}

export function getAllSakeIds(): string[] {
  return Object.keys(MOCK_SAKE_DETAILS);
}
