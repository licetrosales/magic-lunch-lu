package com.github.licetrosales.backend.controller;

import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.model.RecipeDTO;
import com.github.licetrosales.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users/userId")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/recipes")
    List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @PostMapping(value = "/recipes")

    public Recipe addRecipe(
            @RequestPart("recipe") RecipeDTO recipe, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {

        return recipeService.addRecipe(recipe, file);
    }

    @DeleteMapping("/recipes/{id}")
    void deleteRecipe(@PathVariable String id) {
        recipeService.delete(id);
    }

    @PutMapping(path = "/recipes/{id}")
    Recipe updateRecipe(@PathVariable String id, @RequestPart("recipe") RecipeDTO recipe, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {

        return recipeService.updateRecipe(id, recipe, file);
    }
}
