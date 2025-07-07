    //imports
    import bcrypt from "bcryptjs";
    import JsonWebToken from "jsonwebtoken";
    import { config } from "../config.js";
    import customersmdl from "../models/customersmdl.js";
    import employeesmdl from "../models/employeesmdl.js";

    const loginCtrl = {}
    
    loginCtrl.login = async (req, res) => {
        const { email, password } = req.body;
        try {
            let userFound;
            let userType;


            //1-Admin
            if (email === config.admin.EMAIL && password === config.admin.PASSWORD) {
                userFound = { _id: "admin" };
                userType = "admin";


            }
            //2-Employee
            else {
                userFound = await employeesmdl.findOne({ email });
                userType = "employee";

                //3-Customer
                if (!userFound) {
                    userFound = await customersmdl.findOne({ email });
                    userType = "customer";
                }

            }
            if (!userFound) {
                return res.status(404).json({ password: password, email: email });
            }

            if (userType !== "admin") {
                const isMatch = await bcrypt.compare(password, userFound.password);
                if (!isMatch) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }
            }

            //* create the token
            try {
                const token = JsonWebToken.sign(
                    { id: userFound._id, userType },
                    config.jwt.JWT_SECRET,
                    { expiresIn: config.jwt.expiresIn }
                );
                res.cookie("authToken", token);
                return res.status(201).json({ msg: "Login successful" });
            } catch (err) {
                return res.status(500).json({ msg: "Error generating token", error: err.message });
            }

        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    export default loginCtrl;