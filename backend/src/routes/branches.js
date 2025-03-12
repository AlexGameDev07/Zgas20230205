/**
 * This file manage the CRUD Methods and have the route (/api/branches)
 */

import express from 'express'
import branchesControllers from '../controllers/branchesctrl.js'
const router = express.Router()

router.route("/")
   .get(branchesControllers.getBranch)
   .post(branchesControllers.postBranch)

router.route("/:id")
   .put(branchesControllers.putBranch)
   .delete(branchesControllers.deleteBranch)

export default router;