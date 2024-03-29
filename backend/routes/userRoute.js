import express from 'express';

import {
  register,
  login,
  logout,
  updateProfile
} from '../controllers/userController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/register', upload.none(), register);
router.post('/login', upload.none(), login);
router.post('/logout', upload.none(), logout);
router.post('/updateProfile/:idUser', upload.single('cover'), updateProfile);

export default router;