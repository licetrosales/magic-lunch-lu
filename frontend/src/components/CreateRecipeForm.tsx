import {Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, FormEventHandler, useEffect, useState} from "react";
import {Recipe} from "../model/Recipe";

type CreateRecipeProps = {
    handleCreateRecipe(newRecipe: Recipe): void
}

export type NewRecipeType = {

    name: string,
    source: string,
    image: string,
    prepTime: string,
    preparation: string,
    portions: number
    favorite: boolean
}
export default function CreateRecipeForm(props: CreateRecipeProps) {
    const emptyNewRecipeForm: NewRecipeType = {

        name: "",
       // mealType: "LUNCH",
        source: "",
        image: "",
        //ingredients: [],
        prepTime: "",
        preparation: "",
        //dishTypeCategory: DishTypeCategory.VEGGIE,
        portions: 1,
        favorite: false
        //recipeCategory: RecipeCategory.LOW_CARB,
        //menuCategory: MenuCatefory.MAIN_COURSE,
        //garnish: Garnish.GREEN_SALAD

    }
    const [newRecipe, setNewRecipe] = useState<NewRecipeType>(emptyNewRecipeForm)
    useEffect(() => {
        console.log(newRecipe)
    }, [newRecipe])

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        const fieldType = event.target.type

        setNewRecipe((prevNewRecipe => (
            {
                ...prevNewRecipe,
                [fieldName]: fieldType === "checkbox"
                ? event.target.checked
                    : fieldValue
            }

        )))
    }

    function handleCreateRecipeSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.handleCreateRecipe(newRecipe)
        setNewRecipe(emptyNewRecipeForm)
    }

    return (
        <section>
            <form onSubmit={handleCreateRecipeSubmit}>
                <label>
                    Name:
                    <input
                        type={"text"}
                        name={"name"}
                        value={newRecipe.name}
                        onChange={handleFormChange}

                    />
                </label><br/>
                <label>
                    Upload image
                    <input
                        type={"text"}
                        name={"image"}
                        value={newRecipe.image}
                        onChange={handleFormChange}

                    />
                </label><br/>
                <label>
                    Quelle:
                    <input
                        type={"text"}
                        name={"source"}
                        value={newRecipe.source}
                        onChange={handleFormChange}
                    />
                </label><br/>
                <label>
                    Kochzeit :
                    <input
                        type={"text"}
                        name={"prepTime"}
                        value={newRecipe.prepTime}
                        onChange={handleFormChange}
                    />
                </label><br/>
                <label>
                    Portions:
                    <input
                        type={"number"}
                        name={"portions"}
                        value={newRecipe.portions}
                        onChange={handleFormChange}
                    />
                </label><br/>

                <label>
                    Preparation:
                    <TextField placeholder={"Preparation"}
                        type={"text"}
                        name={"preparation"}
                        value={newRecipe.preparation}
                        onChange={handleFormChange}
                    />
                </label><br/>
                <label>
                    Favorite:
                    <input
                        type={"checkbox"}
                         name ="favorite"
                        checked={newRecipe.favorite}
                        onChange={handleFormChange}

                    />
                </label>
                <Button type={"submit"} color={"success"}variant={"contained"}>Rezept speichern</Button>
            </form>
        </section>
    )
}