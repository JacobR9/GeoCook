interface AreaMatch {
  strArea: string;
  strCountry: string;
}

interface Meal {
  strMeal: string;
  strMealThumb: string;
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