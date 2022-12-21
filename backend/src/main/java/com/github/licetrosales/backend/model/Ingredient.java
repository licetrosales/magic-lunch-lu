package com.github.licetrosales.backend.model;

public record Ingredient (
        String id,
        String name,
        String quantity,
        Unit unit,
        ProductCategory productCategory,
        boolean isInShoppingList) {

}
