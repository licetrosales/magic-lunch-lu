import RecipeGallery from "./RecipeGallery";
import {useEffect, useState} from "react";
import {Recipe} from "../model/Recipe";
import axios from "axios";
import CreateRecipeForm from "./CreateRecipeForm";
import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";

export default function MyMagicLunchApp() {

    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [state, setState] = useState<any>()

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

            /* .then(newRecipeResponse => {

                 let recipes = [...state.recipes]
                 let recipe = {...recipes[1]}
                 recipe = modifiedRecipe
                 recipes[1] = recipe
                 setRecipes({prevRecipeGallery => {
                     return {recipes}
                 }})


             })*/


            /*           .then(() => {
                           setState(({recipes}: Recipe []) => ({
                               recipes: [
                                   ...recipes.slice(0, 1),
                                   {
                                       ...recipes[1],
                                       recipe: recipes[recipes.indexOf(recipe)]
                                   },
                                   ...recipes.slice(2)
                               ]
                           }))

                       })*/
            .then((newRecipeResponse) => {
                const index = recipes.indexOf(modifiedRecipe)
                let copyOfRecipes = [...recipes]
                copyOfRecipes[index] = newRecipeResponse.data
                setRecipes(copyOfRecipes)
            }

            ).then(getRecipes)
    }


    return (
        <section>
            <Container>
                <Box sx={{flexGrow: 1}}>
                    <AppBar>
                        <Toolbar>
                            <Typography variant={"h6"}>
                                Meine Rezepte
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <RecipeGallery recipesToMap={recipes} recipeToRemove={removeRecipe} recipeToUpdate={updateRecipe}/>
                    <CreateRecipeForm handleCreateRecipe={addRecipe}/>
                </Box>
            </Container>
        </section>
    )

}