import React, {useState} from "react";
import {AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import DrawerAppBar from "./DrawerAppBar";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import {Link} from "react-router-dom";

export default function Header() {
    const [tabValue, setTabvalue] = useState("/");
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down("md"))
    const pages = ["Startseite", "Meine Rezepte", "Wochenplan", "Impressum"]
    const routes = ["/", "/recipes", "/mealplans", "/impressum"]
    return (

        <div>

            <AppBar sx={{background: "#7e4ea5"}} position="sticky">
                <Toolbar>
                    {
                        isMatch ? (
                            <>
                                <DrawerAppBar/>
                                <Typography sx={{fontSize: "1.25rem", paddingLeft: "2%", paddingRight: "1%"}}>
                                    Magic Lunch
                                </Typography>
                                <AutoFixHighIcon/>

                            </>
                        ) : (
                            <>
                                <AutoFixHighIcon/>
                                <Tabs sx={{marginLeft: "auto"}}
                                      textColor={"inherit"}
                                      value={tabValue}
                                      onChange={(event, tabValue) => setTabvalue(tabValue)}
                                      indicatorColor={"secondary"}

                                >
                                    {
                                        pages.map((page, index) =>
                                            <Tab label={page} value={routes[index]} component={Link} to={routes[index]}
                                                 key={"index"}/>
                                        )
                                    }

                                </Tabs>
                                <Button sx={{marginLeft: "auto"}} variant={"contained"}
                                        color={"secondary"}>Logout</Button>
                            </>
                        )
                    }
                </Toolbar>

            </AppBar>
        </div>
    )
}