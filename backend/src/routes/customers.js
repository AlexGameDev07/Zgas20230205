/**
 * This file manage the CRUD Methods and have the route (/api/customers)
 */

import express from 'express'
import customersControllers from '../controllers/customersctrl.js'
const router = express.Router()

router.route("/")
   .get(customersControllers.getCustomer)
   .post(customersControllers.postCustomer)

router.route("/:id")
   .put(customersControllers.putCustomer)
   .delete(customersControllers.deleteCustomer)

export default router;