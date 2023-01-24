package com.github.licetrosales.backend.model;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public class CloudinaryUrl {
    public String urlGenerator(MultipartFile file) throws IOException {
        String imageUrl;

    Cloudinary cloudinary = new Cloudinary();
    Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
    return imageUrl = uploadResult.get("url").toString();
    }
}
