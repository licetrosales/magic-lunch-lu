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
        DishTypeCategory dishTypeCategory,
        int portions,
        RecipeCategory recipeCategory,
        MenuCategory menuCategory,
        Garnish garnish
) {
}
