package com.github.licetrosales.backend.repo;

import com.github.licetrosales.backend.model.Recipe;
import com.github.licetrosales.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
@Repository
public interface RecipeRepo extends MongoRepository<User,String> {

}
