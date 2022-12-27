package com.github.licetrosales.backend.model;

import java.util.List;

public record WeekPlan(
        String id,
        List<SelectedDish> weekMealPlan
) {
}
