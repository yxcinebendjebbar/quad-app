import { Router } from "express";
import { login, register<% if (authMethod !== "JWT") { %>, logout<% } %> } from "../controllers/authController";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
<% if (authMethod !== "JWT") { %>
authRoutes.post("/logout", logout);
<% } %>

export default authRoutes;
