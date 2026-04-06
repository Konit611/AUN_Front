export interface Persona {
  code: string;
  name: string;
  description: string;
  compatibleCode: string;
  compatibleName: string;
  compatibleDescription: string;
}

export interface PersonaColors {
  gradientFrom: string;
  gradientTo: string;
}

const AXIS_COLORS = {
  S: "#C2685A",
  D: "#5A7FA0",
  R: "#7B5EA7",
  L: "#D4C5A9",
} as const;

const PERSONAS: Record<string, Persona> = {
  SHRB: {
    code: "SHRB",
    name: "華やかな探検家",
    description:
      "豊かな香りと繊細な余韻を愛する、好奇心旺盛な美食の探求者。",
    compatibleCode: "DELB",
    compatibleName: "DELBタイプ",
    compatibleDescription:
      "深い旨味と落ち着きを好む「DELB」タイプは、あなたの華やかさを引き立て、静かに寄り添うパートナー。共に飲み交わすことで、お互いの隠れた魅力が引き出されることでしょう。",
  },
  SHRS: {
    code: "SHRS",
    name: "繊細な語り部",
    description:
      "甘く芳醇な香りの奥に、柔らかな余韻を見出す感性の持ち主。",
    compatibleCode: "DELS",
    compatibleName: "DELSタイプ",
    compatibleDescription:
      "さっぱりとした軽やかさを好む「DELS」タイプが、あなたの繊細さをそっと支えてくれます。",
  },
  SHLB: {
    code: "SHLB",
    name: "穏やかな美学者",
    description:
      "甘口で重厚、それでいて香りは控えめ。落ち着いた美しさを愛する人。",
    compatibleCode: "DERB",
    compatibleName: "DERBタイプ",
    compatibleDescription:
      "辛口でどっしりとした味わいの「DERB」タイプと共に、深い旨味の世界を探求できます。",
  },
  SHLS: {
    code: "SHLS",
    name: "静寂の鑑賞者",
    description:
      "甘く穏やかで、滑らかな口当たりを好む。静かな時間を愛する人。",
    compatibleCode: "DERS",
    compatibleName: "DERSタイプ",
    compatibleDescription:
      "辛口ながら柔らかい飲み口の「DERS」タイプと、互いの味わいを補完し合えます。",
  },
  SERB: {
    code: "SERB",
    name: "爽快な冒険家",
    description:
      "甘口×軽快×華やかな香り×力強い余韻。ダイナミックに楽しむタイプ。",
    compatibleCode: "DHLB",
    compatibleName: "DHLBタイプ",
    compatibleDescription:
      "重厚で落ち着いた「DHLB」タイプが、あなたの爽快さにバランスを与えてくれます。",
  },
  SERS: {
    code: "SERS",
    name: "風のような自由人",
    description:
      "軽やかで華やかな甘さと、スムーズな余韻を愛するフリースピリット。",
    compatibleCode: "DHLS",
    compatibleName: "DHLSタイプ",
    compatibleDescription:
      "穏やかで深い味わいの「DHLS」タイプとの出会いが、新たな味覚の扉を開きます。",
  },
  SELB: {
    code: "SELB",
    name: "気品ある享楽家",
    description:
      "甘口で軽やか、香りは控えめながら力強い後味を楽しむ通。",
    compatibleCode: "DHRB",
    compatibleName: "DHRBタイプ",
    compatibleDescription:
      "重厚で香り高い「DHRB」タイプとのペアリングで、味わいの幅が広がります。",
  },
  SELS: {
    code: "SELS",
    name: "やさしい調和者",
    description:
      "甘口×軽快×穏やかな香り×滑らかな余韻。誰とでも馴染む柔軟さ。",
    compatibleCode: "DHRS",
    compatibleName: "DHRSタイプ",
    compatibleDescription:
      "香り豊かで重厚な「DHRS」タイプが、あなたの柔らかさに奥行きを加えてくれます。",
  },
  DHRB: {
    code: "DHRB",
    name: "深淵の探求者",
    description:
      "辛口で重厚、華やかな香りと力強い余韻。深みを求める探求者。",
    compatibleCode: "SELB",
    compatibleName: "SELBタイプ",
    compatibleDescription:
      "軽やかで品のある「SELB」タイプが、あなたの深みに光を添えてくれます。",
  },
  DHRS: {
    code: "DHRS",
    name: "洗練された求道者",
    description:
      "辛口の重厚さに華やかな香りが重なる。滑らかな余韻を愛する求道者。",
    compatibleCode: "SELS",
    compatibleName: "SELSタイプ",
    compatibleDescription:
      "柔らかく穏やかな「SELS」タイプとの相性は抜群。互いの個性を引き立てます。",
  },
  DHLB: {
    code: "DHLB",
    name: "揺るぎない古典派",
    description:
      "辛口×重厚×穏やかな香り×力強い後味。伝統的な旨味を愛する。",
    compatibleCode: "SERB",
    compatibleName: "SERBタイプ",
    compatibleDescription:
      "爽快で華やかな「SERB」タイプと共に、新たな味わいの発見を楽しめます。",
  },
  DHLS: {
    code: "DHLS",
    name: "寡黙な哲学者",
    description:
      "辛口で重厚、香りは控えめ、滑らかな余韻。静かに味わうタイプ。",
    compatibleCode: "SERS",
    compatibleName: "SERSタイプ",
    compatibleDescription:
      "軽やかで自由な「SERS」タイプが、あなたの世界に新しい風を吹き込みます。",
  },
  DERB: {
    code: "DERB",
    name: "軽快な知性派",
    description:
      "辛口で軽やか、華やかな香りと力強い余韻。知的に楽しむタイプ。",
    compatibleCode: "SHLB",
    compatibleName: "SHLBタイプ",
    compatibleDescription:
      "甘口で穏やかな「SHLB」タイプとの組み合わせで、味わいのハーモニーが生まれます。",
  },
  DERS: {
    code: "DERS",
    name: "流れる水のように",
    description:
      "辛口で軽快、香り高く滑らか。自然体で楽しむスタイル。",
    compatibleCode: "SHLS",
    compatibleName: "SHLSタイプ",
    compatibleDescription:
      "甘く静かな「SHLS」タイプと共に、穏やかで深い時間を過ごせます。",
  },
  DELB: {
    code: "DELB",
    name: "大地の守り人",
    description:
      "辛口で軽やか、香り穏やか、力強い後味。しっかりとした芯を持つ人。",
    compatibleCode: "SHRB",
    compatibleName: "SHRBタイプ",
    compatibleDescription:
      "華やかで探求心旺盛な「SHRB」タイプとの出会いが、あなたの味覚を彩り豊かにします。",
  },
  DELS: {
    code: "DELS",
    name: "透明な旅人",
    description:
      "辛口×軽快×穏やかな香り×滑らかな余韻。澄んだ味わいを愛する旅人。",
    compatibleCode: "SHRS",
    compatibleName: "SHRSタイプ",
    compatibleDescription:
      "繊細で芳醇な「SHRS」タイプが、あなたの透明感に深みと彩りを加えてくれます。",
  },
};

