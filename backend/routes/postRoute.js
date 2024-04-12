import express from 'express';
import multer from 'multer';

import {
    createPost,
    getPostByUserId,
    getAllPost,
    getPostByPostId
} from '../controllers/postController.js';

const router = express.Router();
const upload = multer();

router.post('/createPost', upload.fields([{name: 'image'}, {name: 'video'}]), createPost);
router.get('/getAllPost', getAllPost);
router.get('/getPostByUserId/:userId', getPostByUserId);
router.get('/getPostByPostId/:postId', getPostByPostId);

export default router;