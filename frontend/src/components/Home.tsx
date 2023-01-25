import "./Home.style.css"
import {Grid, Typography} from "@mui/material";

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
                    <Typography>Willkommen</Typography>
                </Grid>
                <Grid item>

                    <Typography variant={"h6"}> Login</Typography><br/>
                </Grid>
                <Grid item>
                    <Typography variant={"h6"}> Sign up</Typography>

                </Grid>

            </Grid>
        </div>
    )
}