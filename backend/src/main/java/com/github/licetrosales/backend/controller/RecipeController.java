package com.github.licetrosales.backend.controller;

import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.model.RecipeDTO;
import com.github.licetrosales.backend.repo.RecipeRepo;
import com.github.licetrosales.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/userId")
public class RecipeController {
    private final RecipeRepo recipeRepo;
    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService, RecipeRepo recipeRepo) {
        this.recipeService = recipeService;
        this.recipeRepo = recipeRepo;
    }

    @GetMapping("/recipes")
    List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @PostMapping("/recipes")
    Recipe addRecipe(@RequestBody RecipeDTO recipe) {

        return recipeService.addRecipe(recipe);
    }
}
