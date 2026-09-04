async function searchAreas(query) {
  const response = await fetch(
    `http://127.0.0.1:8000/areas/search?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  const data = await response.json();
  return data.matches;
}

const test = await searchAreas("eng");