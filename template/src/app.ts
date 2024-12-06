import express from "express";
import * as dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();


const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth",authRoutes);
app.use("/user",userRoutes);


const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
