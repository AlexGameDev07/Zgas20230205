const reviewCtrl = {};
import reviewsmdl from "../models/reviewsmdl.js";

//GET
reviewCtrl.getReviews = async (req, res) => {
   //Esta cosa sirve para hacer el inner join
   const reviews = await reviewsmdl.find().populate("idClient");
   res.json(reviews);
}
//POST
reviewCtrl.postReviews = async (req, res) => {
   const { idClient, comment, rating } = req.body;
   const newReview = new reviewsmdl({ idClient, comment, rating });
   await newReview.save();
   res.json({ message: "Review guardado" });
}
//PUT
reviewCtrl.putReview = async (req, res) => {
   const { id, comment, rating } = req.body;
   const review = await reviewsmdl.findByIdAndUpdate(id, { comment, rating }, { new: true });
   res.json({ message: "Review actualizado" });
   res.json(review)
}

//DELETE
reviewCtrl.deleteReview = async (req, res) => {
   await reviewsmdl.findByIdAndDelete(req.params.id);
   res.json({ message: "Review eliminado" });
}

export default reviewCtrl;