import express from 'express';
import { 
  signup, 
  login, 
  forgotPassword, 
  resetPassword 
} from '../controllers/authController';

const router = express.Router();

// User Signup
router.post('/signup', signup);

// User Login
router.post('/login', login);

// Forgot Password (send reset link)
router.post('/forgot-password', forgotPassword);

// Reset Password (verify token + update password)
router.post('/reset-password', resetPassword);

export default router;

