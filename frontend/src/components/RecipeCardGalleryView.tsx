import {Recipe} from "../model/Recipe";
import "../images/BigMacSalat.jpg"

type RecipeCardGalleryViewProps = {
    recipeToDisplay: Recipe
}
export default function RecipeCardGalleryView(props: RecipeCardGalleryViewProps) {


    return (
        <div>
            <h2>{props.recipeToDisplay.name}</h2>
            <img alt="photo" src={props.recipeToDisplay.image}/>
            <p>{props.recipeToDisplay.mealType} </p>
            <p>{props.recipeToDisplay.prepTime} </p>
            <p>{props.recipeToDisplay.favorite} </p>
        </div>
    )


}