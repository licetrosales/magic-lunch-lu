import RecipeGallery from "./RecipeGallery";
import {useEffect, useState} from "react";
import {Recipe} from "../model/Recipe";
import axios from "axios";

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
                console.log("There is an error by get request: " + errorMessageResponse)
            })
    }

    return (
        <section>
            <h1>Meine Rezepte</h1>
            <RecipeGallery recipesToMap={recipes}/>
        </section>
    )

}