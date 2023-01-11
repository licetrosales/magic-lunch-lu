import {Recipe} from "../model/Recipe";
import "../images/BigMacSalat.jpg"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import RecipeCard from "./RecipeCard";


type RecipeCardGalleryViewProps = {
    recipeToDisplay: Recipe
    recipeToRemove: (id?: string) => void
}
export default function RecipeCardGalleryView(props: RecipeCardGalleryViewProps) {

    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)

    function onDeleteClick() {
        props.recipeToRemove(props.recipeToDisplay.id)
    }
    function handleOpen() {
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    function onDetailsClick() {
        //navigate("/recipes/" + props.recipeToDisplay.id)
        handleOpen()
    }
    function updateRecipe(){

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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Rezept Bearbeiten</DialogTitle>
                <DialogContent>

                    <h3>{props.recipeToDisplay.name}</h3>
                    <RecipeCard recipeToDisplay={props.recipeToDisplay}/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={updateRecipe}>
                        Ändern
                    </Button>
                    <Button onClick={handleClose}>
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )


}