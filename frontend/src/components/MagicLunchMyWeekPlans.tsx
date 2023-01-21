import {Box, Button, Grid, Typography} from "@mui/material";
import AutoFixHighTwoToneIcon from '@mui/icons-material/AutoFixHighTwoTone';

export default function MagicLunchMyWeekPlans() {
    return (
        <Grid container direction={"column"} alignItems={"center"} justifySelf={"center"} style={{minHeight:"100vh"}} spacing={5}>

            <Grid item>
                <Typography>Get a random meal by clicking below</Typography>
            </Grid>
            <Grid item>
                <Button className="button-primary" variant={"contained"} color={"secondary"}
                        startIcon={<AutoFixHighTwoToneIcon/>}>Vorschlag genenieren</Button>
            </Grid>


        </Grid>
    )
}