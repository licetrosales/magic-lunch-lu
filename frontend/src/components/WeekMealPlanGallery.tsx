import {
    Box,
    Button,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    ListItem,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {WeekMealPlan} from "../model/WeekMealPlan";
import List from "@mui/material/List";
import RecipeWeekMealPlanGallery from "./RecipeWeekMealPlanGallery";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {useState} from "react";
import WeekMealPlanModalDialog from "./WeekMealPlanModalDialog";

type WeekMealPlanGalleryProps = {
    weekMealPlanToMap: WeekMealPlan[]
}


export default function WeekMealPlanGallery(props: WeekMealPlanGalleryProps) {

    console.log(props.weekMealPlanToMap[0])
    return (props.weekMealPlanToMap !== undefined && props.weekMealPlanToMap.length > 0 ?
            <Stack alignItems={"center"}>
                <List>{
                    props.weekMealPlanToMap.map((weekMealPlan, index) =>
                        <ListItem key={weekMealPlan.id} divider>
                            <ListItemText
                                primary={"Wochenplan: " + weekMealPlan.id}
                            />
                            <Box m={3} pt={0}>
                                <WeekMealPlanModalDialog weekMealPlan={weekMealPlan.weekMealPlan}/>
                            </Box>
                        </ListItem>
                    )
                }
                </List>
            </Stack> : <p>Dein Wochenplan</p>
    )
}