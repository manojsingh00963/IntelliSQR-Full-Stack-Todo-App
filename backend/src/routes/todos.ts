import express from 'express';
import { createTodo, listTodos, updateTodo, deleteTodo, toggleComplete } from '../controllers/todoController';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.use(protect);
router.get('/', listTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);
router.post('/:id/toggle', toggleComplete);

export default router;
