package com.github.licetrosales.backend.service;

import com.github.licetrosales.backend.model.Meal;
import com.github.licetrosales.backend.model.MealType;
import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.repo.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

public class MealService {
    private final RecipeRepo recipeRepo;
    private final IdMealService idMealService;


    public MealService(RecipeRepo recipeRepo, IdMealService idMealService) {
        this.recipeRepo = recipeRepo;
        this.idMealService = idMealService;
    }


    public List<Meal> getAllMealPlans() {
        return recipeRepo.findAll();
    }

    public List<Meal> weeklyMealGenerator() {
        Random random = new Random();
        List<Recipe> listOfRecipes = getAllRecipes();
        List<Meal> weekMealPlan = new ArrayList<>();
        LocalDate localDate = LocalDate.now();
        MealType mealType = MealType.LUNCH;

        for (int i = 0; i < 7; i++) {
            int index = random.nextInt(listOfRecipes.size());
            Meal mealOfTheDay = new Meal(
                    idMealService.generateId(),
                    localDate.plusDays(i),
                    mealType,
                    listOfRecipes.get(index)
            );
            weekMealPlan.add(mealOfTheDay);

        }
        return weekMealPlan;
    }

    }
