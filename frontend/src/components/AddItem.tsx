import {ChangeEvent, useState} from "react";

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import {Ingredient, NewItem, ProductCategory, Unit} from "../model/Ingredient";
import {MealType, MenuCategory} from "../model/Recipe";

type AddItemProps = {
    handleAddItem(newItem: Ingredient): void
}

export default function AddItem(props: AddItemProps) {
    const emptyItemFormWithoutEnums: NewItem = {
        itemName: "",
        quantity: "",
        isInShoppingList: true
    }
    const [itemWithoutEnums, setItemWithoutEnums] = useState(emptyItemFormWithoutEnums)
    const [unit, setUnit] = useState<Unit | string>(Unit.KG)

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
            itemName: itemWithoutEnums.itemName,
            quantity: itemWithoutEnums.quantity,
            unit: unit,

        }
        props.handleAddItem(newItem)
        setItemWithoutEnums({
            itemName: "",
            quantity: "",
            isInShoppingList: true
        })
        setUnit(Unit.KG)
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen}>Zutat hizufügen</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Neue Zutat</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name={"itemName"}
                        value={itemWithoutEnums.itemName}
                        onChange={handleChange}
                        margin={"dense"}
                        fullWidth
                    />
                    <TextField
                        label={"Quantity"}
                        name={"quantity"}
                        value={itemWithoutEnums.quantity}
                        onChange={handleChange}
                        margin={"dense"}
                        fullWidth
                    />
                    <TextField
                        select
                        label={"Unit"}
                        name={"unit"}
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
                        Cancel
                    </Button>
                    <Button onClick={handleAddItem}>
                        Speichern
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}