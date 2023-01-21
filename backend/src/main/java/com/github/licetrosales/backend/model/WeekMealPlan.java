package com.github.licetrosales.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document("mealplans")
public record WeekMealPlan (
    @Id
            String id,
            List<Meal> weekMealPlan
    ){
}
