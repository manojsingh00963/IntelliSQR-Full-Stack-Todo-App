import { Request, Response } from 'express';
import Todo from '../models/Todo';
import { AuthRequest } from '../middlewares/auth';

export const createTodo = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ user: req.user._id, title, description });
  res.json(todo);
};

export const listTodos = async (req: AuthRequest, res: Response) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(todos);
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const todo = await Todo.findOneAndUpdate({ _id: id, user: req.user._id }, updates, { new: true });
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json({ message: 'Deleted' });
};

export const toggleComplete = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findOne({ _id: id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};
