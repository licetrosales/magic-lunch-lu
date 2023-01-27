import {Grid, Typography} from "@mui/material";

export default function Info() {
    return (
        <Grid container direction={"column"} alignItems={"center"} justifySelf={"center"}
              style={{minHeight: "100vh"}} spacing={5}>
            <Grid item margin={2} >
            </Grid>
            <Grid>
                <Typography>Version 1.0.1</Typography>

                <Typography>© 2023</Typography>

                <Typography>Dr. Licet Ullmann</Typography>
                <Typography>All rights reserved</Typography>
            </Grid>
        </Grid>

    )
}