import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("mydatabase", "root", "password123", {
  host: process.env.DB_HOST,
  <% if (database === "SQLite") { %>
  dialect: "sqlite",
  storage: "./database.sqlite",
  <% } else if (database === "MySQL") { %>
  dialect: "mysql",
  port: process.env.DB_PORT as unknown as number,
  <% } else if (database === "PostgreSQL") { %>
  dialect: "postgres",
  port: process.env.DB_PORT as unknown as number,
  <% } %>
});

export default db;
