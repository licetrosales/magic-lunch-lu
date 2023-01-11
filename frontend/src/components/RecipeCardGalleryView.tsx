import {Recipe} from "../model/Recipe";
import "../images/BigMacSalat.jpg"
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
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
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 1,
                m: 1,
                borderRadius: 1
            }}>
            <RecipeCard recipeToDisplay={props.recipeToDisplay}/>
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
            </Box>
            </div>
    )


}