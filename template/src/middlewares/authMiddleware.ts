<% if (authMethod === "JWT") { %>
import jwt from "jsonwebtoken";
import { UserAttributes } from "../models/userModel";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded as UserAttributes;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
<% } else { %>
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
<% } %>