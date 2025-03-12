/**
 * This file manage the CRUD Methods and have the route (/api/employees)
 */

import express from 'express'
import employeesControllers from '../controllers/employeectrl.js'
const router = express.Router()

router.route("/")
   .get(employeesControllers.getEmployee)
   .post(employeesControllers.postEmployee)

router.route("/:id")
   .put(employeesControllers.putEmploye)
   .delete(employeesControllers.deleteEmploye)

export default router;