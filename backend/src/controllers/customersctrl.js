//Method del CRUD

//Create un array de functions
const customersControllers = {};
import customersmdl from "../models/customersmdl.js";

//*SELECT
customersControllers.getCustomer = async (req, res) => {
   try {
      const customers = await customersmdl.find();
      res.status(200).json(customers);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

//*INSERT
customersControllers.postCustomer = async (req, res) => {
   const { name, description, price, stock } = req.body;
   const newEmploye = new customersModel({ name, description, price, stock });
   await newEmploye.save();
   res.json({ message: "furuló" })

}

//*UPDATE
customersControllers.putCustomer = async (req, res) => {
   const { name, description, price, stock } = req.body;
   try {
      const updatedCustomers = await customersModel.findByIdAndUpdate(req.params.id, { name, description, price, stock }, { new: true });
      res.status(200).json({ message: "Employe updated successfully" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

//*DELETE
customersControllers.deleteCustomer = async (req, res) => {
   try {
      await customersModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Employe deleted successfully" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export default customersControllers;