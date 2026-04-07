/* ── Pagination ───────────────────────────────── */

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/* ── Articles ──────────────────────────────────── */

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; emoji: string; caption: string }
  | { type: "quote"; text: string; author: string };

export interface ArticleListItem {
  slug: string;
  title: string;
  subtitle: string;
  category: "brewery" | "sake-knowledge" | "culture";
  categoryLabel: string;
  date: string;
  readTime: string;
  emoji: string;
  excerpt: string;
}

export interface Article extends ArticleListItem {
  body: ArticleBlock[];
}

export interface CategoryFilter {
  key: string;
  label: string;
}

export interface ArticlesResponse extends PaginatedResponse<ArticleListItem> {
  filters: {
    categories: CategoryFilter[];
  };
}

/* ── Pairing Guide ────────────────────────────── */

export interface PairingGuideItem {
  id: string;
  emoji: string;
  foodName: string;
  sakeName: string;
  sakeBrewery: string;
  sakeType: string;
  temperature: string;
  season: string;
  description: string;
  body: string;
  whyItWorks: string;
  howToEnjoy: string;
  foodImage: string;
  sakeImage: string;
}

export type PairingGuideListItem = Omit<PairingGuideItem, "body" | "whyItWorks" | "howToEnjoy">;

export interface PairingCategory {
  slug: string;
  label: string;
  title: string;
  items: PairingGuideListItem[];
}

export interface SeasonFilter {
  key: string;
  label: string;
  match?: string;
}

export interface FoodCategoryFilter {
  key: string;
  label: string;
}

export interface PairingGuideResponse {
  categories: PairingCategory[];
  filters: {
    seasons: SeasonFilter[];
    foodCategories: FoodCategoryFilter[];
  };
}

/* ── Sake Encyclopedia ────────────────────────── */

export interface SakeListItem {
  id: string;
  name: string;
  brewery: string;
  region: string;
  servingTags: string[];
}

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

/* ── Quiz Results ─────────────────────────────── */

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

/* ── Journal ──────────────────────────────────── */

export interface SakeProfile {
  sweetDry: number;
  heavyLight: number;
  richCalm: number;
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

/* ── Utility ──────────────────────────────────── */

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}
