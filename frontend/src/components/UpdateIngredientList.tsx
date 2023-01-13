import {Ingredient} from "../model/Ingredient";
import {useState} from "react";
import {Button, Container, ListItem, ListItemText, Stack} from "@mui/material";
import List from "@mui/material/List";
import AddItem from "./AddItem";
import UpdateItem from "./UpdateItem";
import IngredientCardView from "./IngredientCardView";

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

    const recipeIngredientes = items?.map((ingredientShortInfo) => {
        return <IngredientCardView ingredientToDisplay={ingredientShortInfo}
                                   key={ingredientShortInfo.id}/>
    })

    return (
        <div className="Ingredient-list">
            <Container>
                <Stack alignItems={"center"}>
                    <AddItem handleAddItem={handleAddItem}/>

                    <List>{
                        items.map((item, index) => (
                                <ListItem key={item.id} divider>
                                    <ListItemText
                                        primary={item.quantity + " " + item.unit + " " + item.name}
                                    />
                                    <Button onClick={() => handleDelete(item.id)}>Löschen</Button>

                                    <UpdateItem current={item} handleUpdateItem={handleUpdateItem}/>

                                </ListItem>

                            )
                        )}
                    </List>

                    <Button onClick={handleOnClick} variant={"contained"} component={"label"}>
                        Zutatenliste speichern
                    </Button>
                </Stack>
            </Container>
        </div>
    )


}