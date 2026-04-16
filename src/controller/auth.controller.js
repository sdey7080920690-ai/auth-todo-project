import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

const filePath = path.join(process.cwd(), 'src', 'database', 'user.json');

export const postRegister = async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        if (!email || !password || !fullName) {
            return res.status(400).json({ success: false, message: "Fill required fields" });
        }

        const data = await fs.readFile(filePath, 'utf-8').catch(() => '[]');
        const users = JSON.parse(data || '[]');

        if (users.find(user => user.email === email)) {
            return res.status(400).json({ success: false, message: "User Already Exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { fullName, email, password: hashedPassword };

        users.push(newUser);
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));

        return res.status(201).json({
            success: true,
            message: "Account created Successfully"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};

export const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(data);
        const user = users.find(u => u.email === email);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const { password: _, ...userData } = user;
        return res.status(200).json({ success: true, message: "Login Success", user: userData });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
};