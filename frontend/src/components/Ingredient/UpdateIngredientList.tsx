import {Ingredient} from "../../model/Ingredient";
import {useState} from "react";
import {Button, Container, ListItem, ListItemText, Stack} from "@mui/material";
import List from "@mui/material/List";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TemplateAddUpdateIngredient from "./TemplateAddUpdateIngredient";
import uuid from "react-uuid";

type UpgradeIngredientListProps = {
    currentIngredients: Ingredient[]
    handleCallbackItems(childData: Ingredient[]): void
}

export default function UpdateIngredientList(props: UpgradeIngredientListProps) {
    const [items, setItems] = useState<Ingredient []>(props.currentIngredients)


    console.log(props.currentIngredients)

    function handleOnClick() {
        props.handleCallbackItems(items)
    }

    function handleAddItem(item: Ingredient) {
        setItems(prevItems => {
            return [item, ...prevItems]
        })
    }
    const newIngredient: Ingredient = {
        id: uuid(),
        name: "",
        quantity: "",
        unit: ""
    }

    function handleDelete(id: string) {
        const newItems = items.filter((li) => li.id !== id)
        setItems(newItems)
    }

    function handleUpdateItem(modifiedItem: Ingredient) {
        const indexOfModifiedItem = items.findIndex(item => item.id === modifiedItem.id)
        let copyOfItems = [...items]
        copyOfItems[indexOfModifiedItem] = modifiedItem
        setItems(copyOfItems)
    }

    return (
        <div className="Ingredient-list">
            <Container>
                <Stack alignItems={"center"}>
                    <TemplateAddUpdateIngredient current={newIngredient} handleNewUpdatedIngredient={handleAddItem} isNew={true}/>

                    <List>{
                        items.map((item, index) => (
                                <ListItem key={item.id} divider>
                                    <ListItemText
                                        primary={item.quantity + " " + item.unit + " " + item.name}
                                    />
                                    <Button onClick={() => handleDelete(item.id)} color={"secondary"} startIcon={< DeleteOutlineIcon/>}></Button>
                                    <TemplateAddUpdateIngredient current={item} handleNewUpdatedIngredient={handleUpdateItem} isNew={false}/>
                                </ListItem>
                            )
                        )}
                    </List>

                    <Button onClick={handleOnClick} variant={"contained"} component={"label"} color={"secondary"}>
                         Speichern 123
                    </Button>
                </Stack>
            </Container>
        </div>
    )


}