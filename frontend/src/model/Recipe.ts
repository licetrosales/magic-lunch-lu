import {Ingredient} from "./Ingredient";

export type Recipe = {
    id?: string,
    name: string,
    mealType?: "BREAKFAST"|"LUNCH"|"DINNER",
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



