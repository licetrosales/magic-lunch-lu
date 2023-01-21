import {MealType} from "./Recipe";

export type Recipe = {
    id?: String,
    localDate: Date,
    mealType: MealType,
    recipe: Recipe
}