export interface SakeRecommendation {
  name: string;
  brewery: string;
  region: string;
  description: string;
  imagePath: string;
  tags: { label: string; variant: "primary" | "secondary" }[];
}

export interface PairingRecommendation {
  emoji: string;
  foodName: string;
  sakeName: string;
  temperature: string;
  description: string;
}

export interface ResultData {
  sakes: SakeRecommendation[];
  pairings: PairingRecommendation[];
  pairingSectionTitle: string;
  pairingSectionDescription: string;
}

const MOCK_DATA: Record<string, ResultData> = {
  SHRB: {
    sakes: [
      {
        name: "鳳凰美田 純米大吟醸",
        brewery: "小林酒造",
        region: "栃木県",
        description: "華やかなマスカットの香りとクリアな酸味。",
        imagePath: "/images/sake-placeholder.jpg",
        tags: [
          { label: "Aromatic", variant: "primary" },
          { label: "Chilled", variant: "secondary" },
        ],
      },
      {
        name: "醸し人九平次 希望の水",
        brewery: "萬乗醸造",
        region: "愛知県",
        description: "ワインのような立体感とエレガントな余韻。",
        imagePath: "/images/sake-placeholder.jpg",
        tags: [
          { label: "Refined", variant: "primary" },
          { label: "Room Temp", variant: "secondary" },
        ],
      },
      {
        name: "たかちよ 扁平精米",
        brewery: "髙千代酒造",
        region: "新潟県",
        description: "完熟した果実味とジューシーな旨味の調和。",
        imagePath: "/images/sake-placeholder.jpg",
        tags: [
          { label: "Floral", variant: "primary" },
          { label: "Summer", variant: "secondary" },
        ],
      },
    ],
    pairingSectionTitle: "美食の相性図鑑",
    pairingSectionDescription:
      "SHRBタイプは、香りの重なりを愉しむマリアージュが得意。素材の甘みを引き立てる、繊細なペアリングをご提案します。",
    pairings: [
      {
        emoji: "🍣",
        foodName: "白身魚の昆布締め",
        sakeName: "フルーティーな大吟醸",
        temperature: "冷酒 5-10°C",
        description:
          "昆布の旨味を日本酒の華やかな香りが包み込み、鼻に抜ける余韻が完成されます。",
      },
      {
        emoji: "🍓",
        foodName: "フレッシュベリーの白和え",
        sakeName: "微発泡濁り酒",
        temperature: "冷酒 8-12°C",
        description:
          "果実の酸とシュワっとした炭酸が、豆乳のまろやかさをリフレッシュさせます。",
      },
      {
        emoji: "🫕",
        foodName: "ブッラータチーズと季節の果実",
        sakeName: "酸の高い原酒",
        temperature: "常温",
        description:
          "濃厚なクリーム感を、日本酒の持つ輪郭のある酸がスマートに引き締めます。",
      },
    ],
  },
};

export function getResultData(code: string): ResultData {
  return MOCK_DATA[code.toUpperCase()] ?? MOCK_DATA.SHRB;
}
