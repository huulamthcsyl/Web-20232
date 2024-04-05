import express from 'express';

import {
    createPost,
    getPost
} from '../controllers/postController.js';

const router = express.Router();

router.post('/createPost', createPost);
router.get('/getPost', getPost);
router.get('/getPost/:userId', getPost);

export default router;