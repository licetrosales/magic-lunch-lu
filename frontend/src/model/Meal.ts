import {MealType, Recipe} from "./Recipe";

export type Meal = {
    id?: string,
    localDate: Date,
    mealType: MealType,
    recipe: Recipe
}