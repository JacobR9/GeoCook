import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useSwipeable} from "react-swipeable";
import { getMealDetail } from "../api";
import type {MealDetail} from "../types";

function MealDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [meal, setMeal] = useState<MealDetail | null>(null);
    const [currentStep, setCurrentStep] = useState(0); 

    useEffect(() => {
    if (id) getMealDetail(id).then(setMeal);
    }, [id]);


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

    const steps = meal ? splitInstructions(meal.strInstructions) : [];
    //console.log(steps);

    function nextStep() {
        setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }

    function prevStep() {
        setCurrentStep((s) => Math.max(s - 1, 0));
    }

    const swipeHandlers = useSwipeable({onSwipedLeft: nextStep, onSwipedRight: prevStep,
        trackMouse: true,   //for mouse testing
    });

    if (!meal) return <p>Meal not found</p>;

    return (
    <div {...swipeHandlers}>
      <h1>{meal.strMeal}</h1>
      <p>Step {currentStep + 1} of {steps.length}</p>
      <br></br>
      <p>{steps[currentStep]}</p>

      <div>
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
}


export default MealDetailPage;