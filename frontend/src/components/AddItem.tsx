import {ChangeEvent, useState} from "react";

import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Ingredient} from "../model/Ingredient";

type AddItemProps ={
    handleAddItem(newItem: Ingredient):void
}
export type NewItemType ={
    itemName: string,
    quantity: string,
    unit: "TL"|"EL"|"MSP"|"OZ"|"LB"|"G"|"KG"|"KARTON"|"BUND"| "PACKUNG"|"ZWEIG"|"KLEIN"| "MITTEL"| "",
    productCategory: "BREAD_BAKERY"|"BEVERAGES"|"CANNED_JARED_GOODS"|"DAIRY"|"PRODUCE"|"DRY_BACKING_GOODS"|"FROZEN_FOODS"|"MEAT"|"PERSONAL_CARE"|"OTHERS"|"",


}
export default function AddItem(props: AddItemProps){
    const emptyFormItem: NewItemType = {
        itemName: "",
        quantity: "",
        unit: "",
        productCategory:"",
    }

    const [open, setOpen] = useState<boolean>(false)
    const [item, setItem] = useState<NewItemType>(emptyFormItem)


    function handleOpen(){
        setOpen(true)
    }
    function  handleClose(){
        setOpen(false)
    }
    function handleChange(event:ChangeEvent<HTMLInputElement>){
        const fieldName= event.target.name
        const fieldValue= event.target.value

            setItem((prevItem) =>({
                ...prevItem,[fieldName]:fieldValue
            }))

    }
    function handleAddItem(){
        const newItem: Ingredient = {
            nameItem: item.itemName,
            quantity: item.quantity,
            unit: item.unit,
            productCategory: item.productCategory

        }
        props.handleAddItem(newItem)
        setItem({ itemName: "",
            quantity: "",
            unit: "",
            productCategory:""
            })
        handleClose()
    }
    return (
        <div>
            <Button onClick={handleOpen}>+ Zutat</Button>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Neue Zutat</DialogTitle>
              <DialogContent>
                <TextField value={item.itemName}
                           margin={"dense"}
                           onChange={handleChange}
                           name={"itemName"}
                           label = "Name"
                           fullWidth
                />
                  <TextField value={item.quantity}
                             margin={"dense"}
                             onChange={handleChange}
                             name={"quantity"}
                             label={"Quantity"}
                             fullWidth
                  />
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>
                      Cancel
                  </Button>
                  <Button onClick={handleAddItem}>
                      Add
                  </Button>
              </DialogActions>
          </Dialog>
        </div>
    )
}