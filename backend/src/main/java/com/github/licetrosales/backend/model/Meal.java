package com.github.licetrosales.backend.model;

import java.time.LocalDate;

public record Meal(
        String id,
        LocalDate date,
        MealType mealType,
        Recipe recipe) {
}

