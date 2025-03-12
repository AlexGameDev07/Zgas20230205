//Method del CRUD

//Create un array de functions
const branchesControllers = {};
import branchesmdl from "../models/branchesmdl.js";

//*SELECT
branchesControllers.getBranch = async (req, res) => {
   try {
      const branches = await branchesmdl.find();
      res.status(200).json(branches);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

//*INSERT
branchesControllers.postBranch = async (req, res) => {
   const { name, description, price, stock } = req.body;
   const newEmploye = new branchesModel({ name, description, price, stock });
   await newEmploye.save();
   res.json({ message: "furuló" })

}

//*UPDATE
branchesControllers.putBranch = async (req, res) => {
   const { name, description, price, stock } = req.body;
   try {
      const updatedBranches = await branchesModel.findByIdAndUpdate(req.params.id, { name, description, price, stock }, { new: true });
      res.status(200).json({ message: "Employe updated successfully" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

//*DELETE
branchesControllers.deleteBranch = async (req, res) => {
   try {
      await branchesModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Employe deleted successfully" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export default branchesControllers;