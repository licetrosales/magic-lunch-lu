package com.github.licetrosales.backend.repo;

import com.github.licetrosales.backend.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepo extends MongoRepository<Recipe,String> {

}
