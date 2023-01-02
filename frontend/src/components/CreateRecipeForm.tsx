import {Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {DishTypeCategory, MealType, MenuCategory, NewRecipe, Recipe, RecipeCategory} from "../model/Recipe";
import IngredientList from "./IngredientList";


type CreateRecipeProps = {
    handleCreateRecipe(newRecipe: Recipe): void
}


export default function CreateRecipeForm(props: CreateRecipeProps) {
    const emptyRecipeFormWithoutEnums: NewRecipe = {

        name: "",
        //mealType: MealType.BREAKFAST,
        source: "",
        image: "",
        //ingredients: [],
        prepTime: "",
        preparation: "",
        //dishTypeCategory: DishTypeCategory.VEGGIE,
        portions: 1,
        favorite: false,
        //recipeCategory: RecipeCategory.LOW_CARB,
        //menuCategory: MenuCatefory.MAIN_COURSE,
        garnish: ""

    }
    const [recipeWithoutEnums, setRecipeWithoutEnums] = useState<NewRecipe>(emptyRecipeFormWithoutEnums)
    const [mealType, setMealType] = useState<MealType | string>(MealType.LUNCH)
    const [dishTypeCategory, setDishTypeCategory] = useState<DishTypeCategory | string>(DishTypeCategory.VEGGIE)
    const [recipeCategory, setRecipeCategory] = useState<RecipeCategory | string>(RecipeCategory.LOW_CARB)
    const [menuCategory, setMenuCategory] = useState<MenuCategory | string>(MenuCategory.MAIN_COURSE)

    const [open, setOpen] = useState<boolean>(false)

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        const fieldType = event.target.type

        setRecipeWithoutEnums((prevNewRecipe => (
            {
                ...prevNewRecipe,
                [fieldName]: fieldType === "checkbox"
                    ? event.target.checked
                    : fieldValue
            }

        )))
    }

    function onMealTypeChange(event: ChangeEvent<HTMLInputElement>) {
        setMealType(event.target.value as MealType)
    }

    function onDishTypeCategoryChange(event: ChangeEvent<HTMLInputElement>) {
        setDishTypeCategory(event.target.value as DishTypeCategory)
    }

    function onRecipeCategoryChange(event: ChangeEvent<HTMLInputElement>) {
        setRecipeCategory(event.target.value as RecipeCategory)
    }

    function onMenuCategoryChange(event: ChangeEvent<HTMLInputElement>) {
        setMenuCategory(event.target.value as MenuCategory)
    }

    function handleCreateRecipeSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.handleCreateRecipe({
            name: recipeWithoutEnums.name,
            mealType: mealType,
            source: recipeWithoutEnums.source,
            image: recipeWithoutEnums.image,
            ingredients: [],
            prepTime: recipeWithoutEnums.prepTime,
            preparation: recipeWithoutEnums.preparation,
            portions: recipeWithoutEnums.portions,
            favorite: recipeWithoutEnums.favorite,
            dishTypeCategory: dishTypeCategory,
            recipeCategory: recipeCategory,
            menuCategory: menuCategory,
            garnish: recipeWithoutEnums.garnish
        })
        setRecipeWithoutEnums(emptyRecipeFormWithoutEnums)
        setMealType(MealType.LUNCH)
        setDishTypeCategory(DishTypeCategory.VEGGIE)
        setRecipeCategory(RecipeCategory.LOW_CARB)
        setMenuCategory(MenuCategory.MAIN_COURSE)
    }

    useEffect(() => {

    }, [recipeWithoutEnums])

    return (
        <div>
            <Button onClick={handleOpen}>Neues Rezept</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Neues Rezept</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleCreateRecipeSubmit}>
                        <TextField
                            label={"Name"}
                            placeholder={"Rezeptename"}
                            type={"text"}
                            name={"name"}
                            value={recipeWithoutEnums.name}
                            onChange={handleFormChange}
                        />
                        <input
                            placeholder={"Upload Bild"}
                            type={"text"}
                            name={"image"}
                            value={recipeWithoutEnums.image}
                            onChange={handleFormChange}
                        /><br/>
                        <TextField
                              select
                            name={"mealType"}
                            value={mealType}
                            label="Speisetyp"
                            onChange={onMealTypeChange}
                        >
                            <MenuItem value={MealType.BREAKFAST}>Frühstück</MenuItem>
                            <MenuItem value={MealType.LUNCH}>Mittagessen</MenuItem>
                            <MenuItem value={MealType.DINNER}>Abendessen</MenuItem>

                        </TextField><br/>
                        <TextField
                            label={"Quelle"}
                            type={"text"}
                            name={"source"}
                            value={recipeWithoutEnums.source}
                            onChange={handleFormChange}
                        /><br/>
                        <IngredientList/>
                        <TextField
                            label={"Kochzeit"}
                            type={"text"}
                            name={"prepTime"}
                            value={recipeWithoutEnums.prepTime}
                            onChange={handleFormChange}
                        /><br/>
                        <TextField
                            label={"Portion"}
                            type={"number"}
                            name={"portions"}
                            value={recipeWithoutEnums.portions}
                            onChange={handleFormChange}
                        /><br/>
                        <TextField label={"Zubereitung"}
                                   type={"text"}
                                   name={"preparation"}
                                   value={recipeWithoutEnums.preparation}
                                   onChange={handleFormChange}
                        /><br/>
                        <label>
                            Favorite:
                            <input
                                type={"checkbox"}
                                name="favorite"
                                checked={recipeWithoutEnums.favorite}
                                onChange={handleFormChange}
                            />
                        </label> <br/>
                        <TextField
                            placeholder={"Wähl Speiseart"}
                            select
                            name={"dishTypeCategory"}
                            value={dishTypeCategory}
                            label="Speiseart"
                            onChange={onDishTypeCategoryChange}
                        >
                            <MenuItem value={DishTypeCategory.VEGGIE}>Veggie</MenuItem>
                            <MenuItem value={DishTypeCategory.MEAT}>Fleisch</MenuItem>
                            <MenuItem value={DishTypeCategory.PASTA}>Pasta</MenuItem>
                            <MenuItem value={DishTypeCategory.FISH}>Fish</MenuItem>
                            <MenuItem value={DishTypeCategory.NOTHING_TODAY}>Heute nichts</MenuItem>

                        </TextField>
                        <TextField
                            placeholder={"Wähl Typ von Recipe"}
                            select
                            name={"recipeCategory"}
                            value={recipeCategory}
                            label="Speiseart"
                            onChange={onRecipeCategoryChange}
                        >
                            <MenuItem value={RecipeCategory.SALAD}>Salat</MenuItem>
                            <MenuItem value={RecipeCategory.SOUP}>Suppe</MenuItem>
                            <MenuItem value={RecipeCategory.LOW_CARB}>Low carb</MenuItem>
                            <MenuItem value={RecipeCategory.HIGH_PROTEIN}>High protein</MenuItem>

                        </TextField>
                        <TextField
                            placeholder={"Wähl ...."}
                            select
                            name={"menuCategory"}
                            value={menuCategory}
                            label="Speiseart"
                            onChange={onMenuCategoryChange}
                        >
                            <MenuItem value={MenuCategory.ENTREE}>Vorspeise</MenuItem>
                            <MenuItem value={MenuCategory.MAIN_COURSE}>Hauptspeise</MenuItem>
                            <MenuItem value={MenuCategory.DESSERT}>Nachspeise</MenuItem>
                            <MenuItem value={MenuCategory.SNACK}>Snack</MenuItem>
                        </TextField><br/>
                        <TextField
                            label={"Garnish"}
                            placeholder={"ccc"}
                            type={"text"}
                            name={"garnish"}
                            value={recipeWithoutEnums.garnish}
                            onChange={handleFormChange}
                        /><br/>

                        <Button type={"submit"} color={"success"} variant={"contained"}>Bestätigen</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}