import RecipeGallery from "./RecipeGallery";
import {useEffect, useState} from "react";
import {
    DishTypeCategory,
    MealType,
    MenuCategory,
    NewRecipe,
    NewRecipeWithId,
    Recipe,
    RecipeCategory
} from "../../model/Recipe";
import axios from "axios";
import {Box, Container} from "@mui/material";
import TemplateAddUpdateRecipeForm from "./TemplateAddUpdateRecipeForm";

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

    function addRecipe(newRecipeWithoutId: Recipe, imageToUpload?: File) {

        const formData = new FormData()
        if(imageToUpload !== undefined){
        formData.append("file", imageToUpload)
        }
        formData.append("recipe", new Blob([JSON.stringify(newRecipeWithoutId)], {type: "application/json"}))
        axios.post(recipeBaseUrl, formData)
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

    function updateRecipe(modifiedRecipe: Recipe, imageToUpdate?: File, id?: string) {
        console.log(modifiedRecipe)
        const formData = new FormData()
        if(imageToUpdate !== undefined){
            formData.append("file", imageToUpdate)
        }
        formData.append("recipe", new Blob([JSON.stringify(modifiedRecipe)], {type: "application/json"}))

        axios.put(recipeBaseUrl + "/" + modifiedRecipe.id,modifiedRecipe)
            .then((newRecipeResponse) => {
                    const indexOfModifiedElement = recipes.findIndex(recipe => recipe.id === modifiedRecipe.id)
                    let copyOfRecipes = [...recipes]
                    copyOfRecipes[indexOfModifiedElement] = newRecipeResponse.data
                    setRecipes(copyOfRecipes)
                }
            )
    }

    const emptyRecipeFormWithoutEnums: Recipe = {
        id: "",
        name: "",
        mealType: MealType.BREAKFAST,
        source: "",
        image: "",
        ingredients: [],
        prepTime: "",
        preparation: "",
        dishTypeCategory: DishTypeCategory.VEGGIE,
        portions: 1,
        favorite: false,
        recipeCategory: RecipeCategory.LOW_CARB,
        menuCategory: MenuCategory.MAIN_COURSE,
        garnish: ""
    }



    return (
        <section className={"section-content"}>
            <Container>
                <Box sx={{flexGrow: 1}}>
                    <TemplateAddUpdateRecipeForm currentRecipe={emptyRecipeFormWithoutEnums}
                                                 handleCreateUpdateRecipe={addRecipe} isNew={true}/>
                    <RecipeGallery recipesToMap={recipes} recipeToRemove={removeRecipe} recipeToUpdate={updateRecipe}/>
                </Box>
            </Container>
        </section>
    )

}