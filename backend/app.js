//import necessary modules
import express from 'express';
import productsRoutes from '../backend/src/routes/products.js';
import branchesRoutes from '../backend/src/routes/branches.js';
import customersRoutes from '../backend/src/routes/customers.js';
import employeesRoutes from '../backend/src/routes/employees.js';
import reviewsRoutes from '../backend/src/routes/reviews.js';
//Create a new express app instance
const app = express();

//middlewares
app.use(express.json());

//Routes of the API
app.use("/api/products", productsRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/reviews", reviewsRoutes)

//Define the port for the server
export default app;