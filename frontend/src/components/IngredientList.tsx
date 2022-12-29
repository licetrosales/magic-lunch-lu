import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {useState} from "react";
import {Ingredient} from "../model/Ingredient";
import AddItem from "./AddItem";


export default function IngredientList() {
    const [items, setItems] = useState<Ingredient []>([])

    function addItem(item: Ingredient) {
        setItems(prevItems => {
            return [item, ...prevItems]})
    }

    return (
        <div className="Ingridient-list">
            <Container>
                <AppBar>
                    <Toolbar>
                        <Typography variant={"h6"}>
                            Zutaten
                        </Typography>
                    </Toolbar>
                </AppBar>
                <AddItem handleAddItem={addItem}/>
            </Container>
        </div>
    )
}