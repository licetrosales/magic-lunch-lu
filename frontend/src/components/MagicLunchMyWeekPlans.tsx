import {Box, Button, Grid, Typography} from "@mui/material";
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import {useEffect, useState} from "react";
import {MealType, Recipe} from "../model/Recipe";
import RecipeGallery from "./Recipe/RecipeGallery";
import WeekMealPlanGallery from "./WeekMealPlanGallery";
import axios from "axios";


class Meal {
}

export default function MagicLunchMyWeekPlans() {
    const [newWeekMealPlan, setNewWeekMealPlan] = useState<Meal[]>([])

    const [recipes, setRecipes] = useState<Recipe[]>([])
    const weekMealPlanBaseUrl = "/api/users/userId/mealplans"
    const recipeBaseUrl = "/api/users/userId/recipes"
   
    useEffect(() => {

    }, [])
   
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

    function onClickAddWeekMealPlan(){
        getRecipes()
        axios.post(weekMealPlanBaseUrl, newWeekMealPlan)
            .then(newWeekMealPlanResponse => {
                setRecipes(prevWeekMealPlanGallery => {
                    return [...prevWeekMealPlanGallery, newWeekMealPlanResponse.data]
                })
            })
            .catch(errorMessageReponse => {
                console.error("There is an error by POST request: " + errorMessageReponse)
            })
    }
    const currentWeek = [Date.now()]
    return (
        <Grid container direction={"column"} alignItems={"center"} justifySelf={"center"} style={{minHeight:"100vh"}} spacing={5}>

            <Grid item margin={2}>
                <Typography>Vorschlag generieren</Typography>
            </Grid>
            <Grid item>
                <Button className="button-primary" onClick={onClickAddWeekMealPlan} size = {"large"} variant={"outlined"} color={"secondary"}
                        startIcon={<AutoFixHighTwoToneIcon/>}></Button>
            </Grid>
            <Grid item>
              <WeekMealPlanGallery recipeToMap={recipes}/>

            </Grid>


        </Grid>
    )
}