//import necessary modules
import express from 'express';
import productsRoutes from '../backend/src/routes/products.js';
//Create a new express app instance
const app = express();

//middlewares
app.use(express.json());

//Routes of the API
app.use("/api/products", productsRoutes)

//Define the port for the server
export default app;