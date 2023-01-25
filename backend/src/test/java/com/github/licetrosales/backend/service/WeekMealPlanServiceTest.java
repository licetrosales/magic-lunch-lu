package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.*;
import com.github.licetrosales.backend.repo.WeekMealPlanRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Service
class WeekMealPlanServiceTest {
    WeekMealPlanRepo weekMealPlanRepo = mock(WeekMealPlanRepo.class);
    RecipeService recipeService = mock(RecipeService.class);
    IdWeekMealPlanService idWeekMealPlanService = mock(IdWeekMealPlanService.class);


    WeekMealPlanService weekMealPlanService = new WeekMealPlanService(weekMealPlanRepo, idWeekMealPlanService);
    String id = "testId";
    List<Meal> weekMealPlan = Collections.emptyList();
    Recipe recipe = new Recipe(id, "recipe 1", MealType.LUNCH, "source", "image",
            Collections.emptyList()," prepTime", "preparation", 2, true, DishTypeCategory.FISH,RecipeCategory.APPETIZER,MenuCategory.DESSERT,"Reis");
    List<Recipe> recipes = List.of(recipe,recipe,recipe,recipe,recipe,recipe,recipe );
    WeekMealPlanDTO weekMealPlanWithoutId = new WeekMealPlanDTO(weekMealPlan);
    WeekMealPlan weekMealPlanWithId = new WeekMealPlan(id, weekMealPlan );

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
        when(weekMealPlanRepo.save(weekMealPlanWithId)).thenReturn(weekMealPlanWithId);

        WeekMealPlan result = weekMealPlanService.addWeekMealPlan(weekMealPlanWithoutId);

        verify(weekMealPlanRepo).save(weekMealPlanWithId);

        assertEquals(weekMealPlanWithId, result);

    }

    @Test
    void weeklyMealGenerator() {
    }
}