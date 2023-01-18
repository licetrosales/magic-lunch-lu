import {
    DishTypeCategory,
    MealType,
    MenuCategory,
    NewRecipe,
    NewRecipeWithId,
    Recipe,
    RecipeCategory
} from "../../model/Recipe";
import {
    Box,
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle,
    MenuItem, TextField,
    Typography
} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {Ingredient} from "../../model/Ingredient";

import UpdateIngredientList from "../Ingredient/UpdateIngredientList";
import IngredientCardView from "../Ingredient/IngredientCardView";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import IngredientList from "../Ingredient/IngredientList";


type TemplateAddUpdateRecipeFormProps = | {
    currentRecipe: Recipe
    handleCreateUpdateRecipe(newRecipe: Recipe): void
    isNew: boolean
}
    | {
    currentRecipe: Recipe
    handleCreateUpdateRecipe(modifiedRecipe: Recipe, id?: string): void
    isNew: boolean
}
export default function TemplateAddUpdateRecipeForm(props: TemplateAddUpdateRecipeFormProps) {
    const currentRecipeFormWithoutEnums: NewRecipeWithId = {
        id: props.currentRecipe.id,
        name: props.currentRecipe.name,
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
    const [imageSelected, setImageSelected] = useState("")
    const [items, setItems] = useState<Ingredient []>(props.currentRecipe.ingredients)
    const [openRecipeMD, setOpenRecipeMD] = useState<boolean>(false)
    const [openIngredientMD, setOpenIngredientMD] = useState<boolean>(false)

    function handleOpenRecipeMD() {
        setOpenRecipeMD(true)
    }

    function handleCloseRecipeMD() {
        setOpenRecipeMD(false)
    }

    function handleOpenIngredientMD() {
        setOpenIngredientMD(true)
    }

    function handleCloseIngredientMD() {
        setOpenIngredientMD(false)
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


    function handleCallbackItems(childData: Ingredient[]) {
        setItems(childData)
    }

    function handleCreateUpdateRecipeFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const recipeToSend: Recipe = {
            id: props.currentRecipe.id,
            name: recipeWithoutEnums.name,
            mealType: mealType,
            source: recipeWithoutEnums.source,
            image: props.currentRecipe.image,
            ingredients: items,
            prepTime: recipeWithoutEnums.prepTime,
            preparation: recipeWithoutEnums.preparation,
            portions: recipeWithoutEnums.portions,
            favorite: recipeWithoutEnums.favorite,
            dishTypeCategory: dishTypeCategory,
            recipeCategory: recipeCategory,
            menuCategory: menuCategory,
            garnish: recipeWithoutEnums.garnish,
        }
        if (props.isNew) {
            props.handleCreateUpdateRecipe(recipeToSend)
        } else {
            props.handleCreateUpdateRecipe(recipeToSend, props.currentRecipe.id)
        }
        setRecipeWithoutEnums(currentRecipeFormWithoutEnums)
        setMealType(MealType.LUNCH)
        setDishTypeCategory(DishTypeCategory.VEGGIE)
        setRecipeCategory(RecipeCategory.LOW_CARB)
        setMenuCategory(MenuCategory.MAIN_COURSE)
    }


    const recipeIngredientes = props.currentRecipe.ingredients?.map((ingredientShortInfo) => {
        return <IngredientCardView ingredientToDisplay={ingredientShortInfo}
                                   key={ingredientShortInfo.id}/>
    })


    function handleImageSelected(event: any) {
        setImageSelected(event.target.files[0])
        console.log(event.target.files[0])
    }

    function handleUploadImageSelected() {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "y43msivz")

        const cloudinaryUrl = "https://api.cloudinary.com/v1_1/debod1ejt/image/upload"

        axios.post(cloudinaryUrl, formData)
            .then((imageUploadResponse) => {
                console.log(imageUploadResponse)
            })
        /*const recipeBaseUrl = "/api/users/userId/recipes"+ "/" + id)
        axios.post(recipeBaseUrl, image)
            .then(newImageResponse => {

                })
            })
            .catch(errorMessageReponse => {
                console.error("There is an error by POST request: " + errorMessageReponse)
            })*/

    }


    return (
        <div>
            <Box m={1}
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
            >
                {props.isNew ? <Button onClick={handleOpenRecipeMD} color={"secondary"}>Neues Rezept</Button> :
                    <Button onClick={handleOpenRecipeMD} color={"secondary"} variant={"outlined"}>Ändern</Button>
                }

            </Box>
            <Dialog open={openRecipeMD} onClose={handleCloseRecipeMD}>
                {props.isNew ? <DialogTitle>Neues Rezept</DialogTitle> :
                    <DialogTitle>Rezept bearbeiten</DialogTitle>
                }

                <DialogContent>

                    <form onSubmit={handleCreateUpdateRecipeFormSubmit}>
                        <TextField
                            type={"text"}
                            label={"Name"}
                            name={"name"}
                            value={recipeWithoutEnums.name}
                            onChange={handleFormChange}
                            margin={"dense"}
                            fullWidth
                            variant="outlined"
                            color="secondary"
                        />
                        <TextField
                            type={"text"}
                            label={"Quelle"}
                            name={"source"}
                            value={recipeWithoutEnums.source}
                            onChange={handleFormChange}
                            margin={"dense"}
                            fullWidth
                            color="secondary"
                        /><br/>
                        <Box display="flex" justifyContent="flex-end">

                            <TextField
                                type={"file"}

                                name={"image"}

                                onChange={handleImageSelected}
                                color="secondary"
                            />
                            <Button onClick={handleUploadImageSelected} variant={"contained"} component={"label"}
                                    color={"secondary"}>
                                Bild hochladen
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
                            color="secondary"
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
                            color="secondary"
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
                            color="secondary"

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
                            color="secondary"
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
                            color="secondary"
                        /><br/>
                        <TextField
                            type={"text"}
                            label={"Zubereitungszeit"}
                            name={"prepTime"}
                            value={recipeWithoutEnums.prepTime}
                            onChange={handleFormChange}
                            margin={"dense"}
                            fullWidth
                            color="secondary"
                        /><br/>

                        {props.isNew ? <><Typography align={"center"} variant={"h6"}>
                                Zutatenliste
                            </Typography>
                                <IngredientList handleCallbackItems={handleCallbackItems}/> :
                            </> :
                            <>
                                <Box display="flex" justifyContent="center">
                                    <Button onClick={handleOpenIngredientMD} color={"secondary"}>Zutaten
                                        bearbeiten</Button>
                                </Box>
                                <Dialog open={openIngredientMD} onClose={handleCloseIngredientMD}>
                                    <DialogTitle>Zutaten ändern</DialogTitle>
                                    <DialogContent>
                                        <UpdateIngredientList currentIngredients={items}
                                                              handleCallbackItems={handleCallbackItems}/>

                                    </DialogContent>
                                    <DialogActions>

                                        <Button onClick={handleCloseIngredientMD} color={"secondary"}>
                                            Schließen
                                        </Button>

                                    </DialogActions>
                                </Dialog>
                                {!props.isNew ?
                                    <Typography align={"center"} variant={"body1"}>
                                        {recipeIngredientes}
                                    </Typography> : null}
                                <Box display="flex" justifyContent="center">
                                    <Button type={"submit"} color={"secondary"} variant={"outlined"}
                                            startIcon={<RefreshIcon/>}></Button>
                                </Box>
                            </>
                        }
                        <TextField
                            type={"text"}
                            label={"Zubereitung"}
                            name={"preparation"}
                            multiline
                            value={recipeWithoutEnums.preparation}
                            onChange={handleFormChange}
                            margin={"dense"}
                            fullWidth
                            color="secondary"
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
                            color="secondary"
                        /><br/>

                        <Button type={"submit"} color={"inherit"} variant={"contained"}>Rezept Speichern</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRecipeMD} color={"secondary"}>
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}