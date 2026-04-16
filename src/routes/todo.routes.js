import express from 'express';
import { createTodo, getMyTodos } from '../controller/todo.controller.js';

const router = express.Router();

router.post('/add', createTodo);
router.get('/list', getMyTodos);

export default router;