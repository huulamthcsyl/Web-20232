import express from 'express';
import multer from 'multer';

import {
    sendMessage,
    getUnreadMessages,
    getConversationMessages,
    getUnreadConversations,
    markConversationAsRead
} from '../controllers/chatController.js';

const router = express.Router()
const upload = multer()

router.post('/sendMessage', upload.fields([
    { name: 'video' },
    { name: 'image' }
    ]), sendMessage);
router.get('/getUnreadMessages/:userId', upload.none(), getUnreadMessages);
router.get('/getConversationMessages/:userId/:friendId', upload.none(), getConversationMessages);
router.get('/getUnreadConversations/:userId', upload.none(), getUnreadConversations);
router.post('/markConversationAsRead', upload.none(), markConversationAsRead);
  
export default router;