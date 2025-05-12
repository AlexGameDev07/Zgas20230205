import express from 'express';
import blogCtrl from '../controllers/blogCtrl.js';
import multer from 'multer';
const router = express.Router();

//configurar multer, carpeta local donde se guardan las imagenes
const upload = multer({dest: 'publlic/'});
router.route('/').get(blogCtrl.getAllBlogs).post(upload.single("image"), blogCtrl.createBlog);
router.route('/:id').get(blogCtrl.getBlogById)

export default router;