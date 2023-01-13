import {Ingredient} from "../model/Ingredient";

type IngredientCardViewProps = {
    ingredientToDisplay: Ingredient
}
export default function IngredientCardView(props: IngredientCardViewProps) {
    const name = props.ingredientToDisplay.name
    const id = props.ingredientToDisplay.id
    const quantity = props.ingredientToDisplay.quantity
    const unit = props.ingredientToDisplay.unit


    return (
        <p>{quantity} {unit} {name}</p>
    )
}