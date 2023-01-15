import {Drawer, IconButton, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';

export default function DrawerAppBar() {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const pages = ["Meine Rezepte", "Wochenplan", "Wochenplanchronik", "Impressum", "login", "logout"]
    return (
        <div>
            <Drawer open={openDrawer}
                    onClose={() => setOpenDrawer(false)}>
                <List>
                    {
                        pages.map((page, index)=>(
                            <ListItemButton onClick={()=>setOpenDrawer(false)} key={index}>
                                <ListItemIcon>
                                    <ListItemText>
                                        {page}
                                    </ListItemText>
                                </ListItemIcon>

                            </ListItemButton>
                        ))


                    }
                </List>
            </Drawer>
            <IconButton  sx={{color: "white", marginLeft:'auto'}} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon/>
            </IconButton>
        </div>
    )
}
