import {
    Box,
    ListItem,
    ListItemText,
    Stack
} from "@mui/material";
import {WeekMealPlan} from "../../model/WeekMealPlan";
import List from "@mui/material/List";
import WeekMealPlanModalDialog from "./WeekMealPlanModalDialog";

type WeekMealPlanGalleryProps = {
    weekMealPlanToMap: WeekMealPlan[]
}
export default function WeekMealPlanGallery(props: WeekMealPlanGalleryProps) {

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