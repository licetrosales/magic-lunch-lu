package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.*;

import com.github.licetrosales.backend.repo.WeekMealPlanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.*;



@Service
public class WeekMealPlanService {
    private final WeekMealPlanRepo weekMealPlanRepo;
    private final IdWeekMealPlanService idWeekMealPlanService;

    private final RecipeService recipeService;

    @Autowired
    public WeekMealPlanService(WeekMealPlanRepo weekMealPlanRepo, IdWeekMealPlanService idWeekMealPlanService, RecipeService recipeService) {
        this.idWeekMealPlanService = idWeekMealPlanService;
        this.weekMealPlanRepo = weekMealPlanRepo;
        this.recipeService = recipeService;
    }


    public List<WeekMealPlan> getAllWeekMealPlans() {
        return weekMealPlanRepo.findAll();
    }

    public WeekMealPlan addWeekMealPlan(WeekMealPlanDTO weekMealPlanWithoutId) {
        List<Meal> weekMeals;
        weekMeals = weeklyMealGenerator();
        WeekMealPlan weekMealPlanModified = new WeekMealPlan(
                idWeekMealPlanService.generateId(),
                weekMeals);
        return weekMealPlanRepo.save(weekMealPlanModified);
    }

    public List<Meal> weeklyMealGenerator() {

        SecureRandom random = new SecureRandom();
        List<Recipe> listOfRecipes = recipeService.getAllRecipes();
        List<Meal> weekMealPlan = new ArrayList<>();
        LocalDate localDate = LocalDate.now();
        MealType mealType = MealType.LUNCH;

        for (int i = 0; i < 7; i++) {
            int index = random.nextInt(listOfRecipes.size());
            Meal mealOfTheDay = new Meal(
                    idWeekMealPlanService.generateId(),
                    localDate.plusDays(i),
                    mealType,
                    listOfRecipes.get(index)
            );
            weekMealPlan.add(mealOfTheDay);
        }
        return weekMealPlan;
    }
}
