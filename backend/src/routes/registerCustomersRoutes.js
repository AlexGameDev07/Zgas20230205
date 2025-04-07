import express from 'express';
import registerCustomersCtrl from '../controllers/registerCustomersCtrl.js';
const router = express.Router();
router.route('/').post(registerCustomersCtrl.register);
router.route('/verifyCodeEmail').post(registerCustomersCtrl.verifyCodeEmail);
export default router;