import {ChangeEvent, useState} from "react";

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Ingredient, NewItem} from "../../model/Ingredient";
import uuid from "react-uuid";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemProps = {
    handleAddItem(newItem: Ingredient): void
}

export default function AddIngredient(props: AddItemProps) {
    const emptyItemFormWithoutEnums: NewItem = {

        name: "",
        quantity: "",
        unit: "",
        isInShoppingList: true
    }
    const [itemWithoutEnums, setItemWithoutEnums] = useState(emptyItemFormWithoutEnums)
    const [open, setOpen] = useState<boolean>(false)

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        setItemWithoutEnums((prevItem) => ({
            ...prevItem, [fieldName]: fieldValue
        }))
    }

    function handleAddItem() {
        const newItem: Ingredient = {
            id: uuid(),
            name: itemWithoutEnums.name,
            quantity: itemWithoutEnums.quantity,
            unit: itemWithoutEnums.unit
        }
        props.handleAddItem(newItem)
        setItemWithoutEnums({
            name: "",
            quantity: "",
            unit: "",
            isInShoppingList: true
        })
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen} color={"secondary"} startIcon={<AddCircleOutlineIcon/>}>Zutat
                eintragen</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Neue Zutat</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name={"name"}
                        placeholder={"Zutat"}
                        value={itemWithoutEnums.name}
                        onChange={handleChange}
                        margin={"dense"}
                        fullWidth
                        color="secondary"
                    />
                    <TextField
                        label={"Menge"}
                        name={"quantity"}
                        placeholder={"Menge"}
                        value={itemWithoutEnums.quantity}
                        onChange={handleChange}
                        margin={"dense"}
                        fullWidth
                        color="secondary"
                    />
                    <TextField

                        label={"Einheit"}
                        name={"unit"}
                        placeholder={"Einheit"}
                        value={itemWithoutEnums.unit}
                        onChange={handleChange}
                        margin={"dense"}
                        fullWidth
                        color="secondary"
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={"secondary"}>
                        Abbrechen
                    </Button>
                    <Button onClick={handleAddItem} color={"secondary"}>
                        Speichern
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}