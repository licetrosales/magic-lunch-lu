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
            <Button onClick={handleOpen}>Zutaten hizufügen</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Neue Zutat</DialogTitle>
                <DialogContent>
                    <TextField value={itemWithoutEnums.itemName}
                               margin={"dense"}
                               onChange={handleChange}
                               name={"itemName"}
                               label="Name"
                               fullWidth
                    />
                    <TextField value={itemWithoutEnums.quantity}
                               margin={"dense"}
                               onChange={handleChange}
                               name={"quantity"}
                               label={"Quantity"}
                               fullWidth
                    />
                    <TextField
                        select
                        name={"unit"}
                        value={unit}
                        label={"Unit"}
                        margin={"dense"}
                               onChange={onUnitChange}
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