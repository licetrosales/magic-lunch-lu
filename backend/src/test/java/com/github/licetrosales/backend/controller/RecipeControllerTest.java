package com.github.licetrosales.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.repo.RecipeRepo;
import org.apache.commons.compress.utils.IOUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
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
    void getAllRecipes_shouldReturnListOfRecipes_whenGalleryisNotEmpty() throws Exception {
        mockMvc.perform(get("/api/users/userId/recipes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));


    }
    @Autowired
    private WebApplicationContext webApplicationContext;
    @Test
    @DirtiesContext
    void addRecipe_shouldReturnRecipeSendeWithPost_whenPostRequestIsSuccessful() throws Exception {
        byte[] image = IOUtils.toByteArray(getClass().getClassLoader().getResourceAsStream("/background.png"));

        MockMultipartFile file = new MockMultipartFile("file", "/background.png", MediaType.IMAGE_JPEG_VALUE, image);
        mockMvc.perform(multipart("/api/users/userId/recipes").file(file))
                .andExpect(status().isOk());
    }


    @Test
    @DirtiesContext
    void deleteRecipe_shouldDeleteRecipeIfIdExists_whenDeleteRequestIsSuccessful() throws Exception {
        String saveResult = mockMvc.perform(
                        post("/api/users/userId/recipes")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                                                                     "name": "Salat 11",
                                                                                     "mealType": "LUNCH",
                                                                                     "source": "GU",
                                                                                     "image": "BigMacSalat.jpg",
                                                                                     "ingredients": [{
                                                                                       "id": "1",
                                                                                       "name": "Brot",
                                                                                       "quantity": "1",
                                                                                       "unit": "SMALL",
                                                                                       "isInShoppingList": false,
                                                                                       "productCategory": "BREAD_BAKERY"
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
                                        """)
                )
                .andReturn()
                .getResponse()
                .getContentAsString();

        Recipe saveResultRecipe = objectMapper.readValue(saveResult, Recipe.class);
        String id = saveResultRecipe.id();

        mockMvc.perform(delete("/api/users/userId/recipes/" + id))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/users/userId/recipes"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @Test
    void updateRecipe_shouldUpdateRecipeIfIdExists_whenUpdateRequestIsSuccessfull() throws Exception {
        String saveResult = mockMvc.perform(
                post("/api/users/userId/recipes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                   {
                                       "name": "Salat 11",
                                       "mealType": "LUNCH",
                                       "source": "GU",
                                       "image": "BigMacSalat.jpg",
                                       "ingredients": [{
                                             "id": "1",
                                             "name": "Brot",
                                             "quantity": "1",
                                             "unit": "SMALL",
                                             "isInShoppingList": false,
                                             "productCategory": "BREAD_BAKERY"
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
                                """)

        )
        .andExpect(status().isOk())
                .andExpect(content().json("""
{
                                       "name": "Salat 11",
                                       "mealType": "LUNCH",
                                       "source": "GU",
                                       "image": "BigMacSalat.jpg",
                                       "ingredients": [{
                                             "id": "1",
                                             "name": "Brot",
                                             "quantity": "1",
                                             "unit": "SMALL",
                                             "isInShoppingList": false,
                                             "productCategory": "BREAD_BAKERY"
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

"""))
                .andReturn()
                .getResponse()
                .getContentAsString();
        Recipe saveResultRecipe = objectMapper.readValue(saveResult, Recipe.class);
        String id = saveResultRecipe.id();

        mockMvc.perform(
                put("/api/users/userId/recipes/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                   {
                                       "id": "<ID>",
                                        "name": "Salat 22",
                                       "mealType": "LUNCH",
                                       "source": "Fitness World",
                                       "image": "BigMacSalat.jpg",
                                       "ingredients": [{
                                             "id": "1",
                                             "name": "Brot",
                                             "quantity": "1",
                                             "unit": "SMALL",
                                             "isInShoppingList": false,
                                             "productCategory": "BREAD_BAKERY"
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

""".replaceFirst("<ID>", id))
        )
                .andExpect(status().isOk())
                .andExpect(content().json("""
 {
                                       "id": "<ID>",
                                        "name": "Salat 22",
                                       "mealType": "LUNCH",
                                       "source": "Fitness World",
                                       "image": "BigMacSalat.jpg",
                                       "ingredients": [{
                                             "id": "1",
                                             "name": "Brot",
                                             "quantity": "1",
                                             "unit": "SMALL",
                                             "isInShoppingList": false,
                                             "productCategory": "BREAD_BAKERY"
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

""".replaceFirst("<ID>", id)));
    }
}