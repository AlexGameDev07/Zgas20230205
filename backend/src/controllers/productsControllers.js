//Metodos del CRUD

//Crear un array de funciones
const productsControllers = {};
import productsModel from "../models/Products.js";

//SELECT
productsControllers.getProducts = async (req, res) => {
    try {
        const products = await productsModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//INSERT
productsControllers.postProduct = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const newProduct = new productsModel({name, description, price, stock});
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//UPDATE
productsControllers.updateProduct = async (req, res) => {
    try {
        await productsModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: "Product updated successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//DELETE
productsControllers.deleteProduct = async (req, res) => {
    try {
        await productsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}