const VALID_CODES = Object.keys(PERSONAS);

export function calculatePersonaCode(
  answers: Record<number, string>,
): string {
  const axisQuestions = [
    [1, 2], // S/D
    [3, 4], // H/E
    [5, 6], // R/L
    [7, 8], // B/S
  ] as const;

  const axisLetters = [
    ["S", "D"],
    ["H", "E"],
    ["R", "L"],
    ["B", "S"],
  ] as const;

  return axisQuestions
    .map((questionIds, axisIndex) => {
      const scores = questionIds.map((qId): number =>
        answers[qId] === "a" ? 0 : 1,
      );
      const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
      return avg >= 0.5
        ? axisLetters[axisIndex][0]
        : axisLetters[axisIndex][1];
    })
    .join("");
}

export function getPersona(code: string): Persona | null {
  return PERSONAS[code.toUpperCase()] ?? null;
}

export function getPersonaColors(code: string): PersonaColors {
  const upper = code.toUpperCase();
  const axis1Char = upper[0] as "S" | "D";
  const axis3Char = upper[2] as "R" | "L";

  return {
    gradientFrom: AXIS_COLORS[axis1Char] ?? AXIS_COLORS.S,
    gradientTo: AXIS_COLORS[axis3Char] ?? AXIS_COLORS.R,
  };
}

export function isValidCode(code: string): boolean {
  return VALID_CODES.includes(code.toUpperCase());
}
