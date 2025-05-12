import blogModel from "../models/Blog.js";
import { v2 as cloudinary } from "cloudinary";

import { config } from "../config.js";

//1-configurar cloudinary
cloudinary.config({
    cloud_name: config.cloudinary.CLOUDINARY_NAME,
    api_key: config.cloudinary.CLOUDINARY_API_KEY,
    api_secret: config.cloudinary.CLOUDINARY_API_SECRET
});

const blogCtrl = {};

//select
blogCtrl.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los blogs" });
    }
}

//select by id
blogCtrl.getBlogById = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog no encontrado" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el blog" });
    }
}

//post
blogCtrl.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Faltan campos por llenar" });
        }
        let imageUrl = "";

        // Subir imagen a Cloudinary
        if (!req.file) {
            return res.status(400).json({ message: "Falta la imagen" });
        } else if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "public",
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                allowed_formats: ["jpg", "png", "jpeg"]
            });
            imageUrl = result.secure_url;
        }

        // Crear un nuevo blog
        const newBlog = new blogModel({
            title,
            content,
            image: imageUrl // Aquí se usa la variable correcta
        });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        console.error("Error al crear el blog:", error);
        res.status(500).json({ message: "Error al crear el blog" });
    }
};

export default blogCtrl;