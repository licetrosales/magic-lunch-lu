package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.*;
import com.github.licetrosales.backend.repo.RecipeRepo;
import org.assertj.core.api.Assertions;
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

    String recipeId = "testId1";
    String name = "Big Mac Salat";
    MealType mealType = MealType.LUNCH;
    String source = "GU";
    String image = "./image";
    List<Ingredient> ingredients =  Collections.emptyList();
    String prepTime = "30 min,";
    String preparation = "Anweisungen eintragen";

    int portions = 2;
    boolean favorite = true;
    DishTypeCategory dishTypeCategory = DishTypeCategory.FISH;
    RecipeCategory recipeCategory = RecipeCategory.LOW_CARB;
    MenuCategory menuCategory = MenuCategory.MAIN_COURSE;
    String garnish = "Salat";

    Recipe recipeTest = new Recipe(recipeId, name, mealType, source, image,
            ingredients, prepTime, preparation, portions, favorite, dishTypeCategory,
            recipeCategory, menuCategory, garnish);

    @Test
    void getAllRecipes_shouldReturnEmptyList_whenRecipeGalleryIsEmpty(){
        when(recipeRepo.getAllRecipes())
                .thenReturn(Collections.emptyList());
        List<Recipe> result = recipeService.getAllRecipes();
        verify(recipeRepo).getAllRecipes();
        assertEquals(Collections.emptyList(), result);

    }

    @Test
    void getAllRecipes_shouldReturnOneRecipe_whenOneRecipeIsInRecipeGallery (){
        when(recipeRepo.getAllRecipes())
                .thenReturn(Collections.singletonList(recipeTest));
        List<Recipe> result = recipeService.getAllRecipes();
        verify(recipeRepo).getAllRecipes();
        Assertions.assertThat(result).containsExactly(recipeTest);

    }
    @Test
    void addRecipe_shouldReturnRecipe_whenRecipeIsAdded() {


        when(idRecipeService.generateId()).thenReturn("testId1");
        when(recipeRepo.addRecipe(recipeTest)).thenReturn(recipeTest);

        Recipe result = recipeService.addRecipe(recipeTest);
        verify(recipeRepo).addRecipe(recipeTest);
        assertEquals(recipeTest, result);
    }



}
