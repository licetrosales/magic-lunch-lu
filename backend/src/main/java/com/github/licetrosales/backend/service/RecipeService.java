package com.github.licetrosales.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.model.RecipeDTO;
import com.github.licetrosales.backend.repo.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.cloudinary.utils.ObjectUtils;
import com.cloudinary.Cloudinary;
import org.springframework.web.multipart.MultipartFile;


import java.util.Map;

@Service
public class RecipeService {
    private final RecipeRepo recipeRepo;
    private final IdRecipeService idRecipeService;


    @Autowired
    public RecipeService(RecipeRepo recipeRepo, IdRecipeService idRecipeService) {
        this.recipeRepo = recipeRepo;
        this.idRecipeService = idRecipeService;
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepo.findAll();
    }


    public Recipe getJson(String recipeAsString, MultipartFile file) {
       Recipe recipeJson = new Recipe();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            recipeJson = objectMapper.readValue(recipe, Recipe.class);
        } catch (IOException err) {
            System.out.printf("Error", err.toString());
        }

        Recipe newRecipeWithId = new Recipe(
                idRecipeService.generateId(),
                recipe.name(),
                recipe.mealType(),
                recipe.source(),
                recipe.image(),
                recipe.ingredients(),
                recipe.prepTime(),
                recipe.preparation(),
                recipe.portions(),
                recipe.favorite(),
                recipe.dishTypeCategory(),
                recipe.recipeCategory(),
                recipe.menuCategory(),
                recipe.garnish()

        );


        /*Cloudinary cloudinary = new Cloudinary();
        cloudinary.upload("my_image.png", ObjectUtils.emptyMap());

        File file = new File("my_image.png");
        Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());*/


        return recipeRepo.save(newRecipeWithId);
    }



    public Recipe findById(String id) {
        Optional<Recipe> recipe = recipeRepo.findById(id);
        if (recipe.isPresent()) {
            return recipe.get();
        }
        throw new IllegalArgumentException("Recipe Id not found!");
    }

    public void delete(String id) {
        Recipe recipe = findById(id);
        recipeRepo.delete(recipe);
    }

    public Recipe updateRecipe(String id, RecipeDTO recipeToUpdateWithoutId) {
        Recipe recipeToUpdateWithId = new Recipe(id,
                recipeToUpdateWithoutId.name(),
                recipeToUpdateWithoutId.mealType(),
                recipeToUpdateWithoutId.source(),
                recipeToUpdateWithoutId.image(),
                recipeToUpdateWithoutId.ingredients(),
                recipeToUpdateWithoutId.prepTime(),
                recipeToUpdateWithoutId.preparation(),
                recipeToUpdateWithoutId.portions(),
                recipeToUpdateWithoutId.favorite(),
                recipeToUpdateWithoutId.dishTypeCategory(),
                recipeToUpdateWithoutId.recipeCategory(),
                recipeToUpdateWithoutId.menuCategory(),
                recipeToUpdateWithoutId.garnish());

        if (!recipeRepo.existsById(recipeToUpdateWithId.id())) {
            throw new NoSuchElementException("There is no element with the requested ID");
        } else {
            recipeRepo.save(recipeToUpdateWithId);
        }
        return recipeToUpdateWithId;
    }


}