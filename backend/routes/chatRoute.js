import express from 'express';
import multer from 'multer';

import {
    sendMessage,
    getUnreadMessages
} from '../controllers/chatController.js';

const router = express.Router()
const upload = multer()

router.post('/sendMessage', upload.fields([
    { name: 'video' },
    { name: 'image' }
    ]), sendMessage);
router.get('/getUnreadMessages/:userId', upload.none(), getUnreadMessages);
  
export default router;