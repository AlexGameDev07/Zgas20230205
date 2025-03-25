import express from 'express';

import logoutCtrl from '../controllers/logoutCtrl.js';

const router = express.Router();

router.route('/').post(logoutCtrl.logout);

export default router;