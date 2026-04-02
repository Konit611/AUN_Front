export interface JournalEntry {
  id: string;
  sakeName: string;
  brewery?: string;
  category?: string;
  date: string;
  rating: number;
  note?: string;
  imagePath?: string;
}

export const mockJournalEntries: JournalEntry[] = [
  {
    id: "1",
    sakeName: "獺祭 純米大吟醸45",
    brewery: "旭酒造",
    category: "Junmai Daiginjo",
    date: "2026.03.28",
    rating: 5,
    note: "A silky, ethereal mouthfeel with notes of honeydew and white pepper. Absolute perfection.",
    imagePath: "/images/journal/sake-1.jpg",
  },
  {
    id: "2",
    sakeName: "久保田 萬寿",
    brewery: "朝日酒造",
    category: "Junmai Daiginjo",
    date: "2026.03.25",
    rating: 4,
    note: "Crisp apple aroma and a surprisingly clean finish. Pairing well with light sashimi.",
    imagePath: "/images/journal/sake-2.jpg",
  },
  {
    id: "3",
    sakeName: "新政 No.6 S-type",
    brewery: "新政酒造",
    category: "Junmai",
    date: "2026.03.20",
    rating: 5,
    note: "The snow-melt water quality really shows. Elegant, dry, and straightforward.",
    imagePath: "/images/journal/sake-3.jpg",
  },
  {
    id: "4",
    sakeName: "醸し人九平次 希望の月",
    brewery: "萬乗醸造",
    category: "Junmai Daiginjo",
    date: "2026.03.15",
    rating: 4,
    note: "Rich, umami-heavy with a beautiful golden hue. A winter evening favorite.",
    imagePath: "/images/journal/sake-4.jpg",
  },
  {
    id: "5",
    sakeName: "黒龍 大吟醸",
    brewery: "黒龍酒造",
    category: "Daiginjo",
    date: "2026.01.20",
    rating: 3,
    note: "Smoothness redefined. Velvety texture with hints of banana and dark cherry.",
    imagePath: "/images/journal/sake-5.jpg",
  },
  {
    id: "6",
    sakeName: "鍋島 New Moon",
    brewery: "富久千代酒造",
    category: "Junmai Ginjo",
    date: "2026.01.05",
    rating: 5,
    note: "Effervescent and vibrant. The slight fizz on the tongue is delightful.",
    imagePath: "/images/journal/sake-6.jpg",
  },
];
