const evaluationController = {}
import evaluationsMdl from '../models/evaluationsmdl.js'

//*GET
evaluationController.getEvaluations = async (req, res) => {
   try {
      const evaluations = await evaluationsMdl.find().populate("idEmployee");
      res.status(200).json(evaluations);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
}

//*POST
evaluationController.postEvaluations = async (req, res) => {
   const { comment, grade, role, idEmployee } = req.body;
   const newEvaluation = new evaluationsMdl({ comment, grade, role, idEmployee });
   await newEvaluation.save();
   res.json({ message: "furuló" })

}

//*PUT
evaluationController.putEvaluations = async (req, res) => {
   const { comment, grade, role, idEmployee } = req.body;
   try {
      const updatedEvaluations = await evaluationsMdl.findByIdAndUpdate(req.params.id, { comment, grade, role, idEmployee }, { new: true });
      res.status(200).json({ message: "Evaluation updated successfully" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

//*DELETE
evaluationController.deleteEvaluations = async (req, res) => {
   try {
      await evaluationsMdl.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Evaluation deleted successfully" });
   }
   catch (error) {
      res.status(400).json({ message: error.message });
   }
}

export default evaluationController;