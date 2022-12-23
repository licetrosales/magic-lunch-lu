package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.repo.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeService {
    private final RecipeRepo recipeRepo;
    private final IdRecipeService idRecipeService;
@Autowired
    public RecipeService(RecipeRepo recipeRepo, IdRecipeService idRecipeService){
        this.recipeRepo = recipeRepo;
        this.idRecipeService = idRecipeService;
    }
   public List<Recipe> getAllRecipes(){
    return recipeRepo.getAllRecipes();
   }

    public Recipe addRecipe(Recipe recipe){
        String id = idRecipeService.generateId();
        Recipe newRecipeWithId = recipe.withId(id);
        return recipeRepo.addRecipe(newRecipeWithId);
    }

}
