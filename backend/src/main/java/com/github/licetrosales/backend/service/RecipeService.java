package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.model.RecipeDTO;
import com.github.licetrosales.backend.repo.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Update.update;

@Service
public class RecipeService {
    private final RecipeRepo recipeRepo;
    private final IdRecipeService idRecipeService;

    @Autowired
    public RecipeService(RecipeRepo recipeRepo, IdRecipeService idRecipeService) {
        this.recipeRepo = recipeRepo;
        this.idRecipeService = idRecipeService;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepo.findAll();
    }

    public Recipe addRecipe(RecipeDTO recipe) {
        Recipe newRecipeWithId = new Recipe(
                idRecipeService.generateId(),
                recipe.name(),
                recipe.mealType(),
                recipe.source(),
                recipe.image(),
                recipe.ingredients(),
                recipe.prepTime(),
                recipe.preparation(),
                recipe.portions(),
                recipe.favorite(),
                recipe.dishTypeCategory(),
                recipe.recipeCategory(),
                recipe.menuCategory(),
                recipe.garnish()

        );
        return recipeRepo.save(newRecipeWithId);
    }

    public Recipe findById(String id) {
        Optional<Recipe> optionalRecipe = recipeRepo.findById(id);
        if (optionalRecipe.isPresent()) {
            return optionalRecipe.get();
        }
        throw new IllegalArgumentException("Recipe Id not found!");
    }

    public void delete(String id) {
        Recipe recipe = findById(id);
        recipeRepo.delete(recipe);
    }

    public Recipe updateRecipe(Recipe recipeToUpdate) {
        /*Recipe recipeToUpdateWithId = new Recipe(
                idRecipeService.generateId(),
                recipeToUpdate.name(),
                recipeToUpdate.mealType(),
                recipeToUpdate.source(),
                recipeToUpdate.image(),
                recipeToUpdate.ingredients(),
                recipeToUpdate.prepTime(),
                recipeToUpdate.preparation(),
                recipeToUpdate.portions(),
                recipeToUpdate.favorite(),
                recipeToUpdate.dishTypeCategory(),
                recipeToUpdate.recipeCategory(),
                recipeToUpdate.menuCategory(),
                recipeToUpdate.garnish()
        );*/
        if (!recipeRepo.existsById(recipeToUpdate.id())) {
            throw new NoSuchElementException("There is no element with the requested ID");
        } else {
            recipeRepo.save(recipeToUpdate);
        }
        return recipeToUpdate;
    }
}