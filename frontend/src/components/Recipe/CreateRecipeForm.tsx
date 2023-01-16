import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {DishTypeCategory, MealType, MenuCategory, NewRecipe, Recipe, RecipeCategory} from "../../model/Recipe";
import IngredientList from "../Ingredient/IngredientList";
import {Ingredient} from "../../model/Ingredient";
import axios from "axios";


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
    const [items, setItems] = useState<Ingredient []>([])
    const[imageSelected, setImageSelected]=useState("")
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


    function handleCallbackItems(childData: Ingredient[]) {
        setItems(childData)
    }

    function handleCreateRecipeFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.handleCreateRecipe({
            name: recipeWithoutEnums.name,
            mealType: mealType,
            source: recipeWithoutEnums.source,
            image: recipeWithoutEnums.image,
            ingredients: items,
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

    function handleImageSelected(event:any){
        setImageSelected(event.target.files[0])

        console.log(event.target.files[0])

        const formData=new FormData()
        formData.append("file",imageSelected)
        formData.append("upload_preset","y43msivz")

        const cloudinaryUrl="https://api.cloudinary.com/v1_1/debod1ejt/upload"
        axios.post(cloudinaryUrl,formData)
            .then((imageUploadResponse)=>{console.log(imageUploadResponse)
            })
    }

    return (
        <div>
            <Box m={1}
                 display="flex"
                 justifyContent="center"
                 alignItems="center"
            >
                <Button onClick={handleOpen} color={"secondary"}>Neues Rezept</Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Neues Rezept</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleCreateRecipeFormSubmit}>
                        <TextField
                            type={"text"}
                            label={"Name"}
                            placeholder={"Rezeptname"}
                            name={"name"}
                            value={recipeWithoutEnums.name}
                            onChange={handleFormChange}
                            margin={"dense"}
                            fullWidth
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
                            <Button variant={"contained"} component={"label"} color={"secondary"}>
                                Bild hochladen
                                <input
                                    hidden
                                    accept={"images/*"}
                                    multiple
                                    type={"file"}

                                    name={"image"}
                                    value={recipeWithoutEnums.image}
                                    onChange={handleImageSelected}
                                    />
                            </Button>
                        </Box>

                        <TextField
                            select
                            label="Mahlzeit"
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
                                color="secondary"
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
                            placeholder={"Gesamtzeit inkl. Vorbereitung"}
                            name={"prepTime"}
                            value={recipeWithoutEnums.prepTime}
                            onChange={handleFormChange}
                            margin={"dense"}
                            fullWidth
                            color="secondary"
                        /><br/>
                        <Typography align={"center"} variant={"h6"}>
                            Zutatenliste
                        </Typography>
                        <IngredientList handleCallbackItems={handleCallbackItems}/>
                        <TextField
                            type={"text"}
                            label={"Zubereitung"}
                            placeholder={"Anweisungen eintragen..."}
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
                            placeholder={"falls das Rezept keine Beilage enthält"}
                            name={"garnish"}
                            value={recipeWithoutEnums.garnish}
                            onChange={handleFormChange}
                            margin={"dense"}
                            fullWidth
                            multiline
                            color="secondary"
                        /><br/>

                        <Button type={"submit"} color={"inherit"} variant={"contained"}>Rezept speichern</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={"secondary"}>
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}