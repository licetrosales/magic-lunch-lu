import {
    DishTypeCategory,
    MealType,
    MenuCategory,
    NewRecipe,
    NewRecipeWithId,
    Recipe,
    RecipeCategory
} from "../model/Recipe";
import {
    Box,
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle,
    MenuItem, TextField,
    Typography
} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {Ingredient} from "../model/Ingredient";

import UpdateIngredientList from "./UpdateIngredientList";
import IngredientCardView from "./IngredientCardView";

type RecipeUpdateFormProps = {
    currentRecipe: Recipe
    handleUpdateRecipe( modifiedRecipe: Recipe, id?: string): void
}
export default function UpdateRecipeForm(props: RecipeUpdateFormProps) {

    const currentRecipeFormWithoutEnums: NewRecipeWithId = {
        id: props.currentRecipe.id,
        name: props.currentRecipe.name ,
       // mealType: props.currentRecipe.mealType,
        source: props.currentRecipe.source,
        image: props.currentRecipe.image,
        //ingredients: [],
        prepTime: props.currentRecipe.prepTime,
        preparation: props.currentRecipe.preparation,
        //dishTypeCategory: DishTypeCategory.VEGGIE,
        portions: props.currentRecipe.portions,
        favorite: props.currentRecipe.favorite,
        //recipeCategory: RecipeCategory.LOW_CARB,
        //menuCategory: MenuCatefory.MAIN_COURSE,
        garnish: props.currentRecipe.garnish
    }

    const [recipeWithoutEnums, setRecipeWithoutEnums] = useState<NewRecipe>(currentRecipeFormWithoutEnums)
    const [mealType, setMealType] = useState<MealType | string>(props.currentRecipe.mealType)
    const [dishTypeCategory, setDishTypeCategory] = useState<DishTypeCategory | string>(props.currentRecipe.dishTypeCategory)
    const [recipeCategory, setRecipeCategory] = useState<RecipeCategory | string>(props.currentRecipe.recipeCategory)
    const [menuCategory, setMenuCategory] = useState<MenuCategory | string>(props.currentRecipe.menuCategory)

    const [items, setItems] = useState<Ingredient []>(props.currentRecipe.ingredients)
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
            {...prevNewRecipe,
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


    function handleCallbackItems(childData: Ingredient[]) {
        setItems(childData)
    }
    function handleUpdateRecipeFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const recipeToSend: Recipe={
            id: props.currentRecipe.id,
            name: recipeWithoutEnums.name,
            mealType: mealType,
            source: recipeWithoutEnums.source,
            image: props.currentRecipe.image,
            ingredients: items,
            prepTime: recipeWithoutEnums.prepTime,
            preparation: recipeWithoutEnums.preparation,
            portions: recipeWithoutEnums.portions,
            favorite: false,
            dishTypeCategory: dishTypeCategory,
            recipeCategory: recipeCategory,
            menuCategory: menuCategory,
            garnish: recipeWithoutEnums.garnish,
        }

        props.handleUpdateRecipe(recipeToSend, props.currentRecipe.id)
            }

    const recipeIngredientes = props.currentRecipe.ingredients?.map((ingredientShortInfo) => {
        return <IngredientCardView ingredientToDisplay={ingredientShortInfo}
                                   key={ingredientShortInfo.id}/>
    })
        return (
        <div>
            <form onSubmit={handleUpdateRecipeFormSubmit}>
                    <TextField
                        type={"text"}
                        label={"Name"}
                        name={"name"}
                        value={recipeWithoutEnums.name}
                        onChange={handleFormChange}
                        margin={"dense"}
                        fullWidth
                        variant="outlined"
                    />
                <TextField
                    type={"text"}
                    label={"Quelle"}
                    name={"source"}
                    value={recipeWithoutEnums.source}
                    onChange={handleFormChange}
                    margin={"dense"}
                    fullWidth
                /><br/>
                <Box display="flex" justifyContent="flex-end">
                    <Button variant={"contained"} component={"label"}>
                        Bild hochladen
                        <input
                            hidden accept={"images/*"}
                            multiple
                            type={"file"}

                            name={"image"}
                            value={recipeWithoutEnums.image}
                            onChange={handleFormChange}
                        />
                    </Button>
                </Box>

                <TextField
                    select
                    label={"Mahlzeit"}
                    name={"mealType"}
                    value={mealType}
                    onChange={onMealTypeChange}
                    margin={"dense"}
                    fullWidth
                >
                    <MenuItem value={MealType.BREAKFAST}>Frühstück</MenuItem>
                    <MenuItem value={MealType.LUNCH}>Mittagessen</MenuItem>
                    <MenuItem value={MealType.DINNER}>Abendessen</MenuItem>

                </TextField>
                <label>
                    Favorite:
                    <input
                        type={"checkbox"}
                        name="favorite"
                        checked={recipeWithoutEnums.favorite}
                        onChange={handleFormChange}
                    />
                </label>
                <TextField
                    select
                    label="Tageskategorie"
                    name={"dishTypeCategory"}
                    value={dishTypeCategory}
                    onChange={onDishTypeCategoryChange}
                    margin={"dense"}
                    fullWidth
                >
                    <MenuItem value={DishTypeCategory.VEGGIE}>Veggie</MenuItem>
                    <MenuItem value={DishTypeCategory.MEAT}>Fleisch</MenuItem>
                    <MenuItem value={DishTypeCategory.PASTA}>Pasta</MenuItem>
                    <MenuItem value={DishTypeCategory.FISH}>Fish</MenuItem>
                    <MenuItem value={DishTypeCategory.NOTHING_TODAY}>Heute nichts</MenuItem>

                </TextField>
                <TextField
                    select
                    label="Rezeptkategorie"
                    name={"recipeCategory"}
                    value={recipeCategory}
                    onChange={onRecipeCategoryChange}
                    margin={"dense"}
                    fullWidth
                >
                    <MenuItem value={RecipeCategory.SALAD}>Salat</MenuItem>
                    <MenuItem value={RecipeCategory.SOUP}>Suppe</MenuItem>
                    <MenuItem value={RecipeCategory.LOW_CARB}>Low carb</MenuItem>
                    <MenuItem value={RecipeCategory.HIGH_PROTEIN}>High protein</MenuItem>

                </TextField>
                <TextField
                    select
                    label="Menükategorie"
                    name={"menuCategory"}
                    value={menuCategory}
                    onChange={onMenuCategoryChange}
                    margin={"dense"}
                    fullWidth
                >
                    <MenuItem value={MenuCategory.ENTREE}>Vorspeise</MenuItem>
                    <MenuItem value={MenuCategory.MAIN_COURSE}>Hauptspeise</MenuItem>
                    <MenuItem value={MenuCategory.DESSERT}>Nachspeise</MenuItem>
                    <MenuItem value={MenuCategory.SNACK}>Snack</MenuItem>
                </TextField><br/>
                <TextField
                    type={"number"}
                    label={"Portionen"}
                    name={"portions"}
                    value={recipeWithoutEnums.portions}
                    onChange={handleFormChange}
                    margin={"dense"}
                    fullWidth
                /><br/>
                <TextField
                    type={"text"}
                    label={"Zubereitungszeit"}
                    name={"prepTime"}
                    value={recipeWithoutEnums.prepTime}
                    onChange={handleFormChange}
                    margin={"dense"}
                    fullWidth
                /><br/>
                <Box display="flex" justifyContent= "center">
                <Button onClick={handleOpen} >Zutaten bearbeiten</Button>
                    </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Zutaten ändern</DialogTitle>
                    <DialogContent>
                <UpdateIngredientList currentIngredients={items} handleCallbackItems={handleCallbackItems}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Schließen
                        </Button>
                    </DialogActions>
                </Dialog>
                <Typography align={"center"} variant={"body1"}>
                    {recipeIngredientes}
                </Typography>
                <TextField
                    type={"text"}
                    label={"Zubereitung"}
                    name={"preparation"}
                    multiline
                    value={recipeWithoutEnums.preparation}
                    onChange={handleFormChange}
                    margin={"dense"}
                    fullWidth
                /><br/>
                <TextField
                    type={"text"}
                    label={"Beilagen"}
                    name={"garnish"}
                    value={recipeWithoutEnums.garnish}
                    onChange={handleFormChange}
                    margin={"dense"}
                    fullWidth
                    multiline
                /><br/>

                <Button type={"submit"} color={"success"} variant={"contained"}>Rezept Speichern</Button>
                </form>

        </div>
    )
}