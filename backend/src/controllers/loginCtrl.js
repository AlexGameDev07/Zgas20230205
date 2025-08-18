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
                return res.status(404).json({ password: password, email: email, message: "Usuario no encontrado" });
            }

            //Coso para ver si el user no está bloqueado
            if(userType !== "admin"){
                if(userFound.lockTime > Date.now()){
                    const timeLeft = Math.ceil( (userFound.lockTime - Date.now()) / 600000 )
                    return res.status(403).json({ message: `Cuenta bloqueada. Intente de nuevo en ${timeLeft} minutos` });
                }
            }
            if (userType !== "admin") {
                const isMatch = await bcrypt.compare(password, userFound.password);
                if (!isMatch) {
                    userFound.loginAttempts += 1;

                    if (userFound.loginAttempts > 5){
                        userFound.lockTime = Date.now() + 30 * 60000;
                        await userFound.save();

                        return res.status(403).json({ message: "Cuenta bloqueada por demasiados intentos fallidos. Intente de nuevo en 30 minutos" });
                    }

                    await userFound.save();
                    return res.status(400).json({ message: "Invalid credentials" });
                }

                userFound.loginAttempts = 0; //Resetea los intentos de login
                userFound.lockTime = null; 
                await userFound.save();
            }

            //* create the token
            try {
                const token = JsonWebToken.sign(
                    { id: userFound._id, userType },
                    config.jwt.JWT_SECRET,
                    { EXPIRES_IN: config.jwt.EXPIRES_IN }
                );
                res.cookie("authToken", token,{
                    httpOnly: true,
                    secure: true,
                    sameSite: "none" // Previene el envío de cookies en solicitudes cross-site
                });
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