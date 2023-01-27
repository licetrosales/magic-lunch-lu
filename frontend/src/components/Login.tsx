import "./Home.style.css"
import {Button, Grid, TextField, Typography} from "@mui/material";

export default function Login() {
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

                <Grid item margin={2} >
                    <TextField
                        variant={"outlined"}
                        label={"Benutzername / E-Mail"}
                        fullWidth
                        style={{marginBottom: "2em"}}
                    color={"secondary"}>

                    </TextField>

                    <TextField
                        variant={"outlined"}
                        label={"Passwort"}
                        fullWidth
                        color={"secondary"}
                    >

                    </TextField>
                </Grid>
                <Grid>
                    <Button size={"small"} variant={"contained"} color={"inherit"}  style={{marginBottom: "1em"}}>Login</Button>
                </Grid>
                <Grid>
                    <Grid item margin={2}>
                        <Typography>Passwort vergessen?</Typography>
                    </Grid>
                </Grid>
                <Grid>
                    <Button size={"small"} variant={"contained"} color={"secondary"}>Registrieren</Button>
                </Grid>


            </Grid>
        </div>
    )
}