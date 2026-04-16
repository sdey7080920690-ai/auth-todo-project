import fs from 'fs/promises';
import path from 'path';

const todoPath = path.join(process.cwd(), 'src', 'database', 'todo.json');

export const createTodo = async (req, res) => {
    try {
        const { title, userId } = req.body; // userId se pata chalega todo kiska hai
        if (!title || !userId) {
            return res.status(400).json({ success: false, message: "Title and userId are required" });
        }

        const data = await fs.readFile(todoPath, 'utf-8').catch(() => '[]');
        const todos = JSON.parse(data || '[]');

        const newTodo = {
            id: Date.now().toString(),
            title,
            userId,
            completed: false
        };

        todos.push(newTodo);
        await fs.writeFile(todoPath, JSON.stringify(todos, null, 2));

        res.status(201).json({ success: true, todo: newTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getMyTodos = async (req, res) => {
    try {
        const { userId } = req.query; // URL se userId lenge
        const data = await fs.readFile(todoPath, 'utf-8');
        const todos = JSON.parse(data);

        const userTodos = todos.filter(t => t.userId === userId);
        res.status(200).json({ success: true, todos: userTodos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};