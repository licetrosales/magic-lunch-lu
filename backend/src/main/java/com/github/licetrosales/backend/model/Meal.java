package com.github.licetrosales.backend.model;

public record Meal(
        String id,
        MealType mealType,
        Recipe recipe
) {
}
