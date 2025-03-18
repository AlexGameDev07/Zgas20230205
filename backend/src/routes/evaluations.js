import express from 'express';
const router = express.Router()

import evaluationsCtrl from "../controllers/evaluationsctrl.js";

router.route("/")
   .get(evaluationsCtrl.getEvaluations)
   .post(evaluationsCtrl.postEvaluations)

router.route("/:id")
   .put(evaluationsCtrl.putEvaluations)
   .delete(evaluationsCtrl.deleteEvaluations)

export default router;