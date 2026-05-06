import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/app/lib/api";
import type { AdminRecipe } from "@/app/lib/types";
import RecipeForm from "@/app/components/admin/recipe-form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminRecipeEditPage({ params }: Props) {
  const { id } = await params;
  const cookie = (await cookies()).toString();

  let recipe: AdminRecipe;
  try {
    recipe = await apiFetch<AdminRecipe>(`/admin/recipes/${id}`, { cookie });
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/recipe"
        className="font-body text-sm text-text-muted hover:text-accent transition-colors w-fit"
      >
        ← 一覧に戻る
      </Link>
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-accent">
          {recipe.emoji} {recipe.name}
        </h1>
        <p className="font-body text-xs text-text-muted mt-1">
          ID: {recipe.id}
        </p>
      </div>
      <RecipeForm initial={recipe} />
    </div>
  );
}
