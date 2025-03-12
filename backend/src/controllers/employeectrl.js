//Method del CRUD

//Create un array de functions
const employeesControllers = {};
import employeesmdl from "../models/employeesmdl.js";

//*SELECT
employeesControllers.getEmployee = async (req, res) => {
   try {
      const employees = await employeesmdl.find();
      res.status(200).json(employees);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

//*INSERT
employeesControllers.postEmployee = async (req, res) => {
   const { name, description, price, stock } = req.body;
   const newEmploye = new employeesModel({ name, description, price, stock });
   await newEmploye.save();
   res.json({ message: "furuló" })

}

//*UPDATE
employeesControllers.putEmploye = async (req, res) => {
   const { name, description, price, stock } = req.body;
   try {
      const updatedEmployees = await employeesModel.findByIdAndUpdate(req.params.id, { name, description, price, stock }, { new: true });
      res.status(200).json({ message: "Employe updated successfully" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

//*DELETE
employeesControllers.deleteEmploye = async (req, res) => {
   try {
      await employeesModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Employe deleted successfully" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export default employeesControllers;