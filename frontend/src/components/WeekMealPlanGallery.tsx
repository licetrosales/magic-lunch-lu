import {Container, Typography} from "@mui/material";

import RecipeCard from "./Recipe/RecipeCard";
import {Recipe} from "../model/Recipe";

type WeekMealPlanGalleryProps = {
    recipeToMap: Recipe[]

}

export default function WeekMealPlanGallery(props:WeekMealPlanGalleryProps) {

    const weekMealPlanItemComponents = props.recipeToMap.map((recipeInfo,index) => {
        let today = new Date()
        today.setDate(today.getDate() + index)
        let date = new Date(today).toLocaleDateString("de-DE")

        return <div>
            <Typography>{date}</Typography>
            <RecipeCard recipeToDisplay={recipeInfo} key={recipeInfo.id}/>
        </div>
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