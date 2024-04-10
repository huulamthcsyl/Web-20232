import express from 'express';

import {
  register,
  login,
  logout,
  updateProfile,
  findUser,
  createFriendRequest,
  getUserProfileById
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
router.get('/findUser', upload.none(), findUser);
router.post('/createFriendRequest', upload.none(), createFriendRequest);

export default router;