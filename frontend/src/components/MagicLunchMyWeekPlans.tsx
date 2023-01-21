import {Box, Button, Grid, Typography} from "@mui/material";
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import {useState} from "react";
import {MealType} from "../model/Recipe";


class Meal {
}

export default function MagicLunchMyWeekPlans() {
    const [newWeekMealPlan, setNewWeekMealPlan] = useState<Meal[]>([])
    function onClickGenerateWeekMealPlan(){

    }
    return (
        <Grid container direction={"column"} alignItems={"center"} justifySelf={"center"} style={{minHeight:"100vh"}} spacing={5}>

            <Grid item>
                <Typography>Get a random meal by clicking below</Typography>
            </Grid>
            <Grid item>
                <Button className="button-primary" onClick={onClickGenerateWeekMealPlan} variant={"contained"} color={"secondary"}
                        startIcon={<AutoFixHighTwoToneIcon/>}>Vorschlag genenieren</Button>
            </Grid>


        </Grid>
    )
}