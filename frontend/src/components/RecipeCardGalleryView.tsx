import {Recipe} from "../model/Recipe";
import "../images/BigMacSalat.jpg"
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import RecipeCard from "./RecipeCard";
import RecipeUpdateForm from "./RecipeUpdateForm";

type RecipeCardGalleryViewProps = {
    recipeToDisplay: Recipe
    recipeToRemove: (id?: string) => void
    recipeToUpdate: (recipe: Recipe, id?: string) => void
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

    function handleEdit() {
        //navigate("/recipes/" + props.recipeToDisplay.id)
        handleOpen()
    }


    function updateRecipe(recipe: Recipe, id: string,) {
        if (props.recipeToDisplay.id) {
            props.recipeToUpdate(recipe, id)
        }
    }

    return (
        <div>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 1,
                m: 1,
                borderRadius: 1
            }}>
                <RecipeCard recipeToDisplay={props.recipeToDisplay}/>
            </Box>
            <Button onClick={onDeleteClick} variant="outlined">Löschen</Button>
            <Button onClick={handleEdit} variant="outlined">Ändern</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Rezept Bearbeiten</DialogTitle>
                <DialogContent>
                    <RecipeUpdateForm currentRecipe={props.recipeToDisplay} handleUpdateRecipe={updateRecipe}/>
                    {/* <RecipeCard recipeToDisplay={props.recipeToDisplay}/>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )


}