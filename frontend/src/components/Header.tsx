import React, {Fragment, useState} from "react";
import {AppBar, Button, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import DiningRoundedIcon from '@mui/icons-material/DiningRounded';
export default function Header(){
    const [tabValue, setTabvalue] = useState<boolean>();
    return (

        <div>
            <AppBar sx={{background: "#ac8b62"}}>
                <Toolbar>
                    <DiningRoundedIcon/>
                    <Typography variant={"h6"}>
                        Meine Rezepte
                    </Typography>
                    <Tabs textColor={"inherit"}
                          value={tabValue}
                          onChange={(event, tabValue) => setTabvalue(tabValue)}
                          indicatorColor={"secondary"}>
                        <Tab label={"Meine Rezepte"}/>
                        <Tab label={"Wochenplan"}/>
                        <Tab label={"Wochenplanchronik"}/>
                        <Tab label={"Meine Impressum"}/>
                    </Tabs>
                    <Button sx={{marginLeft:"auto"}} variant={"contained"}>Login</Button>
                    <Button sx={{marginLeft:"10px"}} variant={"contained"}>Sign up</Button>

                </Toolbar>
            </AppBar>

        </div>
    )
}