package com.github.licetrosales.backend.model;

public record WeekPlan(
        String id,
        List<SelectedDish> weekMealPlan
) {
}
