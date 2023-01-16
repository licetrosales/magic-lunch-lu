import RecipeGallery from "./RecipeGallery";
import {useEffect, useState} from "react";
import {Recipe} from "../../model/Recipe";
import axios from "axios";
import CreateRecipeForm from "./CreateRecipeForm";
import {Box, Container} from "@mui/material";

export default function MagicLunchMyRecipes() {

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

    function removeRecipe(id?: string) {
        axios.delete(recipeBaseUrl + "/" + id)
            .then(() => {
                setRecipes(prevRecipeGallery => {
                    return prevRecipeGallery.filter((recipe) => recipe.id !== id)
                })
            })
    }

    function updateRecipe(modifiedRecipe: Recipe, id?: string) {
        console.log(modifiedRecipe)
        axios.put(recipeBaseUrl + "/" + modifiedRecipe.id, modifiedRecipe)
            .then((newRecipeResponse) => {
                    const indexOfModifiedElement = recipes.findIndex(recipe => recipe.id === modifiedRecipe.id)
                    let copyOfRecipes = [...recipes]
                    copyOfRecipes[indexOfModifiedElement] = newRecipeResponse.data
                    setRecipes(copyOfRecipes)
                }
            )
    }

    return (
        <section className={"section-content"}>
            <Container>
                <Box sx={{flexGrow: 1}}>
                    <CreateRecipeForm handleCreateRecipe={addRecipe}/>
                    <RecipeGallery recipesToMap={recipes} recipeToRemove={removeRecipe} recipeToUpdate={updateRecipe}/>
                </Box>
            </Container>
        </section>
    )

}