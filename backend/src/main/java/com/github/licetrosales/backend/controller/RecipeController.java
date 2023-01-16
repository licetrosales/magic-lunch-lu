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

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/recipes")
    List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @PostMapping("/recipes")
    Recipe addRecipe(@RequestBody RecipeDTO recipe) {

        return recipeService.addRecipe(recipe);
    }

    @DeleteMapping("/recipes/{id}")
    void deleteRecipe(@PathVariable String id) {
        recipeService.delete(id);
    }

    @PutMapping(path = "/recipes/{id}")
    Recipe updateRecipe(@PathVariable String id, @RequestBody RecipeDTO recipeToUpdateWithoutId) {
        Recipe recipeToUpdateWithId = new Recipe(id,
                recipeToUpdateWithoutId.name(),
                recipeToUpdateWithoutId.mealType(),
                recipeToUpdateWithoutId.source(),
                recipeToUpdateWithoutId.image(),
                recipeToUpdateWithoutId.ingredients(),
                recipeToUpdateWithoutId.prepTime(),
                recipeToUpdateWithoutId.preparation(),
                recipeToUpdateWithoutId.portions(),
                recipeToUpdateWithoutId.favorite(),
                recipeToUpdateWithoutId.dishTypeCategory(),
                recipeToUpdateWithoutId.recipeCategory(),
                recipeToUpdateWithoutId.menuCategory(),
                recipeToUpdateWithoutId.garnish());
        return recipeService.updateRecipe(recipeToUpdateWithId);
    }
}
