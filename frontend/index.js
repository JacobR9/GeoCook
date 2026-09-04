async function searchArea(query) {
  const response = await fetch(
    `http://127.0.0.1:8000/areas/search?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Search for area failed: ${response.status}`);
  }

  const data = await response.json();

  displayResults(data.matches);
}

function displayResults(results){
    const resultsBox = document.getElementById("results");
    resultsBox.innerHTML = ""; //clear box

    if (results.length === 0) {
        resultsBox.textContent = "No matches found.";
        return;
    }

    results.forEach((result) => {
        const item = document.createElement("p");
        item.textContent = `${result.strArea} (${result.strCountry})`
        resultsBox.appendChild(item);
    });
}

const areaInput = document.getElementById("area");
const areaInputBtn = document.getElementById("Submit");
areaInputBtn.addEventListener('click', () => {
    console.log('Submit was clicked');
    searchArea(areaInput.value);
});