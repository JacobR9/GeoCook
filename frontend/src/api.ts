import type { AreaMatch, Meal, MealDetail } from "./types";

const API_BASE = "http://127.0.0.1:8000";

export async function searchArea(query: string): Promise<AreaMatch[]> {
  const response = await fetch(`${API_BASE}/areas/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error(`Search failed: ${response.status}`);
  const data: { matches: AreaMatch[] } = await response.json();
  return data.matches;
}

export async function getMealsByArea(area: string): Promise<Meal[]> {
  const response = await fetch(`${API_BASE}/areas/${encodeURIComponent(area)}/meals`);
  if (!response.ok) throw new Error(`Failed to fetch meals: ${response.status}`);
  const data: { meals: Meal[] } = await response.json();
  return data.meals;
}

export async function getMealDetail(id: string): Promise<MealDetail> {
  const response = await fetch(`${API_BASE}/meals/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch meal detail: ${response.status}`);
  const data: { meals: MealDetail[] } = await response.json();
  return data.meals[0];
}