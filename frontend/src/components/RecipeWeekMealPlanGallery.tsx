import {Container, ListItem, ListItemText, Stack, Typography} from "@mui/material";

import RecipeCard from "./Recipe/RecipeCard";

import {Meal} from "../model/Meal";
import List from "@mui/material/List";
import {useEffect, useState} from "react";

type RecipeWeekMealPlanGalleryProps = {
    mealsToMap: Meal[]

}

export default function RecipeWeekMealPlanGallery(props:RecipeWeekMealPlanGalleryProps) {



    return (
        <Stack alignItems={"center"}>
            <List>)(props.mealsToMap){

                props.mealsToMap.map((meal, index) =>
                    <ListItem key={meal.id} divider>
                        <ListItemText
                            primary={"Tag: " + meal.id}
                        />
                       {/* <RecipeCard recipeToDisplay={meal.recipe} key={meal.id}/>*/}
                    </ListItem>
               )}

            </List>
        </Stack>
    )
}