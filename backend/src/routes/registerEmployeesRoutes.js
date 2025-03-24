import express from 'express';
import RegEmp from '../controllers/RegisterEmployeesCtrl.js';
const router = express.Router();

router.route("/").post(RegEmp.register)

export default router;