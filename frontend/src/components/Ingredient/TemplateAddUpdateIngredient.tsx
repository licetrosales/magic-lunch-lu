import {ChangeEvent, useState} from "react";

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Ingredient} from "../../model/Ingredient";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";


type TemplateUpdateIngredientProps = {
    current: Ingredient
    handleNewUpdatedIngredient(newUpdatedItem: Ingredient): void
    isNew: Boolean
}


export default function TemplateAddUpdateIngredient(props: TemplateUpdateIngredientProps) {
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
        const newUpdatedItem: Ingredient = {
            id: props.current.id,
            name: itemWithoutEnums.name,
            quantity: itemWithoutEnums.quantity,
            unit: itemWithoutEnums.unit
        }

        props.handleNewUpdatedIngredient(newUpdatedItem)
        setItemWithoutEnums({
            id: props.current.id,
            name: newUpdatedItem.name,
            quantity: newUpdatedItem.quantity,
            unit: newUpdatedItem.unit,
            isInShoppingList: newUpdatedItem.isInShoppingList
        })
        handleClose()
    }

    return (
        <div>
            {props.isNew ?
                <Button onClick={handleOpen} color={"secondary"} startIcon={<AddCircleOutlineIcon/>}>
                    Zutat eintragen</Button>:
            <Button onClick={handleOpen} color={"secondary"} startIcon={<ModeEditOutlineIcon/>}></Button>
            }
            <Dialog open={open} onClose={handleClose}>
                {props.isNew ? <DialogTitle>Neue Zutat</DialogTitle>
                    :<DialogTitle>Zutat bearbeiten</DialogTitle>}
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