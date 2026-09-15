interface AreaMatch {
  strArea: string;
  strCountry: string;
}

interface Meal {
  strMeal: string;
  strMealThumb: string;
}

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
  strCountry: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;

  strIngredient1: string | null; strIngredient2: string | null; strIngredient3: string | null;
  strIngredient4: string | null; strIngredient5: string | null; strIngredient6: string | null;
  strIngredient7: string | null; strIngredient8: string | null; strIngredient9: string | null;
  strIngredient10: string | null; strIngredient11: string | null; strIngredient12: string | null;
  strIngredient13: string | null; strIngredient14: string | null; strIngredient15: string | null;
  strIngredient16: string | null; strIngredient17: string | null; strIngredient18: string | null;
  strIngredient19: string | null; strIngredient20: string | null;

  strMeasure1: string | null; strMeasure2: string | null; strMeasure3: string | null;
  strMeasure4: string | null; strMeasure5: string | null; strMeasure6: string | null;
  strMeasure7: string | null; strMeasure8: string | null; strMeasure9: string | null;
  strMeasure10: string | null; strMeasure11: string | null; strMeasure12: string | null;
  strMeasure13: string | null; strMeasure14: string | null; strMeasure15: string | null;
  strMeasure16: string | null; strMeasure17: string | null; strMeasure18: string | null;
  strMeasure19: string | null; strMeasure20: string | null;

  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

const areaInput = document.getElementById("area1") as HTMLInputElement;
let debouncer: ReturnType<typeof setTimeout>;

async function searchArea(query: string): Promise<void> {
  const response = await fetch(
    `http://127.0.0.1:8000/areas/search?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Search for area failed: ${response.status}`);
  }

  const data: { matches: AreaMatch[] } = await response.json();

  displayDropdown(data.matches);
}

function displayDropdown(results: AreaMatch[]): void {
  const resultsDropdown = document.getElementById("dropdown") as HTMLDivElement;
  resultsDropdown.innerHTML = ""; // clear box

  if (results.length === 0) {
    resultsDropdown.textContent = "No matches found.";
    return;
  }

  results.forEach((result) => {
    const item = document.createElement("div");
    item.classList.add("dropdown-item");
    item.textContent = `${result.strArea} (${result.strCountry})`;

    item.addEventListener("click", () => {
      areaInput.value = result.strCountry;
      resultsDropdown.innerHTML = "";
      getMealsByArea(result.strArea);
    });
    resultsDropdown.appendChild(item);
  });
}

async function getMealsByArea(area: string): Promise<void> {
  const response = await fetch(
    `http://127.0.0.1:8000/areas/${encodeURIComponent(area)}/meals`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch meals: ${response.status}`);
  }

  const result: { meals: Meal[] } = await response.json();
  displayMeals(result.meals);
}

function displayMeals(meals: Meal[]): void {
  const mealsDiv = document.getElementById("meals") as HTMLDivElement;
  mealsDiv.innerHTML = "";

  meals.forEach((meal) => {
    const item = document.createElement("div");
    item.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="100">
      <p>${meal.strMeal}</p>
    `;
    mealsDiv.appendChild(item);
  });
}

async function displayMealDetails(meal_id: string): Promise<void>{
  const response = await fetch(
    `http://127.0.0.1:8000/meals/${encodeURIComponent(meal_id)}/details`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch meals: ${response.status}`);
  }

  const result: {details: MealDetail[] } = await response.json();
}

areaInput.addEventListener("input", () => {
  clearTimeout(debouncer);
  const query = areaInput.value.toLowerCase();

  if (query.length === 0) {
    return;
  }
  debouncer = setTimeout(() => {
    searchArea(query);
  }, 500); // 500ms delay - rate limiting
});