/* ── Auth ──────────────────────────────────────── */

export interface MeUser {
  id: number;
  email: string;
  username: string;
  is_admin: boolean;
  created_at: string;
}

/* ── Admin: Recipe ─────────────────────────────── */

export interface AdminIngredient {
  name: string;
  amount: string;
}

export interface AdminRecipe {
  id: string;
  name: string;
  emoji: string;
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

export interface AdminRecipeInput {
  name: string;
  emoji: string;
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
  recipeId: string;
  recipeName: string;
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
  flavors: AdminSakeFlavor[];
  pairings: AdminSakePairing[];
}

export interface AdminFlavorMeta {
  id: string;
  label: string;
}

export interface AdminRecipeMeta {
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
  flavors: { flavor_id: string; is_primary: boolean }[];
  pairings: { recipe_id: string; description: string; position: number }[];
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
  recipeId: string;
  recipeName: string;
  recipeEmoji: string;
  recipeImageUrl: string | null;
  temperature: string;
  season: string;
  description: string;
  body: string;
  whyItWorks: string;
  howToEnjoy: string;
  heroImage: string | null;
  personaCode: string | null;
  position: number;
}

export interface AdminPairingItemInput {
  id?: string | null;
  category_id: number;
  sake_id: string;
  recipe_id: string;
  temperature: string;
  season: string;
  description: string;
  body: string;
  why_it_works: string;
  how_to_enjoy: string;
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

/* ── Home ──────────────────────────────────────── */

export interface HomePairingCard {
  id: string;
  emoji: string;
  food: string;
  sake: string;
  temperature: string;
  description: string;
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
  synergyPairings: SakeDetailPairing[];
  cleansePairings: SakeDetailPairing[];
  contrastPairings: SakeDetailPairing[];
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
