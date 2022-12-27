package com.github.licetrosales.backend.model;

import java.util.List;

public record ShoppingList(
        String id,
        List<Ingredient> products
) {
}
