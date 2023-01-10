package com.github.licetrosales.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collections;
import java.util.List;

@With
@Document("recipes")
public record Recipe(
        @Id
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
        String garnish
) {
    public Recipe(
            String name,
            MealType mealType,
            String source
    ) {
        this(null, name, mealType, source, null, Collections.emptyList(), null, null, 0, null, null, null, null, null);
    }
   public Recipe(
            String id,
            String name,
            MealType mealType,
            String source
    ) {
        this(id, name, mealType, source, null, Collections.emptyList(), null, null, 0, null, null, null, null, null);
    }
}
