import {Button, Container, ListItem, ListItemText, Stack} from "@mui/material";
import {useState} from "react";
import List from "@mui/material/List"
import {Ingredient} from "../model/Ingredient";
import AddItem from "./AddItem";

type IngredientListProps = {
    handleCallbackItems(childData: Ingredient[]): void
}

export default function IngredientList(props: IngredientListProps) {
    const [items, setItems] = useState<Ingredient []>([])

    function addItem(item: Ingredient) {
        setItems(prevItems => {
            return [item, ...prevItems]
        })
    }

    function onTrigger() {
        props.handleCallbackItems(items)
    }

    return (
        <div className="Ingridient-list">
            <Container>
                <Stack alignItems={"left"}>
                    <List>{
                        items.map((item, index) =>
                            <ListItem key={item.id} divider>
                                <ListItemText

                                    primary={item.quantity + " " + item.unit + " " + item.name}
                                />
                            </ListItem>
                        )
                    }
                    </List>
                    <AddItem handleAddItem={addItem}/>
                    <Button onClick={onTrigger}>Zutaten hinzufügen</Button>
                </Stack>
            </Container>
        </div>
    )
}