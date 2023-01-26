import "./Home.style.css"
import {Grid, Typography} from "@mui/material";
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import TapasIcon from '@mui/icons-material/Tapas';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

export default function Home() {
    return (

        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "lavender",
                backgroundImage: "url(/background.png)"
            }}
        >
            <Grid container direction={"column"} alignItems={"center"} justifySelf={"center"}
                  style={{minHeight: "100vh"}} spacing={5}>

                <Grid item margin={2}>
                    <Typography variant={"h5"} sx={{fontSize: "1.25rem", paddingLeft: "0%", paddingRight: "0%"}}></Typography></Grid>
                <Grid>
                    <LunchDiningIcon/>
                    <DinnerDiningIcon/>
                </Grid>

                <Grid>
                    <RamenDiningIcon/>
                    <BrunchDiningIcon/>
                </Grid>
                <Grid>
                    <TapasIcon/>
                    <SoupKitchenIcon/>
                </Grid>


            </Grid>
        </div>
    )
}