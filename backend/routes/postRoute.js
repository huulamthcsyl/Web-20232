import express from 'express';

import {
    createPost,
    getPostByUserId,
    getAllPost
} from '../controllers/postController.js';

const router = express.Router();

router.post('/createPost', createPost);
router.get('/getAllPost', getAllPost);
router.get('/getPostByUserId/:userId', getPostByUserId);

export default router;