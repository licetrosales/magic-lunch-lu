package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.*;
import com.github.licetrosales.backend.repo.RecipeRepo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RecipeServiceTest {
    RecipeRepo recipeRepo = mock(RecipeRepo.class);
    IdRecipeService idRecipeService = mock(IdRecipeService.class);

    RecipeService recipeService = new RecipeService(recipeRepo, idRecipeService);

    String id = "testId";
    String idDay1 = "testIdDay1";
    String name = "Big Mac Salat";
    MealType mealType = MealType.LUNCH;
    String source = "GU";
    String image = "./image.png";
    List<Ingredient> ingredients = Collections.emptyList();
    String prepTime = "30 min.";
    String preparation = "Anweisungen eintragen";

    int portions = 2;
    boolean favorite = true;
    DishTypeCategory dishTypeCategory = DishTypeCategory.FISH;
    RecipeCategory recipeCategory = RecipeCategory.LOW_CARB;
    MenuCategory menuCategory = MenuCategory.MAIN_COURSE;
    String garnish = "Salat";


    RecipeDTO recipeTestWithoutId = new RecipeDTO(name, mealType, source, image,
            ingredients, prepTime, preparation, portions, favorite, dishTypeCategory,
            recipeCategory, menuCategory, garnish);
    Recipe recipeTestWithId = new Recipe(id, name, mealType, source, image,
            ingredients, prepTime, preparation, portions, favorite, dishTypeCategory,
            recipeCategory, menuCategory, garnish);

    Recipe recipeTestWithIdDay1 = new Recipe(idDay1, name, mealType, source, image,
            ingredients, prepTime, preparation, portions, favorite, dishTypeCategory,
            recipeCategory, menuCategory, garnish);

    String ingredientId1 = "testIngredientId1";
    String ingredientName1 = "Zwiebel";
    String ingredientName2 = "Cheddar";
    String ingredientQuantity1 = "1";
    String ingredientQuantity2 = "10";
    Unit ingredientUnit1 = Unit.SMALL;
    Unit ingredientUnit2 = Unit.G;
    ProductCategory productCategory1 = ProductCategory.PRODUCE;

    Boolean isInShoppingList = false;

    Ingredient ingredientWithoutId1 = new Ingredient(null, ingredientName1, ingredientQuantity1, ingredientUnit1, isInShoppingList, null);
    Ingredient ingredientWithoutId2 = new Ingredient(idDay1, ingredientName2, ingredientQuantity2, ingredientUnit2, isInShoppingList, null);

    List<Ingredient> ingredientsWithoutId = List.of(ingredientWithoutId1, ingredientWithoutId2);
    RecipeDTO recipeTestWithoutIdWithIngredients = new RecipeDTO(name, mealType, source, image,
            ingredientsWithoutId, prepTime, preparation, portions, favorite, dishTypeCategory,
            recipeCategory, menuCategory, garnish);
    Recipe recipeTestWithIdWithIngredient = new Recipe(id, name, mealType, source, image,
            ingredientsWithoutId, prepTime, preparation, portions, favorite, dishTypeCategory,
            recipeCategory, menuCategory, garnish);

    @Test
    void getAllRecipes_shouldReturnEmptyList_whenRecipeGalleryIsEmpty() {
        when(recipeRepo.findAll())
                .thenReturn(Collections.emptyList());

        List<Recipe> result = recipeService.getAllRecipes();

        verify(recipeRepo).findAll();
        assertEquals(Collections.emptyList(), result);

    }

    @Test
    void getAllRecipes_shouldReturnOneRecipe_whenOneRecipeIsInRecipeGallery() {
        when(recipeRepo.findAll())
                .thenReturn(Collections.singletonList(recipeTestWithId));

        List<Recipe> result = recipeService.getAllRecipes();

        verify(recipeRepo).findAll();
        assertThat(result).containsExactly(recipeTestWithId);
    }

    @Test
    void addRecipe_shouldReturnRecipe_whenRecipeIsAdded() {
        when(idRecipeService.generateId()).thenReturn("testId");
        when(recipeRepo.save(recipeTestWithId)).thenReturn(recipeTestWithId);

        Recipe result = recipeService.addRecipe(recipeTestWithoutId);

        verify(recipeRepo).save(recipeTestWithId);
        assertEquals(recipeTestWithId, result);
    }

    @Test
    void addRecipe_shouldAddRecipeId_whenRecipeWithoutIdIsGiven() {

        RecipeDTO recipeToAdd = recipeTestWithoutId;

        when(idRecipeService.generateId()).thenReturn("testIdDay1");
        when(recipeRepo.save(recipeTestWithIdDay1)).thenReturn(recipeTestWithIdDay1);

        Recipe result = recipeService.addRecipe(recipeToAdd);

        verify(recipeRepo).save(recipeTestWithIdDay1);
        assertEquals(recipeTestWithIdDay1.id(), result.id());
    }

    @Test
    void addRecipe_shouldAddRecipeWithIngredients_whenIngredientsAreGiven() {

        RecipeDTO recipeToAdd = recipeTestWithoutIdWithIngredients;

        when(idRecipeService.generateId()).thenReturn(id);
        when(recipeRepo.save(recipeTestWithIdWithIngredient)).thenReturn(recipeTestWithIdWithIngredient);

        Recipe result = recipeService.addRecipe(recipeToAdd);

        verify(recipeRepo).save(recipeTestWithIdWithIngredient);
        assertEquals(recipeTestWithIdWithIngredient.ingredients(), result.ingredients());

    }

    @Test
    void deleteRecipe_shouldDeleteRecipe_whenRecipeIdExists() {
        String recipeToRemoveId = recipeTestWithIdWithIngredient.id();
        when(recipeRepo.findById(recipeTestWithIdWithIngredient.id())).thenReturn(Optional.of(recipeTestWithIdWithIngredient));

        recipeService.delete(recipeToRemoveId);

        verify(recipeRepo).delete(recipeTestWithIdWithIngredient);

    }

    @Test
    void findById_shouldFindRecipe_whenRecipeIdExists() {
        String recipeToFindId = id;

        when(recipeRepo.findById(id)).thenReturn(Optional.of(recipeTestWithId));

        Recipe result = recipeService.findById(recipeToFindId);

        assertEquals(recipeTestWithId, result);
    }

    @Test
    void findById_shouldReturnMessage_whenRecipeIdNotExists() {
        when(recipeRepo.findById("testId1")).thenReturn(Optional.empty());

        try {
            recipeService.findById("testId2");
            fail();
        } catch (IllegalArgumentException message) {
            assertEquals("Recipe Id not found!", message.getMessage());
        }
    }

    @Test
    void updateRecipe_shouldReturnRecipeWithChanges_whenRecipeIdExists() {
        Recipe recipeToUpdate = new Recipe(recipeTestWithId.id(), "soup 1", MealType.BREAKFAST, "");

        when(recipeRepo.existsById(recipeTestWithId.id())).thenReturn(true);

        Recipe result = recipeService.updateRecipe(recipeToUpdate);

        assertNotEquals(recipeTestWithId, result);
    }

    @Test
    public void updateRecipe_shouldThrowException_whenUserDoesntExist() {
        Recipe recipeInDB = new Recipe(recipeTestWithId.id(), "soup 1", MealType.BREAKFAST, "");
        Recipe recipeNotExistsInDB = new Recipe(recipeTestWithId.id(), "soup 2", MealType.BREAKFAST, "");

        when(recipeRepo.existsById(recipeInDB.id())).thenReturn(true);

        Recipe result = recipeService.updateRecipe(recipeNotExistsInDB);
        try {
            recipeService.updateRecipe(recipeNotExistsInDB);
            fail();
        } catch (NoSuchElementException message) {
            assertEquals("There is no element with the requested ID", message.getMessage());
        }
    }

    @Test
    void exceptionTesting() {
        when(recipeRepo.existsById(recipeTestWithId.id())).thenReturn(false);

        NoSuchElementException thrown = assertThrows(
                NoSuchElementException.class, () ->
                        recipeService.updateRecipe(recipeTestWithId), "There is no element with the requested ID"
        );
        assertTrue(thrown.getMessage().contentEquals("There is no element with the requested ID"));
    }

}
