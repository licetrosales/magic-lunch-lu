package com.github.licetrosales.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.repo.RecipeRepo;
import org.junit.jupiter.api.Disabled;
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

class RecipeControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    RecipeRepo recipeRepo;
    @Autowired
    ObjectMapper objectMapper;


    @Test

    @DirtiesContext

    void getAllRecipes_shouldReturnEmptyList_whenGalleryisEmpty() throws Exception {
        mockMvc.perform(get("/api/users/userId/recipes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));


    }



    @Test

    @DirtiesContext

    void addRecipe_shouldReturnRecipeSendeWithPost_whenPostRequestIsSuccessful() throws Exception {
        MvcResult response = mockMvc.perform(post("/api/users/userId/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                           "name": "Salat 11",
                                           "mealType": "LUNCH",
                                           "source": "GU",
                                           "image": "BigMacSalat.jpg",
                                           "ingredients": [{
                                             "id": "1",
                                             "name": "Brot",
                                             "quantity": "1",
                                             "unit": "KLEIN",
                                             "productCategory": "BREAD_BAKERY",
                                             "isInShoppingList": true
                                           }],
                                           "prepTime": "30 min.",
                                           "preparation": "Anweisungen eintragen",
                                           "portions": 2,
                                           "favorite": false,
                                           "dishTypeCategory": "FISH",
                                           "recipeCategory": "LOW_CARB",
                                           "menuCategory": "MAIN_COURSE",
                                           "garnish": "Salat"
                                         }
                                        """
                        ))
                .andExpect(status().isOk())
                .andReturn();
        String content = response.getResponse().getContentAsString();
        Recipe result = objectMapper.readValue(content, Recipe.class);
        Recipe expected = new Recipe(result.id(), result.name(), result.mealType(), result.source(), result.image(), result.ingredients(), result.prepTime(), result.preparation(), result.portions(), result.favorite(), result.dishTypeCategory(), result.recipeCategory(), result.menuCategory(), result.garnish());
        assertEquals(expected, result);
    }


}