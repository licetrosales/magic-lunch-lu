package com.github.licetrosales.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.licetrosales.backend.model.*;
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

import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import com.fasterxml.jackson.core.JsonParser.Feature;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
        MockMultipartFile recipe_jsonFile = new MockMultipartFile("recipeJson", "", "application/json", "{\"json\": \"someValue\"}".getBytes());
        MockMultipartFile file
                = new MockMultipartFile(
                "file",
                "image.png",
                MediaType.IMAGE_JPEG_VALUE,
                "xxx".getBytes()
        );
           /*byte[] image = IOUtils.toByteArray(getClass().getClassLoader().getResourceAsStream("background.png"));
        MockMultipartFile file = new MockMultipartFile("file", "background.png", MediaType.IMAGE_JPEG_VALUE, image);
*/
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/users/userId/recipes")
                        .file(recipe_jsonFile)
                        .file(file)
                        )
                .andExpect(status().isOk());
    }


    @DirtiesContext
    @Test
    void updateRecipe_shouldUpdateRecipeIfIdExists_whenUpdateRequestIsSuccessfull() throws Exception {

    }

}