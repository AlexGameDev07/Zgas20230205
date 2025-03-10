/**
 * This file manage the CRUD Methods and have the route (/api/products)
 */

import express from 'express'
import productsControllers from '../controllers/productsControllers.js'
const router = express.Router()

router.route("/")
.get(productsControllers.getProducts)
.post(productsControllers.postProduct)

router.route("/:id")
.put(productsControllers.putProduct)
.delete(productsControllers.deleteProduct)

export default router;