import {AppBar, Container, ListItem, ListItemText, Stack, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import List from "@mui/material/List"
import {Ingredient} from "../model/Ingredient";
import AddItem from "./AddItem";


export default function IngredientList() {
    const [items, setItems] = useState<Ingredient []>([])

    function addItem(item: Ingredient) {
        setItems(prevItems => {
            return [item, ...prevItems]
        })
    }

    return (
        <div className="Ingridient-list">
            <Container>
                {/*<AppBar>
                    <Toolbar>
                        <Typography variant={"h6"}>
                            Zutaten
                        </Typography>
                    </Toolbar>
                </AppBar>*/}
                <Stack alignItems={"center"}>
                    <AddItem handleAddItem={addItem}/>
                    <List>{
                        items.map((item, index) =>
                            <ListItem key={index} divider>
                                <ListItemText
                                    primary={item.quantity + " " + item.nameItem}
                                />
                            </ListItem>
                        )
                    }
                    </List>
                </Stack>
            </Container>
        </div>
    )
}