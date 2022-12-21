package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.*;
import com.github.licetrosales.backend.repo.RecipeRepo;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RecipeServiceTest {
    RecipeRepo recipeRepo = mock(RecipeRepo.class);
    IdRecipeService idRecipeService = mock(IdRecipeService.class);

    RecipeService recipeService = new RecipeService(recipeRepo, idRecipeService);


    @Test
    void addRecipe_shouldReturnRecipe_whenRecipeIsAdded() {

        String recipeId = "testId1";
        String name = "Big Mac Salat";
        MealType mealType = MealType.LUNCH;
        String source = "GU";
        String image = "./image";
        List<Ingredient> ingredients =  Collections.emptyList();
        String prepTime = "30 min,";
        String preparation = "Anweisungen eintragen";
        DishTypeCategory dishTypeCategory = DishTypeCategory.FISH;
        int portions = 2;
        RecipeCategory recipeCategory = RecipeCategory.LOW_CARB;
        MenuCategory menuCategory = MenuCategory.MAIN_COURSE;
        Garnish garnish = Garnish.GREEN_SALAD;

        Recipe newRecipe = new Recipe(recipeId, name, mealType, source, image, ingredients, prepTime, preparation, dishTypeCategory, portions, recipeCategory, menuCategory, garnish);
        when(idRecipeService.generateId()).thenReturn("testId1");
        when(recipeRepo.addRecipe(newRecipe)).thenReturn(newRecipe);

        Recipe result = recipeService.addRecipe(newRecipe);
        verify(recipeRepo).addRecipe(newRecipe);
        assertEquals(newRecipe, result);
    }

}
