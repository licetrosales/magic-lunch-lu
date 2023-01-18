package com.github.licetrosales.backend;

import com.cloudinary.utils.ObjectUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.cloudinary.*;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) throws IOException {

		SpringApplication.run(BackendApplication.class, args);

		Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
				"cloud_name", "debod1ejt",
				"api_key", "921594313129711",
				"api_secret", "tgekeQdyMT__vnQ8lFPBx3b3oZI"));
		File file = new File("my_image.png");
		Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());

	}

}
