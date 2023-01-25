import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

import {Meal} from "../../model/Meal";
import {useState} from "react";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RecipeWeekMealPlanGallery from "./RecipeWeekMealPlanGallery";

type WeekMealPlanModalialogProps = {
    weekMealPlan: Meal []
}
export default function WeekMealPlanModalDialog(props: WeekMealPlanModalialogProps) {
    const [openMealPlan, setOpenMealPlan] = useState<boolean>(false)

    function handleOpenMealPlan() {
        setOpenMealPlan(true)
    }

    function handleCloseMealPlan() {
        setOpenMealPlan(false)
    }


    return (props.weekMealPlan && props.weekMealPlan.length > 0 ?
            <>    <Button onClick={handleOpenMealPlan} color={"secondary"} variant={"outlined"}
                          startIcon={<LocalDiningIcon/>}/>

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
                </Dialog>
            </> : <p>Modal dialog do not show recipes </p>
    )
}