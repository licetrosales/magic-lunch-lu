package com.github.licetrosales.backend.repo;

import com.github.licetrosales.backend.model.WeekMealPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeekMealPlanRepo extends MongoRepository<WeekMealPlan, String> {

}
