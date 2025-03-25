//import necessary modules
import express from 'express';
import productsRoutes from '../backend/src/routes/products.js';
import branchesRoutes from '../backend/src/routes/branches.js';
import customersRoutes from '../backend/src/routes/customers.js';
import employeesRoutes from '../backend/src/routes/employees.js';
import reviewsRoutes from '../backend/src/routes/reviews.js';
import evaluationsRoutes from '../backend/src/routes/evaluations.js';
import registerEmployeesRoutes from './src/routes/registerEmployeesRoutes.js';
import loginRoutes from './src/routes/loginRoutes.js';
import logoutRoutes from './src/routes/logoutRoutes.js';
import cookieParser from 'cookie-parser';
//Create a new express app instance
const app = express();

//middlewares
app.use(express.json());

//Para que acepte coockies en postman
app.use(cookieParser());

//Routes of the API
app.use("/api/products", productsRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/reviews", reviewsRoutes)
app.use("/api/evaluations", evaluationsRoutes)
app.use("/api/registerEmployees", registerEmployeesRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)

//Define the port for the server
export default app;