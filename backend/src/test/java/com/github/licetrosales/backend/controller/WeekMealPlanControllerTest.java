package com.github.licetrosales.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.github.licetrosales.backend.model.WeekMealPlan;
import com.github.licetrosales.backend.repo.WeekMealPlanRepo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@AutoConfigureMockMvc
@SpringBootTest
class WeekMealPlanControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    WeekMealPlanRepo weekMealPlanRepo;
    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void getAllWeekMealPlans_shouldReturnEmptyList_whenWeekMealPlanGalleryisEmpty() throws Exception {
        mockMvc.perform(get("/api/users/userId/mealplans"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                         []
                        """));
    }

    @Test
    @DirtiesContext
    void getAllWeekMealPlans_shouldReturnListOfRecipes_whenWeekMealPlanGalleryisNotEmpty() throws Exception {
        mockMvc.perform(get("/api/users/userId/recipes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }
    @DirtiesContext
    @Test
    void deleteWeekMEalPlan_expectSuccessfulDelete() throws Exception {
        String saveResult = mockMvc.perform(
                        post("/api/users/userId/mealplans")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"id":"123",
                                        "weekMealPlan":[]}
                                        """)
                )
                .andReturn()
                .getResponse()
                .getContentAsString();

        WeekMealPlan saveResultTodo = objectMapper.readValue(saveResult, WeekMealPlan.class);
        String id = saveResultTodo.id();

        mockMvc.perform(delete("/api/users/userId/mealplans/" + id))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/users/userId/mealplans/"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }
}








