//import necessary modules
import cors from 'cors';
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
import faqRoutes from './src/routes/FaqRoutes.js';

import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

//Traemos el Json
const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve("./docs.json"), 'utf8')

)



//Create a new express app instance
const app = express();
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({
    //origin: "https://zgas20230205.vercel.app",
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
//middlewares
app.use(express.json());

//Para que acepte coockies en postman
app.use(cookieParser());

//Routes of the API2
app.use("/api/products", productsRoutes)
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
app.use("/api/faqs", faqRoutes);
//Define the port for the server
export default app;