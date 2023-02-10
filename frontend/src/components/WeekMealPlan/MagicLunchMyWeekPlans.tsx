import {Button, Grid, Typography} from "@mui/material";
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';
import {useEffect, useState} from "react";
import axios from "axios";
import {WeekMealPlan} from "../../model/WeekMealPlan";
import WeekMealPlanGallery from "./WeekMealPlanGallery";


export default function MagicLunchMyWeekPlans() {

    const [weekMealPlans, setWeekMealPlans] = useState<WeekMealPlan[]>([])
    const weekMealPlanBaseUrl = "/api/users/userId/mealplans"


    useEffect(() => {
        getWeekMealPlans()
    }, [])


    function getWeekMealPlans() {
        axios.get(weekMealPlanBaseUrl)
            .then(weekMealPlanGalleryResponse => {
                const newWeekMealPlanGallery: WeekMealPlan [] = weekMealPlanGalleryResponse.data;
                setWeekMealPlans(newWeekMealPlanGallery);
            })
            .catch(errorMessageResponse => {
                console.error("There is an error by GET request: " + errorMessageResponse)
                console.error("Error response:");
                console.error(errorMessageResponse.response.data);
                console.error(errorMessageResponse.response.status);
                console.error(errorMessageResponse.response.headers);
            })

    }

    function addWeekMealPlan(newWeekMealPlan: WeekMealPlan) {

        axios.post(weekMealPlanBaseUrl, newWeekMealPlan)
            .then(newWeekMealPlanResponse => {
                setWeekMealPlans(prevWeekMealPlanGallery => {
                    return [...prevWeekMealPlanGallery, newWeekMealPlanResponse.data]
                })
            })
            .catch(errorMessageReponse => {
                console.error("There is an error by POST request:" + errorMessageReponse)
                console.error(errorMessageReponse.response.data);
                console.error(errorMessageReponse.response.status);
                console.error(errorMessageReponse.response.headers);
            })
    }

    const emptyWeekMealPlan: WeekMealPlan = {
        id: "",
        weekMealPlan: []
    }

    function onclickAddWeekMealPlan() {
        addWeekMealPlan(emptyWeekMealPlan)
    }

    function removeWeekMealPlan(id?: string) {
        axios.delete(weekMealPlanBaseUrl + "/" + id)
            .then(() => {
                setWeekMealPlans(prevWeekMealPlansGallery => {
                    return prevWeekMealPlansGallery.filter((weekMealPlan) => weekMealPlan.id !== id)
                })
            })
    }

    return (
        <Grid container direction={"column"} alignItems={"center"} justifySelf={"center"} style={{minHeight: "100vh"}}
              spacing={5}>

            <Grid item margin={2}>
                <Typography>Vorschlag generieren</Typography>
            </Grid>
            <Grid item>
                <Button className="button-primary" onClick={onclickAddWeekMealPlan} size={"large"} variant={"outlined"}
                        color={"secondary"}
                        startIcon={<AutoFixHighTwoToneIcon/>}></Button>
            </Grid>
            <Grid item>
                <WeekMealPlanGallery weekMealPlanToMap={weekMealPlans} weekMealPlanToRemove={removeWeekMealPlan}/>

            </Grid>


        </Grid>
    )
}