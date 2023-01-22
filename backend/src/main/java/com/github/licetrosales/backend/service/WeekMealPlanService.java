package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.Meal;
import com.github.licetrosales.backend.model.MealType;
import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.model.WeekMealPlan;
import com.github.licetrosales.backend.repo.RecipeRepo;
import com.github.licetrosales.backend.repo.WeekMealPlanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

@Service
public class WeekMealPlanService {
    private final WeekMealPlanRepo weekMealPlanRepo;
    private final IdWeekMealPlanService idWeekMealPlanService;
    @Autowired
    private RecipeService recipeService;
    @Autowired
    public WeekMealPlanService(WeekMealPlanRepo weekMealPlanRepo, IdWeekMealPlanService idWeekMealPlanService) {
        this.idWeekMealPlanService = idWeekMealPlanService;
        this.weekMealPlanRepo = weekMealPlanRepo;
    }



    public List<WeekMealPlan> getAllWeekMealPlans() {
        return weekMealPlanRepo.findAll();
    }

    public WeekMealPlan addWeekMealPlan(WeekMealPlan weekMealPlan) {
        List<Meal> weekMeals;
        weekMeals = weeklyMealGenerator();
        WeekMealPlan weekMealPlanModified = new WeekMealPlan(
                idWeekMealPlanService.generateId(),
                weekMeals);
        return weekMealPlanRepo.save(weekMealPlanModified);
    }

    public List<Meal> weeklyMealGenerator() {
        Random random = new Random();
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
