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
   const { name, address, telephone, schedule } = req.body;
   const newBranch = new branchesmdl({ name, address, telephone, schedule });
   await newBranch.save();
   res.json({ message: "Sucursal creada correctamente" });
}

//*UPDATE
branchesControllers.putBranch = async (req, res) => {
   const { name, address, telephone, schedule } = req.body;
   try {
      const updatedBranch = await branchesmdl.findByIdAndUpdate(
         req.params.id,
         { name, address, telephone, schedule },
         { new: true }
      );
      res.status(200).json({ message: "Sucursal actualizada correctamente" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

//*DELETE
branchesControllers.deleteBranch = async (req, res) => {
   try {
      await branchesmdl.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Employe deleted successfully" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export default branchesControllers;