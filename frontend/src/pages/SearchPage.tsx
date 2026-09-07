import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchArea, getMealsByArea } from "../api";
import type { AreaMatch, Meal } from "../types";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<AreaMatch[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length === 0) {
      setMatches([]);
      return;
    }
    
    const debouncer = setTimeout(() => {
      searchArea(query).then(setMatches);
    }, 500);

    return () => clearTimeout(debouncer);
  }, [query]);

  async function handleSelectArea(match: AreaMatch) {
    setQuery(match.strCountry);
    setMatches([]);
    const result = await getMealsByArea(match.strArea);
    setMeals(result);
  }

  return (
    <div>
      <h1>Welcome to GeoCook</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a country..."
      />
      <div className="dropdown">
        {matches.map((match) => (
          <div
            key={match.strArea}
            className="dropdown-item"
            onClick={() => handleSelectArea(match)}
          >
            {match.strArea} ({match.strCountry})
          </div>
        ))}
      </div>

      <div className="meals-div">
        {meals.map((meal) => (
          <div key={meal.idMeal} onClick={() => navigate(`/meal/${meal.idMeal}`)}>
            <img src={meal.strMealThumb} alt={meal.strMeal} width={100} />
            <p>{meal.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;