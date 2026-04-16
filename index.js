import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './src/routes/auth.routes.js';
import todoRouter from './src/routes/todo.routes.js'; // Import Todo

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter); // Use Todo

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});