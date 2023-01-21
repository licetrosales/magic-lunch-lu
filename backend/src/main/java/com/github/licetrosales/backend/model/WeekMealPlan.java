package com.github.licetrosales.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
@Document("mealplans")
public record WeekMealPlan (
    @Id
            String id,
            Meal[] weekMealPlan
    ){
}
