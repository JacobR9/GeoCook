import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getMealDetail } from "../api";
import type {MealDetail} from "../types";

function MealDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<MealDetail | null>(null);

  useEffect(() => {
    if (id) getMealDetail(id).then(setMeal);
  }, [id]);

  if (!meal) return <p>Loading...</p>;

  return (
    <div>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb ?? ""} width={300} />
      <p>{meal.strInstructions}</p>
    </div>
  );
}


export default MealDetailPage;