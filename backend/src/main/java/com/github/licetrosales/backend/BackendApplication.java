package com.github.licetrosales.backend;

import com.cloudinary.utils.ObjectUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import java.io.File;
import java.io.IOException;
import java.util.Map;
import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.Map;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) throws IOException {

		SpringApplication.run(BackendApplication.class, args);

		/*Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
				"cloud_name", "debod1ejt",
				"api_key", "921594313129711",
				"api_secret", "tgekeQdyMT__vnQ8lFPBx3b3oZI"));
		File file = new File("my_image.png");
		Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
		//System.out.println(uploadResult.get("url"));*/
		Dotenv dotenv = Dotenv.load();
		Cloudinary cloudinary = new Cloudinary(dotenv.get("CLOUDINARY_URL"));
		cloudinary.config.secure = true;
		System.out.println(cloudinary.config.cloudName);

		Map params1 = ObjectUtils.asMap(
				"use_filename", true,
				"unique_filename", false,
				"overwrite", true
		);

		System.out.println(
				cloudinary.uploader().upload("https://cloudinary-devs.github.io/cld-docs-assets/assets/images/coffee_cup.jpg", params1));
	}

}
