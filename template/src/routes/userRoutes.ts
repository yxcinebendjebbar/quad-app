import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { User } from "../models/userModel";

const userRoutes = Router();

userRoutes.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findByPk(req.user?.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

export default userRoutes;
