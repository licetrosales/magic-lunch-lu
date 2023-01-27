import {Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import List from "@mui/material/List";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';

import RamenDiningIcon from '@mui/icons-material/RamenDining';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';


export default function DrawerAppBar() {

    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const pages = ["Startseite", "Meine Rezepte", "Wochenplan", "Info", "Logout"]
    const pagesIcons = [<HomeIcon/>, <RamenDiningIcon/>, <DateRangeIcon/>, <InfoIcon/>, <LogoutIcon/>]
    const routes = ["/", "/recipes", "/mealplans", "/info", "/logout"]
    const navigate = useNavigate()

    return (
        <div>
            <Drawer open={openDrawer}
                    onClose={() => setOpenDrawer(false)}>
                <List>
                    {
                        pages.map((page, index) => (
                            <ListItemButton onClick={() => {
                                setOpenDrawer(false)
                                navigate(routes[index])
                            }} key={pages[index]}
                            >
                                <ListItemIcon>
                                    {pagesIcons[index]}
                                    <ListItemText>
                                        <Typography sx={{fontSize: "1rem", paddingLeft: "5%", paddingRight: "10%"}}>
                                            {page}
                                        </Typography>

                                    </ListItemText>
                                </ListItemIcon>

                            </ListItemButton>
                        ))
                    }
                </List>
            </Drawer>
            <IconButton sx={{color: "white", marginLeft: "auto",}} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon/>
            </IconButton>
        </div>
    )
}
