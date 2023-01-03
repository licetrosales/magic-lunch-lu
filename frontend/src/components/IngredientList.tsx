import {AppBar, Button, Container, ListItem, ListItemText, Stack, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import List from "@mui/material/List"
import {Ingredient} from "../model/Ingredient";
import AddItem from "./AddItem";
type IngredientListProps={
    handleCallbackItems(childData:Ingredient[]):void
}

export default function IngredientList(props: IngredientListProps) {
    const [items, setItems] = useState<Ingredient []>([])

    function addItem(item: Ingredient) {
        setItems(prevItems => {
            return [item, ...prevItems]
        })
    }
function onTrigger(){
        props.handleCallbackItems(items)
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
                <Stack alignItems={"left"}>
                    <AddItem handleAddItem={addItem}/>
                    <List>{
                        items.map((item, index) =>
                            <ListItem key={index} divider>
                                <ListItemText
                                    primary={item.quantity + " " + item.itemName}
                                />
                            </ListItem>
                        )
                    }
                    </List>
                    <Button onClick={onTrigger}>Add Ingredients</Button>
                </Stack>
            </Container>
        </div>
    )
}