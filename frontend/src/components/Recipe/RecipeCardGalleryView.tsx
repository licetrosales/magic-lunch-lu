import {Recipe} from "../../model/Recipe";
import "../../images/BigMacSalat.jpg"
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import RecipeCard from "./RecipeCard";
import TemplateAddUpdateRecipeForm from "./TemplateAddUpdateRecipeForm";

type RecipeCardGalleryViewProps = {
    recipeToDisplay: Recipe
    recipeToRemove: (id?: string) => void
    recipeToUpdate: (recipe: Recipe, id?: string) => void
}
export default function RecipeCardGalleryView(props: RecipeCardGalleryViewProps) {


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

    function addRecipe(recipe: Recipe) {
        props.recipeToUpdate(recipe)
    }

    function updateRecipe(recipe: Recipe, id: string) {
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
            <Box m={1}
                 display="flex"
                 justifyContent="center"
                 alignItems="center">
                <Button onClick={onDeleteClick} variant="outlined" color="secondary">Löschen</Button>
                <TemplateAddUpdateRecipeForm currentRecipe={props.recipeToDisplay}
                                             handleCreateUpdateRecipe={updateRecipe} isNew={false}/>
            </Box>
        </div>
    )


}