import {ListItem, ListItemText, Stack} from "@mui/material";

import RecipeCard from "../Recipe/RecipeCard";
import {Meal} from "../../model/Meal";
import List from "@mui/material/List";

type RecipeWeekMealPlanGalleryProps = {
    mealsToMap: Meal[]
}
export default function RecipeWeekMealPlanGallery(props: RecipeWeekMealPlanGalleryProps) {

    return (props.mealsToMap && props.mealsToMap.length > 0 ?
            <Stack alignItems={"center"}>
                <List>{

                    props.mealsToMap.map((meal, index) =>
                        <ListItem key={meal.id} divider>
                            <ListItemText
                                primary={""+meal.date}
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