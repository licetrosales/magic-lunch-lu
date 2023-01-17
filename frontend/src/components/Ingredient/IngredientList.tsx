import {Button, Container, ListItem, ListItemText, Stack} from "@mui/material";
import {useState} from "react";
import List from "@mui/material/List"
import {Ingredient} from "../../model/Ingredient";
import TemplateAddUpdateIngredient from "./TemplateAddUpdateIngredient"
import uuid from "react-uuid";

type IngredientListProps = {
    handleCallbackItems(childData: Ingredient[]): void
}

export default function IngredientList(props: IngredientListProps) {
    const [items, setItems] = useState<Ingredient []>([])


    function handleAddItem(item: Ingredient) {
        setItems(prevItems => {
            return [item, ...prevItems]
        })
    }

    function handleOnClick() {
        props.handleCallbackItems(items)
    }

    const newIngredient: Ingredient = {
        id: uuid(),
        name: "",
        quantity: "",
        unit: ""
    }

    return (
        <div className="Ingredient-list">
            <Container>
                <Stack alignItems={"center"}>
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
                    <TemplateAddUpdateIngredient current={newIngredient} handleNewUpdatedIngredient={handleAddItem}
                                                 isNew={true}/>
                    <Button onClick={handleOnClick} variant={"outlined"} component={"label"} color={"secondary"}>
                        Zutatenliste speichern
                    </Button>
                </Stack>
            </Container>
        </div>
    )
}