import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useSwipeable} from "react-swipeable";
import { getMealDetail } from "../api";
import type {MealDetail} from "../types";
import {YoutubePlayer} from "../components/YoutubePlayer";

function MealDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [meal, setMeal] = useState<MealDetail | null>(null);
    const [currentStep, setCurrentStep] = useState(0); 

    useEffect(() => {
    if (id) getMealDetail(id).then(setMeal);
    }, [id]);

    const steps = meal ? splitInstructions(meal.strInstructions) : [];
    //console.log(steps);

    const isFinalStep = currentStep === steps.length-1; //boolean for yt player

    function splitInstructions(instructions: string | null): string[] {
        if (!instructions) return [];

        const splitLines = instructions.split(/\r?\n/).map((step) => step.trim()).filter((step) => step.length > 0);

        const formattedSteps: string[] = [];

        for (const line of splitLines){
            const isStepLine = /^(step\s*\d+[.:)]?|\d+[.)]?)$/i.test(line);
            if (isStepLine){continue;} 
            formattedSteps.push(line);
        }
        
        return formattedSteps;
    }

    function nextStep() {
        setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }

    function prevStep() {
        setCurrentStep((s) => Math.max(s - 1, 0));
    }

    const swipeHandlers = useSwipeable({onSwipedLeft: nextStep, onSwipedRight: prevStep,
        trackMouse: true,   //for mouse testing
    });

    function getIngredients(meal: MealDetail): string[]{

        const ingredients: string[] = [];

        for (let i=1; i<=20; i++){
            const key = `strIngredient${i}` as keyof MealDetail;
            const value = meal[key] as string | null;

            if (!value || value.trim() === ""){break;}
            ingredients.push(value);
        }
        return ingredients;
    }

    function getMeasurements(meal: MealDetail): string[]{
        const measurements = [];

        for (let i=1; i<=20; i++){
            const key = `strMeasure${i}` as keyof MealDetail;
            const value = meal[key] as string | null;

            if (!value || value.trim() === ""){break;}
            measurements.push(value);
        }
        return measurements;
    }

    if (!meal) return <p>Meal not found</p>;

    const ingredients = meal ? getIngredients(meal) : [];
    const measurements = meal ? getMeasurements(meal) : [];

    return (
    <div {...swipeHandlers}>
      <h1>{meal.strMeal}</h1>
      <p>Step {currentStep + 1} of {steps.length}</p>
      <br></br>
      <p>{steps[currentStep]}</p>
      <br></br>
      <div>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
      <br></br>
      <div>
        <div>
            {isFinalStep && ( 
                <div className="youtube-player">
                <br></br>
                <YoutubePlayer videoId="BN1WwnEDWAM" />
                </div>
            )}
            <h2>Ingredients</h2>
            <ul>
                {ingredients.map((ingredient, index) => (
                <li key = {index}>{ingredient}</li>))}
            </ul>
        </div>
        <div>
            <h2>Measurements</h2>
            <ul>
                {measurements.map((measurement, index) => (
                <li key = {index}>{measurement}</li>))}
            </ul>
        </div>
      </div>
    </div>
  );
}


export default MealDetailPage;