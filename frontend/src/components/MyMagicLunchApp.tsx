import RecipeGallery from "./RecipeGallery";
import {useEffect, useState} from "react";
import {Recipe} from "../model/Recipe";
import axios from "axios";
import CreateRecipeForm from "./CreateRecipeForm";
import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import Header from "./Header";

export default function MyMagicLunchApp() {

    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        getRecipes()
    }, [])
    //const recipeBaseUrl = "http://localhost:8080/api/users/userId/recipes"
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
                    // Find index of modifiedRecipe
                    // Was ich gegoogled habe: "js index of element with id"
                    const indexOfModifiedElement = recipes.findIndex(recipe => recipe.id === modifiedRecipe.id)

                    // "js update element at index"
                    let copyOfRecipes = [...recipes]
                    copyOfRecipes[indexOfModifiedElement] = newRecipeResponse.data
                    setRecipes(copyOfRecipes)
                }
            )
    }


    return (
        <section className={"section-content"}>
            <Container>
                <Box sx={{flexGrow: 1} }>

                    <CreateRecipeForm handleCreateRecipe={addRecipe}/>
                    <RecipeGallery recipesToMap={recipes} recipeToRemove={removeRecipe} recipeToUpdate={updateRecipe}/>
                </Box>
            </Container>
        </section>
    )

}