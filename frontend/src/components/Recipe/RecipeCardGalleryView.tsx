import {Recipe} from "../../model/Recipe";
import "../../images/BigMacSalat.jpg"
import {Box, Button} from "@mui/material";
import RecipeCard from "./RecipeCard";
import TemplateAddUpdateRecipeForm from "./TemplateAddUpdateRecipeForm";

type RecipeCardGalleryViewProps = {
    recipeToDisplay: Recipe
    recipeToRemove: (id?: string) => void
    recipeToUpdate: (recipe: Recipe, imgToUpdate?: File, id?: string) => void
}
export default function RecipeCardGalleryView(props: RecipeCardGalleryViewProps) {

    function onDeleteClick() {
        props.recipeToRemove(props.recipeToDisplay.id)
    }


    function updateRecipe(recipe: Recipe, imgToUpdate: File, id: string) {
        if (props.recipeToDisplay.id) {
            props.recipeToUpdate(recipe, imgToUpdate, id)
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