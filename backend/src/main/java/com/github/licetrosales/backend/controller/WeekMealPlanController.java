package com.github.licetrosales.backend.controller;

import com.github.licetrosales.backend.model.WeekMealPlan;
import com.github.licetrosales.backend.model.WeekMealPlanDTO;
import com.github.licetrosales.backend.service.WeekMealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/userId")
public class WeekMealPlanController {

    private final WeekMealPlanService weekMealPlanService;

    @Autowired
    public WeekMealPlanController(WeekMealPlanService weekMealPlanService) {
        this.weekMealPlanService = weekMealPlanService;
    }

    @GetMapping("/mealplans")
    List<WeekMealPlan> getAllWeekMealPlans() {

        return weekMealPlanService.getAllWeekMealPlans();
    }

    @PostMapping("/mealplans")
    public WeekMealPlan addWeekMealPlan(@RequestBody WeekMealPlanDTO weekMealPlan) {
        return weekMealPlanService.addWeekMealPlan(weekMealPlan);
    }
    @DeleteMapping("/mealplans/{id}")
    void deleteWeekMealPlan(@PathVariable String id) {
        weekMealPlanService.deleteWeekMealPlan(id);
    }
}
