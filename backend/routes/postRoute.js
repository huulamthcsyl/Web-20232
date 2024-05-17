import express from 'express'
import multer from 'multer'

import {
    createPost,
    getPostByUserId,
    getAllPost,
    getPostByPostId,
    updatePost,
    deletePost,
    sharePost,
    likePost,
    removeLikePost,
    getCommentByPostId,
    getNotificationByUserId
} from '../controllers/postController.js'

const router = express.Router()
const upload = multer()

router.post('/createPost', upload.fields([{name: 'image'}, {name: 'video'}]), createPost)
router.get('/getAllPost', getAllPost)
router.get('/getPostByUserId/:userId', getPostByUserId)
router.get('/getPostByPostId/:postId', getPostByPostId)
router.post('/updatePost/:postId', updatePost)
router.post('/deletePost/:postId', deletePost)
router.get('/sharePost/:postId', sharePost)
router.get('/getCommentByPostId/:postId', getCommentByPostId)
router.post('/likePost/:userId/:postId', likePost)
router.post('/removeLikePost/:userId/:postId', removeLikePost)
router.get('/getNotificationByUserId/:userId', getNotificationByUserId)

export default router