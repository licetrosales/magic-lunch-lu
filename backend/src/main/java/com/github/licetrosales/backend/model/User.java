package com.github.licetrosales.backend.model;

import java.util.List;

public record User(
        String id,
        String name,
        String password,
        String email,
        List<Recipe> recipes,
        List<WeekPlan> weekplans,
        List<ShoppingList> shoppingLists
        ) {
}
