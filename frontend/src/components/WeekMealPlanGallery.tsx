
import {Container, ListItem, ListItemText, Stack} from "@mui/material";
import {WeekMealPlan} from "../model/WeekMealPlan";
import List from "@mui/material/List";

type WeekMealPlanGalleryProps = {
    weekMealPlanToMap: WeekMealPlan[]
}

export default function WeekMealPlanGallery(props: WeekMealPlanGalleryProps) {

    return (
        <Stack alignItems={"center"}>
            <List>{
                props.weekMealPlanToMap.map((weekMealPlan, index) =>
                    <ListItem key={weekMealPlan.id} divider>
                        <ListItemText
                            primary={"Wochenplan: " + weekMealPlan.id}
                        />
                    </ListItem>
                )
            }
            </List>
        </Stack>
    )
}