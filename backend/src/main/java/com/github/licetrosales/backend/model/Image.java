package com.github.licetrosales.backend.model;

import org.springframework.data.annotation.Id;



public record Image (  @Id
                       String id,
                       String name,
                       String url,
                       String size) {

}


