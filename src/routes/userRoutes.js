import express from 'express';
import { getUsers, getUserProfile, updateProfile, uploadAvatar } from '../controllers/userController.js';
import { verifyToken, isOwner } from '../middleware/auth.js';
import { validateProfileUpdate } from '../middleware/validation.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', verifyToken, getUsers);

router.get('/:id', verifyToken, getUserProfile);

router.put('/:id', verifyToken, isOwner, validateProfileUpdate, updateProfile);

router.post('/avatar', verifyToken, upload.single('file'), uploadAvatar);

export default router;
