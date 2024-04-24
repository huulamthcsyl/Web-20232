import express from 'express';

import {
  register,
  login,
  logout,
  updateProfile,
  findUser,
  createFriendRequest,
  getUserProfileById,
  acceptFriendRequest,
  getFriendList,
  sendMessage,
  getAllUser
} from '../controllers/userController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);
router.post('/logout', upload.none(), logout);
router.get('/getProfile/:idUser', upload.none(), getUserProfileById)
router.post('/updateProfile/:idUser', upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'avatar', maxCount: 1 }
  ]), updateProfile);
router.get('/getAllUser', upload.none(), getAllUser);
router.get('/findUser', upload.none(), findUser);
router.post('/createFriendRequest', upload.none(), createFriendRequest);
router.post('/acceptFriendRequest', upload.none(), acceptFriendRequest);
router.get('/getFriendList/:userId', upload.none(), getFriendList);
router.post('/sendMessage', upload.fields([
  { name: 'video' },
  { name: 'image' }
  ]), sendMessage);

export default router;