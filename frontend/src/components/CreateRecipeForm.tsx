import {ChangeEvent, FormEvent, FormEventHandler, useEffect, useState} from "react";


export type NewRecipeFormType = {
    id: "",
    name: string,
    source: string
    portions: number
    prepTime: string,
    preparation: string,

}
export default function CreateRecipeForm() {
    const emptyNewRecipeForm: NewRecipeFormType = {
        id: "",
        name: "",
        //  mealType: MealType.LUNCH,
        source: "",
        //  image: "",
        //ingredients: [],
        prepTime: "",
        preparation: "",
        //dishTypeCategory: DishTypeCategory.VEGGIE,
        portions: 1,
        //recipeCategory: RecipeCategory.LOW_CARB,
        //menuCategory: MenuCatefory.MAIN_COURSE,
        //garnish: Garnish.GREEN_SALAD

    }
    const [newRecipeForm, setNewRecipeForm] = useState<NewRecipeFormType>(emptyNewRecipeForm)
    useEffect(() => {
        console.log(newRecipeForm)
    }, [newRecipeForm])

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        setNewRecipeForm((prevNewRecipeForm => (
            {
                ...prevNewRecipeForm,
                [fieldName]: fieldValue
            }

        )))
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type={"text"}
                        name={"name"}
                        value={newRecipeForm.name}
                        onChange={handleFormChange}

                    />
                </label><br/>
                <label>
                    Quelle:
                    <input
                        type={"text"}
                        name={"source"}
                        value={newRecipeForm.source}
                        onChange={handleFormChange}
                    />
                </label><br/>
                <label>
                    Portions:
                    <input
                        type={"number"}
                        name={"portions"}
                        value={newRecipeForm.portions}
                        onChange={handleFormChange}
                    />
                </label><br/>
                <label>
                    Vorbereitungszeit & Kochzeit :
                    <input
                        type={"text"}
                        name={"preptime"}
                        value={newRecipeForm.prepTime}
                        onChange={handleFormChange}
                    />
                </label><br/>
                <label>
                    Preparation:
                    <input
                        type={"text"}
                        name={"preparation"}
                        value={newRecipeForm.preparation}
                        onChange={handleFormChange}
                    />
                </label><br/>
                <button type={"submit"}>Rezept speichern</button>
            </form>
        </section>
    )
}