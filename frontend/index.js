const areaInput = document.getElementById("area1");
const dropdown = document.getElementById("dropdown-div");

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
        });
        resultsDropdown.appendChild(item);
    });
}

areaInput.addEventListener('input', () =>{
    const query = areaInput.value.toLowerCase();

     if (query.length === 0) {
        return;
     }
     searchArea(query);
})

