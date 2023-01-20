import {Recipe} from "./Recipe";

export type Weekplan = {
    id: string,

    mealsOfTheWeek: MealOfTheDay[]
}

export type MealOfTheDay = {
    date: string,
    meal: Recipe
}

