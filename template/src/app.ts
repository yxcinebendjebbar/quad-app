import express from "express";
import * as dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
<% if (authMethod === "Session") { %>import session from "express-session";<% } %>
<% if (authMethod === "JWT") { %>import { UserAttributes } from './models/userModel';<% } %>


dotenv.config();



const app = express();
app.use(express.json());

<% if(authMethod === "Session") { %>
  declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      email: string;
    };
  }
}
<% } %>

<% if(authMethod === "JWT") { %>
declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes; // or use a specific type if needed
    }
  }
}
<% } %>

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth",authRoutes);
app.use("/user",userRoutes);


const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
