package com.github.licetrosales.backend.model;

import java.time.LocalDate;

public record MealDTO(
        LocalDate date,
        MealType mealType,
        Recipe recipe
) {
}

