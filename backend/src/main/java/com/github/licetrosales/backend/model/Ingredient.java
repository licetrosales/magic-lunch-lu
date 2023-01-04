package com.github.licetrosales.backend.model;

import java.util.Collections;

public record Ingredient(
        String id,
        String name,
        String quantity,
        Unit unit,
        ProductCategory productCategory,
        boolean isInShoppingList) {
    Ingredient(
            String name,
            String quantity,
            Unit unit,
            Boolean isInShoppingList
    ) {
        this(null, name, quantity, unit, null, true);
    }
}