import RecipeGallery from "./RecipeGallery";
import {useEffect, useState} from "react";
import {Recipe} from "../model/Recipe";
import axios from "axios";
import CreateRecipeForm from "./CreateRecipeForm";
import {AppBar, Container, Toolbar, Typography} from "@mui/material";

export default function MyMagicLunchApp() {

    const [recipes, setRecipes] = useState<Recipe[]>([])
    useEffect(() => {
        getRecipes()
    }, [])

    const recipeBaseUrl = "/api/users/userId/recipes"

    function getRecipes() {
        axios.get(recipeBaseUrl)
            .then(recipeGalleryResponse => {
                const newRecipeGallery: Recipe [] = recipeGalleryResponse.data;
                setRecipes(newRecipeGallery);
            })
            .catch(errorMessageResponse => {
                console.error("There is an error by GET request: " + errorMessageResponse)
            })
    }

    function addRecipe(newRecipeWithoutId: Recipe) {
        axios.post(recipeBaseUrl, newRecipeWithoutId)
            .then(newRecipeResponse => {
                    setRecipes(prevRecipeGallery => {
                    return [...prevRecipeGallery, newRecipeResponse.data]
                })
            })
            .catch(errorMessageReponse => {
                console.error("There is an error by POST request: " + errorMessageReponse)
            })
    }

    function removeRecipe(id?: string){
        axios.delete(recipeBaseUrl+"/" + id)
            .then(() => {
                setRecipes(prevRecipeGallery => {
                    return prevRecipeGallery.filter((recipe) => recipe.id !== id)
                })
            })
    }

    return (
        <section>
            <Container>
                <AppBar>
                    <Toolbar>
                        <Typography variant={"h6"}>
                            Meine Rezepte
                        </Typography>
                    </Toolbar>
                </AppBar>
                <RecipeGallery recipesToMap={recipes} recipeToRemove={removeRecipe} />
                <CreateRecipeForm handleCreateRecipe={addRecipe}/>
            </Container>
        </section>
    )

}