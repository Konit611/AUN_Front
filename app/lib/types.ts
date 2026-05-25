/* ── Auth ──────────────────────────────────────── */

export interface MeUser {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  created_at: string;
}

/* ── Admin: Sakana (肴) ─────────────────────────── */

export interface AdminIngredient {
  name: string;
  amount: string;
}

export interface AdminSakanaCategory {
  id: number;
  slug: string;
  label: string;
  position: number;
}

export interface AdminSakana {
  id: string;
  name: string;
  categoryId: number;
  emoji: string;
  description: string | null;
  imagePlaceholder: string | null;
  foodImageUrl: string | null;
  sweetness: number;
  umami: number;
  acidity: number;
  fat: number;
  aroma: number;
  saltiness: number;
  ingredients: AdminIngredient[];
  steps: string[];
  prepTimeMin: number | null;
  cookTimeMin: number | null;
  servings: number | null;
  difficulty: string | null;
}

export interface AdminSakanaInput {
  name: string;
  category_id: number;
  emoji: string;
  description: string | null;
  image_placeholder: string | null;
  food_image_url: string | null;
  sweetness: number;
  umami: number;
  acidity: number;
  fat: number;
  aroma: number;
  saltiness: number;
  ingredients: AdminIngredient[] | null;
  steps: string[] | null;
  prep_time_min: number | null;
  cook_time_min: number | null;
  servings: number | null;
  difficulty: string | null;
}

/* ── Admin: Sake ───────────────────────────────── */

export interface AdminSakeListItem {
  id: string;
  name: string;
  brewery: string;
  type: string;
  imageUrl: string | null;
}

export interface AdminSakeFlavor {
  flavorId: string;
  label: string;
  isPrimary: boolean;
  position: number;
}

export interface AdminSakePairing {
  sakanaId: string;
  sakanaName: string;
  emoji: string;
  description: string;
  position: number;
}

export interface AdminSake {
  id: string;
  name: string;
  brewery: string;
  region: string;
  description: string;
  type: string;
  rice: string;
  polishing: string;
  servingTemperature: string;
  servingSeason: string;
  sweetness: number;
  umami: number;
  acidity: number;
  bitterness: number;
  aroma: number;
  imageUrl: string | null;
  amazonUrl: string | null;
  rakutenUrl: string | null;
  flavors: AdminSakeFlavor[];
  pairings: AdminSakePairing[];
}

export interface AdminFlavorMeta {
  id: string;
  label: string;
}

export interface AdminFlavor {
  id: string;
  label: string;
}

export interface AdminSakanaMeta {
  id: string;
  name: string;
  emoji: string;
}

export interface AdminSakeInput {
  id?: string;
  name: string;
  brewery: string;
  region: string;
  description: string;
  type: string;
  rice: string;
  polishing: string;
  serving_temperature: string;
  serving_season: string;
  sweetness: number;
  umami: number;
  acidity: number;
  bitterness: number;
  aroma: number;
  image_url: string | null;
  amazon_url: string | null;
  rakuten_url: string | null;
  flavors: { flavor_id: string; is_primary: boolean }[];
  pairings: { sakana_id: string; description: string; position: number }[];
}

/* ── Admin: Pairing Guide ──────────────────────── */

export interface AdminPairingCategory {
  id: number;
  slug: string;
  label: string;
  title: string;
  position: number;
}

export interface AdminPairingItem {
  id: string;
  categoryId: number;
  sakeId: string;
  sakeName: string;
  sakeBrewery: string;
  sakeType: string;
  sakeImageUrl: string | null;
  sakanaId: string;
  sakanaName: string;
  sakanaEmoji: string;
  sakanaImageUrl: string | null;
  temperature: string;
  season: string;
  description: string;
  body: string | null;
  whyItWorks: string | null;
  howToEnjoy: string | null;
  bodyJson: unknown[] | null;
  bodyHtml: string | null;
  isDraft: boolean;
  heroImage: string | null;
  personaCode: string | null;
  position: number;
}

export interface AdminPairingItemInput {
  id?: string | null;
  category_id: number;
  sake_id: string;
  sakana_id: string;
  temperature: string;
  season: string;
  description: string;
  body?: string | null;
  why_it_works?: string | null;
  how_to_enjoy?: string | null;
  body_json?: unknown[] | null;
  body_html?: string | null;
  is_draft: boolean;
  hero_image: string | null;
  persona_code: string | null;
  position: number;
}

/* ── Admin: Article (yomimono) ─────────────────── */

export interface AdminArticleCategory {
  id: number;
  slug: string;
  label: string;
  position: number;
}

export type AdminArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | {
      type: "image";
      emoji: string;
      caption: string;
      image_url?: string | null;
    }
  | { type: "quote"; text: string; author: string };

