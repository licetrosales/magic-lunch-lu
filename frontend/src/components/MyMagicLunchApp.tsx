import RecipeGallery from "./RecipeGallery";
import {useEffect, useState} from "react";
import {Recipe} from "../model/Recipe";
import axios from "axios";
import CreateRecipeForm from "./CreateRecipeForm";
import IngredientList from "./IngredientList";

export default function MyMagicLunchApp() {

    const [recipes, setRecipes] = useState<Recipe[]>([])
    useEffect(() => {
        getRecipes()
    },[])

    const recipeBaseUrl="/api/users/userId/recipes"
    function getRecipes(){
        axios.get(recipeBaseUrl)
            .then(recipeGalleryResponse =>{
                const newRecipeGallery : Recipe [] = recipeGalleryResponse.data;
                setRecipes(newRecipeGallery);
            })
            .catch(errorMessageResponse => {
                console.log("There is an error by GET request: " + errorMessageResponse)
            })
    }
    function addRecipe(newRecipeWithoutId: Recipe){
        axios.post(recipeBaseUrl, newRecipeWithoutId)
            .then(newRecipeResponse => {
                console.log("Neue Rezept: " + newRecipeResponse.data)
                setRecipes(prevRecipeGallery => {
                    return [...prevRecipeGallery, newRecipeResponse.data]
                })
            })
            .catch(errorMessageReponse =>{
                console.log("There is an error by POST request: " + errorMessageReponse)
        })
    }

    return (
        <section>
            <h1>Meine Rezepte</h1>
            <RecipeGallery recipesToMap={recipes}/>
            <CreateRecipeForm handleCreateRecipe={addRecipe}/>
            <IngredientList/>
        </section>
    )

}