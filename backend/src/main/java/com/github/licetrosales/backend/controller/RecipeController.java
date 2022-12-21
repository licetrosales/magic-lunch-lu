package com.github.licetrosales.backend.controller;

import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.repo.RecipeRepo;
import com.github.licetrosales.backend.service.IdRecipeService;
import com.github.licetrosales.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
    private final RecipeRepo recipeRepo;
    private final RecipeService recipeService;
    @Autowired
    public RecipeController(RecipeService recipeService, RecipeRepo recipeRepo){
        this.recipeService = recipeService;
        this.recipeRepo = recipeRepo;
    }

    public Recipe addRecipe(@RequestBody Recipe recipe){
        return recipeService.addRecipe(recipe);
    }


}
