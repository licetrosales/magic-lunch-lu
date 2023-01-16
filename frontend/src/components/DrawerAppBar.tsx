import {Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import List from "@mui/material/List";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';

import RamenDiningIcon from '@mui/icons-material/RamenDining';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";


export default function DrawerAppBar() {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const pages = ["Startseite","Meine Rezepte", "Wochenplan", "Impressum"]
    const pagesIcons = [<HomeIcon/>, <RamenDiningIcon/>, <DateRangeIcon/>, <InfoIcon/>]
    const routes = ["/", "/recipes", "/weekplan-history", "/impressum"]
    return (
        <div>
            <Drawer open={openDrawer}
                    onClose={() => setOpenDrawer(false)}>
                <List>
                    {
                        pages.map((page, index) => (
                            <ListItemButton onClick={() => setOpenDrawer(false)} key={index}
                            component = {Link} to={`/${routes[index]}`}>
                                <ListItemIcon>
                                    {pagesIcons[index]}
                                    <ListItemText>
                                        <Typography sx={{fontSize: "1rem", paddingLeft: "5%", paddingRight: "10%"}}>
                                            {page}
                                        </Typography>

                                    </ListItemText >
                                </ListItemIcon >

                            </ListItemButton>
                        ))
                    }
                </List>
            </Drawer >
            <IconButton sx={{color: "white",  marginLeft: "auto",}} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon/>
            </IconButton>
        </div>
    )
}
