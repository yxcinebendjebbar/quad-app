import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { User } from "../models/userModel";

const userRoutes = Router();

userRoutes.get("/me", authMiddleware, async (req, res) => {
    const userId = req<% if(authMethod === "Session") { %>.session<% } %>.user?.id; // Retrieve the user ID from the decoded JWT payload
    if (!userId) {
        return res.status(401).json({ message: "User not found in token" });
    }

    const user = await User.findByPk(userId); // Use the user ID to fetch the user
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

export default userRoutes;
