import {Ingredient} from "../model/Ingredient";
import {useState} from "react";
import {Button, Container, ListItem, ListItemText, Stack} from "@mui/material";
import List from "@mui/material/List";
import AddItem from "./AddItem";
import UpdateItem from "./UpdateItem";
import IngredientCardView from "./IngredientCardView";

type UpgradeIngredientListProps = {
    currentIngredients:Ingredient[]
    handleCallbackItems(childData: Ingredient[]): void
}

export default function UpdateIngredientList(props: UpgradeIngredientListProps) {
    const [items, setItems] = useState<Ingredient []>(props.currentIngredients)
    const [updateState, setUpdateState] = useState<string>(" ")

console.log(props.currentIngredients)
    function handleOnClick() {
        props.handleCallbackItems(items)
    }
    function handleAddItem(item: Ingredient) {
        setItems(prevItems => {
            return [item, ...prevItems]
        })
    }
    function handleUpdateItem(item: Ingredient) {
        setItems(prevItems => {
            return [...prevItems]
        })
    }
    const recipeIngredientes = props.currentIngredients?.map((ingredientShortInfo) => {
        return <IngredientCardView ingredientToDisplay={ingredientShortInfo}
                                   key={ingredientShortInfo.id}/>
    })

    return (
        <div className="Ingredient-list">
            <Container>
                <Stack alignItems={"center"}>
                    <AddItem handleAddItem={handleAddItem}/>

                    <List>{
                        items.map((item, index) =>(
                            updateState === item.id ? <UpdateItem current={item} items={items} handleUpdateItem={handleUpdateItem}/>:
                            <ListItem key={item.id} divider>
                                <ListItemText
                                    primary={item.quantity + " " + item.unit + " " + item.name}
                                />
                                <Button onClick={()=> handleDelete(item.id)}>Löschen</Button>
                                <UpdateItem current={item} items={items} handleUpdateItem={handleUpdateItem}/>:
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
    function handleEdit(id:string, item:Ingredient){
        return (
            <UpdateItem current={item} items={items} handleUpdateItem={handleUpdateItem}/>
        )


    }
    function handleDelete(id:string) {
        const newList = items.filter((li) => li.id !== id)
        setItems(newList)
    }


}