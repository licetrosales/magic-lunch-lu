import {MealType, Recipe} from "./Recipe";

export type Meal = {
    id?: string,
    date: Date,
    mealType: MealType,
    recipe: Recipe
}