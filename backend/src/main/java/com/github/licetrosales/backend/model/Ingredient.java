package com.github.licetrosales.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;

import java.util.Collections;
@With
public record Ingredient(
        @Id
        String id,
        String name,
        String quantity,
        Unit unit,
        boolean isInShoppingList,
        ProductCategory productCategory
        ) {
    Ingredient(
            String name,
            String quantity,
            Unit unit,
            Boolean isInShoppingList
    ) {
        this(null, name, quantity, unit, false, null);
    }
}