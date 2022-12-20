import {Ingredient} from "./Ingredient";

export type Recipe = {
    id: string;
    name: string;
    mealType: MealType;
    source: string;
    image: string
    ingredients: Ingredient[];
    prepTime: string;
    preparation: string;
    dishTypeCategory: DishTypeCategory;
    portions: number;
    recipeCategory: RecipeCategory;
    menuCategory: MenuCatefory;
    garnish: Garnish;
}

export enum MealType {
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER"
}

export enum DishTypeCategory {
    VEGGIE = "VEGGIE",
    MEAT = "MEAT",
    PASTA = "PASTA",
    FISH = "FISH",
    NICHTS = "NICHTS"
}

export enum RecipeCategory {
    SALAT = "SALAT",
    APPETIZERS = "APPETIZERS",
    SOUPS = "SOUPS",
    LOW_CARB = "LOW CARB",
    HIHG_PROTEIN = "HIGH PROTEIN"
}

export enum MenuCatefory {
    ENTREE = "ENTREE",
    MAIN_COURSE = "MAIN COURSE",
    DESSERT = "DESSET",
    SNACK = "SNACK"
}

export enum Garnish {
    GRILLED_VEGETABLES = "GRILLED VEGETABLES",
    GARLIC_MASHED_CAULIFLOWER = "GARLIC MASHED CAULIFLOWER",
    CLASSIC_GREEN_BEAN_CASSEROLE = "CLASSIC GREEN BEAN CASSEROLE",
    CHEESY_POTATO_CASSEROLE = "CHEESY POTATO CASSEROLE",
    GREEN_SALAD = "GREEN SALAD",
    LEMON_PARMESAN_ROASTED_BROCCOLI = "LEMON PARMESAN ROASTED BROCCOLI"
}