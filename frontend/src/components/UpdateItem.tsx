import {ChangeEvent, useState} from "react";

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import {Ingredient, NewItem, Unit} from "../model/Ingredient";
import uuid from "react-uuid";

type UpdateItemProps = {
    current: Ingredient
    items: Ingredient[]

    handleUpdateItem(newItem: Ingredient): void

}


export default function UpdateItem(props: UpdateItemProps) {
    const currentItemFormWithoutEnums: Ingredient = {
        id: props.current.id,
        name: props.current.name,
        quantity: props.current.quantity,
        unit:props.current.unit,
        isInShoppingList: props.current.isInShoppingList
    }
    const [itemWithoutEnums, setItemWithoutEnums] = useState(currentItemFormWithoutEnums)
    const [unit, setUnit] = useState<Unit | string>(props.current.unit)

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

    function onUnitChange(event: ChangeEvent<HTMLInputElement>) {
        setUnit(event.target.value as Unit)
    }

    function handleAddItem() {
        const newItem: Ingredient = {
            id: props.current.id,
            name: itemWithoutEnums.name,
            quantity: itemWithoutEnums.quantity,
            unit: unit,
        }
        props.handleUpdateItem(newItem)
        /*setItemWithoutEnums({
            id: "",
            name: "",
            quantity: "",
            isInShoppingList: true
        })
        setUnit(Unit.KG)*/
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen}>Bearbeiten</Button>
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
    />
    <TextField
        label={"Menge"}
    name={"quantity"}
    placeholder={"Menge"}
    value={itemWithoutEnums.quantity}
    onChange={handleChange}
    margin={"dense"}
    fullWidth
    />
    <TextField
        select
    label={"Einheit"}
    name={"unit"}
    placeholder={"Einheit"}
    value={unit}
    onChange={onUnitChange}
    margin={"dense"}
    fullWidth
    >
    <MenuItem value={Unit.KG}>kg</MenuItem>
        <MenuItem value={Unit.G}>g</MenuItem>
        <MenuItem value={Unit.LB}>lb</MenuItem>
        <MenuItem value={Unit.OZ}>oz</MenuItem>
        <MenuItem value={Unit.OTHER}>other</MenuItem>
    </TextField>

    </DialogContent>
    <DialogActions>
    <Button onClick={handleClose}>
        Abbrechen
        </Button>
        <Button onClick={handleAddItem}>
        Speichern
        </Button>
        </DialogActions>
        </Dialog>
        </div>
)
}