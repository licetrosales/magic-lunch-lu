import {Recipe} from "../model/Recipe";
import RecipeCardGalleryView from "./Recipe/RecipeCardGalleryView";
import {Container} from "@mui/material";
import {WeekMealPlan} from "../model/WeekMealPlan";

type WeekMealPlanGalleryProps = {
    weekMealPlanToMap: WeekMealPlan[]
}

export default function WeekMealPlanGallery(props: WeekMealPlanGalleryProps) {

    const weekMealPlanItemComponents = props.weekMealPlanToMap.map(weekMealPlanDateInfo => {
        return <>
            {weekMealPlanDateInfo.meals.map((meal)=>{
                return meal.recipe.name
        })}
        </>
    })
    return (
        <section>

            <Container>
                <br/><br/>
                {weekMealPlanItemComponents}
            </Container>
        </section>
    )
}