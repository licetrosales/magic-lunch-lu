import {Ingredient} from "../../model/Ingredient";
import {useState} from "react";
import {Button, Container, ListItem, ListItemText, Stack} from "@mui/material";
import List from "@mui/material/List";
import AddIngredient from "./AddIngredient";
import UpdateIngredient from "./UpdateIngredient";
import IngredientCardView from "./IngredientCardView";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
                    <AddIngredient handleAddItem={handleAddItem}/>

                    <List>{
                        items.map((item, index) => (
                                <ListItem key={item.id} divider>
                                    <ListItemText
                                        primary={item.quantity + " " + item.unit + " " + item.name}
                                    />
                                    <Button onClick={() => handleDelete(item.id)} color={"secondary"} startIcon={< DeleteOutlineIcon/>}></Button>

                                    <UpdateIngredient current={item} handleUpdateItem={handleUpdateItem}/>

                                </ListItem>

                            )
                        )}
                    </List>

                    <Button onClick={handleOnClick} variant={"contained"} component={"label"} color={"secondary"}>
                         Speichern
                    </Button>
                </Stack>
            </Container>
        </div>
    )


}