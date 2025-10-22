import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegister } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', login);

export default router;
