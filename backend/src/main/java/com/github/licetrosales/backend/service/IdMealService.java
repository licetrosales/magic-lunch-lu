package com.github.licetrosales.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;
@Service
public class IdMealService {
    public String generateId(){
            return UUID.randomUUID().toString();
        }
}
