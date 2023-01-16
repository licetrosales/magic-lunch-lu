import {ChangeEvent, useState} from "react";

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import {Ingredient} from "../../model/Ingredient";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';


type UpdateItemProps = {
    current: Ingredient
    handleUpdateItem(updatedItem: Ingredient): void
}


export default function UpdateIngredient(props: UpdateItemProps) {
    const currentItemFormWithoutEnums: Ingredient = {
        id: props.current.id,
        name: props.current.name,
        quantity: props.current.quantity,
        unit: props.current.unit,
        isInShoppingList: props.current.isInShoppingList
    }
    const [itemWithoutEnums, setItemWithoutEnums] = useState(currentItemFormWithoutEnums)

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


    function handleSaveItem() {
        const updatedItem: Ingredient = {
            id: props.current.id,
            name: itemWithoutEnums.name,
            quantity: itemWithoutEnums.quantity,
            unit: itemWithoutEnums.unit
        }

        props.handleUpdateItem(updatedItem)
        setItemWithoutEnums({
            id: props.current.id,
            name: updatedItem.name,
            quantity: updatedItem.quantity,
            unit: updatedItem.unit,
            isInShoppingList: updatedItem.isInShoppingList
        })


        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen} color={"secondary"} startIcon={<ModeEditOutlineIcon/>}></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Zutat bearbeiten</DialogTitle>
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
                    <Button onClick={handleSaveItem} color={"secondary"}>
                        Speichern
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}