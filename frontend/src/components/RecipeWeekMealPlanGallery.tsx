import {Container, ListItem, ListItemText, Stack, Typography} from "@mui/material";

import RecipeCard from "./Recipe/RecipeCard";

import {Meal} from "../model/Meal";
import List from "@mui/material/List";
import {useEffect, useState} from "react";

type RecipeWeekMealPlanGalleryProps = {
    mealsToMap: Meal[]
}
export default function RecipeWeekMealPlanGallery(props: RecipeWeekMealPlanGalleryProps) {


    console.log(props.mealsToMap)

    return (props.mealsToMap && props.mealsToMap.length > 0 ?
            <Stack alignItems={"center"}>
                <List>)(props.mealsToMap){

                    props.mealsToMap.map((meal, index) =>
                        <ListItem key={meal.id} divider>
                            <ListItemText
                                primary={"Tag: " + meal.id}
                            />
                            <ListItemText>
                                <RecipeCard recipeToDisplay={meal.recipe} key={meal.id}/>
                            </ListItemText>
                        </ListItem>
                    )}

                </List>
            </Stack> : <p>***</p>
    )
}