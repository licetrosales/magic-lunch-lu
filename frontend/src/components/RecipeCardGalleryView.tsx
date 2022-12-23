import {Recipe} from "../model/Recipe";

type RecipeCardGalleryViewProps = {
    recipeToDisplay : Recipe
}
export default function RecipeCardGalleryView(props: RecipeCardGalleryViewProps) {


        return (
            <div>
                <h2>{props.recipeToDisplay.name}</h2>
                <img alt = "photo" src={require("./images/comida-mexicana-Stock-Photos.jpeg")}/>
                <p>{props.recipeToDisplay.mealType} </p>
                <p>{props.recipeToDisplay.prepTime} </p>
                <p>{props.recipeToDisplay.favorite} </p>
            </div>
        )



}