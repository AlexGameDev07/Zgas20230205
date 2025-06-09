import express from 'express';
import faqCtrl from '../controllers/faqCtrl.js';

const router = express.Router();

router.route('/')
    .get(faqCtrl.getAllFaqs)
    .post(faqCtrl.createFaq);

router.route('/:id')
    .put(faqCtrl.updateFaq)
    .delete(faqCtrl.deleteFaq);

export default router;