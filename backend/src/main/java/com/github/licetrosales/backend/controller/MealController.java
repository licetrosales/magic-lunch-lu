package com.github.licetrosales.backend.controller;

import com.github.licetrosales.backend.model.Meal;
import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.model.RecipeDTO;
import com.github.licetrosales.backend.service.MealService;
import com.github.licetrosales.backend.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public class MealController {
    @RestController
    @RequestMapping("/api/users/userId")
    public class MealController {

        private final MealService mealService;


        public MealController(MealService mealService) {
            this.mealService = mealService;
        }

        @GetMapping("/mealplans")
        List<Meal> getAllMealPlans() {
            return mealService.getAllMealPlans();
        }

        @PostMapping(value = "/mealPlans")

        public Meal[] weeklyMealGenerator(
                @RequestBody mealPlanDTO recipe, @RequestPart("file") MultipartFile file) throws IOException {

            return mealService.weeklyMealGenerator();
        }

    }
