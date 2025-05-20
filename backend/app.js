//import necessary modules
import express from 'express';
import cookieParser from 'cookie-parser';
import productsRoutes from '../backend/src/routes/products.js';
import branchesRoutes from '../backend/src/routes/branches.js';
import customersRoutes from '../backend/src/routes/customers.js';
import employeesRoutes from '../backend/src/routes/employees.js';
import reviewsRoutes from '../backend/src/routes/reviews.js';
import evaluationsRoutes from '../backend/src/routes/evaluations.js';
import registerEmployeesRoutes from './src/routes/registerEmployeesRoutes.js';
import loginRoutes from './src/routes/loginRoutes.js';
import logoutRoutes from './src/routes/logoutRoutes.js';
import registerCustomersRoutes from './src/routes/registerCustomersRoutes.js';
import passwordRecoveryRoutes from './src/routes/passRecoverRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import { validateAuthToken } from './src/middlewares/validateAuthTokenMdw.js';
//Create a new express app instance
const app = express();

//middlewares
app.use(express.json());

//Para que acepte coockies en postman
app.use(cookieParser());

//Routes of the API
app.use("/api/products", validateAuthToken(["employee", "admin"]), productsRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/reviews", validateAuthToken(["employee"]), reviewsRoutes)
app.use("/api/evaluations", evaluationsRoutes)
app.use("/api/registerEmployees", registerEmployeesRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)

app.use("/api/registerCustomers", registerCustomersRoutes)
app.use("/api/passwordRecovery", passwordRecoveryRoutes)

app.use("/api/blog", blogRoutes)

//Define the port for the server
export default app;