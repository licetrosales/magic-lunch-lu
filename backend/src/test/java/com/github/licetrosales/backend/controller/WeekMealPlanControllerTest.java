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
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

    @Test
    @DirtiesContext
    void addWeekMealPlan__shouldReturnWeekMealPlanSentWithPost_whenPostRequestIsSuccessful() throws Exception {

        MvcResult response = mockMvc.perform(post("/api/users/userId/mealplans")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                    {
                                      "id": "Today",
                                      "weekMealPlan": [{"id": "1",
                                      "date": "date",
                                      "mealType": "LUNCH",                                                              
                                      "recipe":{}                                                             
                                    }]
                                    }
                                """
                        ))
                .andExpect(status().isOk())
                .andReturn();
        String content = response.getResponse().getContentAsString();
        WeekMealPlan result = objectMapper.readValue(content, WeekMealPlan.class);
        WeekMealPlan expected = new WeekMealPlan(result.id(), result.weekMealPlan());
        assertEquals(expected, result);
    }
}







