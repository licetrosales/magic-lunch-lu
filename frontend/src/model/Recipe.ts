import {Ingredient} from "./Ingredient";
import exp from "constants";

export type Recipe = {
    id?: string,
    name: string,
    mealType: MealType|string,
    source: string,
    image: string,
    ingredients?: Ingredient[],
    prepTime: string,
    preparation: string,
    portions: number,
    favorite: boolean,
    dishTypeCategory?: "VEGGIE"|"MEAT"|"PASTA"|"FISH"|"NICHTS",
    recipeCategory?:"SALAT"|"APPETIZERS"|"SOUPS"|"LOW_CARB"|"HIGH_PROTEIN",
    menuCategory?: "ENTREE"|"MAIN_COURSE"|"DESSERT"|"SNACK",
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
}

export enum MealType {
    BREAKFAST="BREAKFAST",
    LUNCH= "LUNCH",
    DINNER= "DINNER",

}



