import React, {Fragment, useState} from "react";
import {AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import DiningRoundedIcon from '@mui/icons-material/DiningRounded';
import DrawerAppBar from "./DrawerAppBar";

export default function Header() {
    const [tabValue, setTabvalue] = useState<boolean>();
    const theme = useTheme()
    console.log(theme)
    const isMatch = useMediaQuery(theme.breakpoints.down("md"))
    const pages = ["Meine Rezepte", "Wochenplan", "Wochenplanchronik", "Impressum"]
    return (

        <div>
            <AppBar sx={{background: "#ac8b62"}}>
                <Toolbar>
                    <DiningRoundedIcon/>
                    {
                        isMatch ? (
                            <>
                                <Typography sx={{fontSize:"1rem", paddingLeft:"10%"}}>
                                    Magic Lunch
                                </Typography>
                                <DrawerAppBar/>
                            </>
                        ) : (
                            <>
                                <Tabs sx={{marginLeft:"auto"}}
                                      textColor={"inherit"}
                                      value={tabValue}
                                      onChange={(event, tabValue) => setTabvalue(tabValue)}
                                      indicatorColor={"secondary"}>

                                    {
                                        pages.map((page, index)=>
                                            <Tab key= {"index"}label={page} />
                                        )
                                    }

                                </Tabs>
                                <Button sx={{marginLeft: "auto"}} variant={"contained"}>Login</Button>
                                <Button sx={{marginLeft: "10px"}} variant={"contained"}>Sign up</Button>
                            </>
                        )
                    }
                </Toolbar>

            </AppBar>

        </div>
    )
}