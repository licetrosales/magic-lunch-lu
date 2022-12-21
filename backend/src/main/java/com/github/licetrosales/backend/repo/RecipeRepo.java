package com.github.licetrosales.backend.repo;

import com.github.licetrosales.backend.model.Recipe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class RecipeRepo {
    private List<Recipe> recipes;
@Autowired
    public RecipeRepo(List<Recipe> recipes){
        this.recipes= recipes;
    }

    public Recipe addRecipe(Recipe recipe){
        recipes.add(recipe);
    return recipe;
    }

}