export interface AdminArticle {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  categoryId: number;
  categorySlug: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  emoji: string;
  heroImageUrl: string | null;
  body: AdminArticleBlock[];
  bodyJson: unknown[] | null;
  bodyHtml: string | null;
  isDraft: boolean;
  updatedAt: string | null;
}

export interface AdminArticleInput {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category_id: number;
  date: string;
  read_time: string;
  emoji: string;
  hero_image_url: string | null;
  body: AdminArticleBlock[];
  body_json?: unknown[] | null;
  body_html?: string | null;
  is_draft: boolean;
}

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
  | { type: "image"; emoji: string; caption: string; image_url?: string | null }
  | { type: "quote"; text: string; author: string };

export interface ArticleListItem {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  emoji: string;
  heroImageUrl: string | null;
  excerpt: string;
}

export interface Article extends ArticleListItem {
  body: ArticleBlock[];
  bodyHtml: string | null;
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
  body: string | null;
  whyItWorks: string | null;
  howToEnjoy: string | null;
  bodyHtml: string | null;
  foodImage: string | null;
  sakeImage: string | null;
  heroImage: string | null;
}

export type PairingGuideListItem = Omit<PairingGuideItem, "body" | "whyItWorks" | "howToEnjoy">;

export interface PairingCategory {
  slug: string;
  label: string;
  title: string;
  items: PairingGuideListItem[];
}

export interface FoodCategoryFilter {
  key: string;
  label: string;
}

export interface PairingGuideResponse {
  categories: PairingCategory[];
}

/* ── Home ──────────────────────────────────────── */

export interface HomePairingCard {
  id: string;
  emoji: string;
  food: string;
  sake: string;
  temperature: string;
  description: string;
}

export interface FeaturedSake {
  id: string;
  name: string;
  brewery: string;
  region: string;
  type: string;
  description: string;
  imageUrl: string | null;
  personalized: boolean;
}

export interface HomeData {
  seasonal: {
    label: string;
    items: HomePairingCard[];
  };
  classic: {
    items: HomePairingCard[];
  };
  foodCategories: FoodCategoryFilter[];
  featuredSake: FeaturedSake | null;
}

/* ── Sake Encyclopedia ────────────────────────── */

export interface SakeListItem {
  id: string;
  name: string;
  brewery: string;
  region: string;
  servingTags: string[];
  imageUrl: string | null;
}

export interface SakeDetailPairing {
  sakanaId: string;
  emoji: string;
  foodName: string;
  description: string;
  foodImageUrl: string;
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
  imageUrl: string | null;
  amazonUrl: string | null;
  rakutenUrl: string | null;
  flavorTags: { label: string; primary: boolean }[];
  servingTags: string[];
  pairings: SakeDetailPairing[];
  synergyPairings: SakeDetailPairing[];
  cleansePairings: SakeDetailPairing[];
  contrastPairings: SakeDetailPairing[];
}

/* ── Sakana (肴帖) ─────────────────────────────── */

export interface SakanaTasteAxes {
  sweetness: number;
  umami: number;
  acidity: number;
  fat: number;
  aroma: number;
  saltiness: number;
}

export interface SakanaListItem {
  id: string;
  name: string;
  categoryId: number;
  emoji: string;
  imagePlaceholder: string | null;
  foodImageUrl: string | null;
  tasteAxes: SakanaTasteAxes;
  prepTimeMin: number | null;
  cookTimeMin: number | null;
  difficulty: string | null;
}

export interface SakanaCategory {
  id: number;
  slug: string;
  label: string;
  position: number;
}

export interface SakanaIngredient {
  name: string;
  amount: string;
}

export interface SakanaPairedSake {
  sakeId: string;
  sakeName: string;
  brewery: string;
  region?: string;
  type: string;
  imageUrl: string | null;
  description?: string;
}

export interface SakanaDetail extends SakanaListItem {
  categoryLabel: string | null;
  categorySlug: string | null;
  description: string | null;
  ingredients: SakanaIngredient[];
  steps: string[];
  servings: number | null;
  pairings: SakanaPairedSake[];
  synergyPairings: SakanaPairedSake[];
}

/* ── Quiz Results ─────────────────────────────── */

export interface SakeRecommendation {
  id: string;
  name: string;
  brewery: string;
  region: string;
  description: string;
  imageUrl: string | null;
  tags: { label: string; variant: "primary" | "secondary" }[];
}

export interface PairingRecommendation {
  id: string;
  emoji: string;
  foodName: string;
  sakeName: string;
  temperature: string;
  description: string;
  foodImageUrl: string | null;
  sakeImageUrl: string | null;
}

export interface ResultData {
  sakes: SakeRecommendation[];
  pairings: PairingRecommendation[];
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
