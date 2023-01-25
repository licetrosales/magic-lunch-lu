import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import RecipeWeekMealPlanGallery from "./RecipeWeekMealPlanGallery";
import {Meal} from "../model/Meal";
import {useState} from "react";
import {WeekMealPlan} from "../model/WeekMealPlan";
type WeekMealPlanModalialogProps = {
    openMealPlan: boolean,
    weekMealPlan: Meal []
}
export default function WeekMealPlanModalDialog (props: WeekMealPlanModalialogProps){
const [openMealPlan, setOpenMealPlan] = useState<boolean>(false)
    setOpenMealPlan(props.openMealPlan)
function handleCloseMealPlan() {

    setOpenMealPlan(false)
}
return(props.weekMealPlan && props.weekMealPlan.length > 0 ?
    <Dialog open={openMealPlan} onClose={handleCloseMealPlan}>
        <DialogTitle>Wocheplan</DialogTitle>
        <DialogContent>
            <RecipeWeekMealPlanGallery mealsToMap={props.weekMealPlan}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseMealPlan} color={"secondary"}>
                Schließen
            </Button>
        </DialogActions>
    </Dialog>: <p>Modal dialog do not show recipes</p>
)
}