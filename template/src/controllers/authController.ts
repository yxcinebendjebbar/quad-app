<% if (authMethod === "JWT") { %>
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/userModel";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });

    res.json({ token });
};

export const register = async (req: Request, res: Response) => {
    const {username, email, password } = req.body;

    const newUser = await User.create({username, email, password });

    res.status(201).json({ user: newUser });
};
<% } else { %>
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../models/userModel";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = { id: user.id, email: user.email };
    res.json({ message: "Logged in successfully" });
};

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        res.json({ message: "Logged out successfully" });
    });
};

export const register = async (req: Request, res: Response) => {
    const {username, email, password } = req.body;

    const newUser = await User.create({username, email, password });

    res.status(201).json({ user: newUser });
};
<% } %>
