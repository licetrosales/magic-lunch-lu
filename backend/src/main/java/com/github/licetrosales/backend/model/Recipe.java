package com.github.licetrosales.backend.model;

import lombok.With;

import java.util.List;

@With

public record Recipe(
       // @Id
        String id,
        String name,
        MealType mealType,
        String source,
        String image,
        List<Ingredient> ingredients,
        String prepTime,
        String preparation,
        int portions,
        Boolean favorite,
        DishTypeCategory dishTypeCategory,

        RecipeCategory recipeCategory,
        MenuCategory menuCategory,
        Garnish garnish
) {
}
