import {Recipe} from "../model/Recipe";
import "../images/BigMacSalat.jpg"
import {Button} from "@mui/material";

type RecipeCardGalleryViewProps = {
    recipeToDisplay: Recipe
    recipeToRemove: (id?: string)=> void
}
export default function RecipeCardGalleryView(props: RecipeCardGalleryViewProps) {

    function onDeleteClick(){
    props.recipeToRemove(props.recipeToDisplay.id)
}

    return (
        <div>

            <h2>{props.recipeToDisplay.name}</h2>
            <img alt="photo" src={props.recipeToDisplay.image}/>
            <p>{props.recipeToDisplay.mealType} </p>
            <p>{props.recipeToDisplay.prepTime} </p>
            <p>{props.recipeToDisplay.favorite} </p>
            <Button onClick={onDeleteClick} variant="outlined">Löschen</Button>
        </div>
    )


}