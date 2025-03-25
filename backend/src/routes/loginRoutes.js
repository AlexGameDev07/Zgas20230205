import express from 'express';

import loginCtrl from '../controllers/loginCtrl.js';

const router = express.Router();

router.route('/').post(loginCtrl.login);

export default router;