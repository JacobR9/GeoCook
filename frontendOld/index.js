const areaInput = document.getElementById("area1");
const dropdown = document.getElementById("dropdown-div");
let debouncer;

async function searchArea(query) {
  const response = await fetch(
    `http://127.0.0.1:8000/areas/search?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Search for area failed: ${response.status}`);
  }

  const data = await response.json();

  displayDropdown(data.matches);
}

function displayDropdown(results){
    const resultsDropdown = document.getElementById("dropdown");
    resultsDropdown.innerHTML = ""; //clear box

    if (results.length === 0) {
        resultsDropdown.textContent = "No matches found.";
        return;
    }

    results.forEach((result) => {
        const item = document.createElement("div");
        item.classList.add("dropdown-item");
        item.textContent = `${result.strArea} (${result.strCountry})`

        item.addEventListener("click", () => {
            areaInput.value = result.strCountry;
            resultsDropdown.innerHTML = "";
            getMealsByArea(result.strArea);
        });
        resultsDropdown.appendChild(item);
    });
}

async function getMealsByArea(area){
    const response = await fetch(
        `http://127.0.0.1:8000/areas/${encodeURIComponent(area)}/meals`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch meals: ${response.status}`);
    }

    const result = await response.json();
    displayMeals(result.meals);
}

function displayMeals(meals){
    const mealsDiv = document.getElementById("meals");
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

areaInput.addEventListener('input', () =>{
    clearTimeout(debouncer);
    const query = areaInput.value.toLowerCase();

     if (query.length === 0) {
        return;
     }
    debouncer = setTimeout(() => {
        searchArea(query);
     }, 500);   //500ms delay - rate limiting
});

