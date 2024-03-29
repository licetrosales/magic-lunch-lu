package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.*;
import com.github.licetrosales.backend.repo.WeekMealPlanRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Service
class WeekMealPlanServiceTest {
    WeekMealPlanRepo weekMealPlanRepo = mock(WeekMealPlanRepo.class);
    RecipeService recipeService = mock(RecipeService.class);
    IdWeekMealPlanService idWeekMealPlanService = mock(IdWeekMealPlanService.class);


    WeekMealPlanService weekMealPlanService = new WeekMealPlanService(weekMealPlanRepo, idWeekMealPlanService, recipeService);
    String id = "testId";
    List<Meal> weekMealPlan = Collections.emptyList();
    Recipe recipe = new Recipe(id, "recipe 1", MealType.LUNCH, "source", "image",
            Collections.emptyList()," prepTime", "preparation", 2, true, DishTypeCategory.FISH,RecipeCategory.APPETIZER,MenuCategory.DESSERT,"Reis");
    List<Recipe> recipes = List.of(recipe,recipe,recipe,recipe,recipe,recipe,recipe );
    WeekMealPlanDTO weekMealPlanWithoutId = new WeekMealPlanDTO(weekMealPlan);
    WeekMealPlan weekMealPlanWithId = new WeekMealPlan(id, weekMealPlan );
    Meal meal = new Meal("today", LocalDate.now(), MealType.LUNCH, recipe);

    Meal meal1 = new Meal("today", LocalDate.now().plusDays(1), MealType.LUNCH, recipe);
    Meal meal2 = new Meal("today", LocalDate.now().plusDays(2), MealType.LUNCH, recipe);
    Meal meal3 = new Meal("today", LocalDate.now().plusDays(3), MealType.LUNCH, recipe);
    Meal meal4 = new Meal("today", LocalDate.now().plusDays(4), MealType.LUNCH, recipe);
    Meal meal5 = new Meal("today", LocalDate.now().plusDays(5), MealType.LUNCH, recipe);
    Meal meal6 = new Meal("today", LocalDate.now().plusDays(6), MealType.LUNCH, recipe);
    List <Meal> meals = List.of(meal, meal1, meal2, meal3, meal4, meal5, meal6);

    WeekMealPlan weekMealPlanWithMeals = new WeekMealPlan("today", meals);
    @Autowired
    @Test
    void getAllWeekMealPlans_shouldReturnEmptyList_whenWeekMealPlanGalleryIsEmpty() {
        when (weekMealPlanRepo.findAll())
                .thenReturn(Collections.emptyList());

        List<WeekMealPlan> result = weekMealPlanService.getAllWeekMealPlans();

        verify(weekMealPlanRepo).findAll();
        assertEquals(Collections.emptyList(), result);

    }

    @Test
    void addWeekMealPlan_shouldReturnRecipe_whenRecipeIsAdded() {

        when (recipeService.getAllRecipes())
                .thenReturn(recipes);
        when(idWeekMealPlanService.generateId()).thenReturn("today");
        when(weekMealPlanRepo.save(any())).thenReturn(new WeekMealPlan("today", meals));

        WeekMealPlan result = weekMealPlanService.addWeekMealPlan(weekMealPlanWithoutId);

        assertEquals(weekMealPlanWithMeals, result);
        verify(weekMealPlanRepo).save(result);

    }


}