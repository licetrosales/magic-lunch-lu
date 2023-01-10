import {Recipe} from "../model/Recipe";
import "../images/BigMacSalat.jpg"
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

type RecipeCardGalleryViewProps = {
    recipeToDisplay: Recipe
    recipeToRemove: (id?: string) => void
}
export default function RecipeCardGalleryView(props: RecipeCardGalleryViewProps) {

    const navigate = useNavigate()
    function onDeleteClick() {
        props.recipeToRemove(props.recipeToDisplay.id)
    }
    function onDetailsClick() {
        navigate("/recipes/" + props.recipeToDisplay.id)
    }

    return (
        <div>

            <h3>{props.recipeToDisplay.name}</h3>
            <img alt="photo" src={props.recipeToDisplay.image}/>
            <p>{props.recipeToDisplay.mealType} </p>
            <p>{props.recipeToDisplay.prepTime} </p>
            <p>{props.recipeToDisplay.favorite} </p>
            <Button onClick={onDeleteClick} variant="outlined">Löschen</Button>
            <Button onClick={onDetailsClick} variant="outlined">Details</Button>
        </div>
    )


}