package com.github.licetrosales.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collections;
import java.util.List;
@JsonIgnoreProperties(ignoreUnknown = true)
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
}
