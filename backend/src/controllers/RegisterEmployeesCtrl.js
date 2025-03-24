import EmployeeMdl from "../models/employeesmdl.js";
import bcryptjs from "bcryptjs";
import { config } from "../config.js";

const registerEmployeesCtrl = {};

registerEmployeesCtrl.register = async (req, res) => {
    const { password, email, ...employeeData } = req.body;

    try {
        //Verify if the employee is already registered
        const existingEmp = await EmployeeMdl.findOne({ email });
        if (existingEmp) {
            return res.status(400).json({ msg: "The employee already exists" });
        }

        // encrypt the password
        const salt = await bcryptjs.genSalt(10); // generate dynamic salt
        const hashPassword = await bcryptjs.hash(password, salt);

        // save the employee
        const newEmployee = new EmployeeMdl({
            ...employeeData, // Propagate the rest of the data
            email, // make sure the email is include
            password: hashPassword, // save the hashed password
        });

        await newEmployee.save();

        return res.status(201).json({ msg: "Employee registered successfully" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export default registerEmployeesCtrl;