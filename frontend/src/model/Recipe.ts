import {Ingredient} from "./Ingredient";


export type Recipe = {
    id?: string,
    name: string,
    mealType: MealType | string,
    source: string,
    image: string,
    ingredients?: Ingredient[],
    prepTime: string,
    preparation: string,
    portions: number,
    favorite: boolean,
    dishTypeCategory?: DishTypeCategory | string,
    recipeCategory?: RecipeCategory | string,
    menuCategory?: MenuCategory | string,
    garnish?: string
}
export type NewRecipe = {

    name: string,
    source: string,
    image: string,
    prepTime: string,
    preparation: string,
    portions: number
    favorite: boolean
    garnish: string
}

export enum MealType {
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER = "DINNER",

}

export enum DishTypeCategory {
    VEGGIE = "VEGGIE",
    MEAT = "MEAT",
    PASTA = "PASTA",
    FISH = "FISH",
    NOTHING_TODAY = "NOTHING_TODAY",
}

export enum RecipeCategory {
    SALAD = "SALAD",
    APPETIZER = "APPETIZER",
    SOUP = "SOUP",
    LOW_CARB = "LOW_CARB",
    HIGH_PROTEIN = "HIGH_PROTEIN",
}
export enum MenuCategory {
    ENTREE= "ENTREE",
    MAIN_COURSE ="MAIN_COURSE",
    DESSERT="DESSERT",
    SNACK="SNACK",
}


