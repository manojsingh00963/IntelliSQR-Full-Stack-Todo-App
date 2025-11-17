import { Request, Response } from 'express';
import User from '../models/User';
import { signToken } from '../utils/jwt';
import crypto from 'crypto';

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });
  const user = await User.create({ email, password, name });
  const token = signToken({ id: user._id });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = signToken({ id: user._id });
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ message: 'If that email exists, a reset link was sent' });
  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + (Number(process.env.RESET_TOKEN_EXPIRES_MIN || '30') * 60 * 1000));
  await user.save();
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
  res.json({ message: 'Reset link sent' });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, token, newPassword } = req.body;
  const user = await User.findOne({ email, resetPasswordToken: token, resetPasswordExpires: { $gt: new Date() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
  user.password = newPassword;
  user.resetPasswordToken = undefined as any;
  user.resetPasswordExpires = undefined as any;
  await user.save();
  res.json({ message: 'Password reset successful' });
};
