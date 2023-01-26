package com.github.licetrosales.backend.configuration;

import org.springframework.web.bind.annotation.RequestMapping;

public class SinglePageAppController {
    @RequestMapping(value = {
            "/",
            "/cat",
            // add every route you have in your react app here
    })
    public String index() {
        return "index.html";
    }
}
