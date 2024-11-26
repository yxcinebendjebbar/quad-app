import { Sequelize } from "sequelize";

const database = new Sequelize("mydatabase", "root", "password123", {
  host: "localhost",
  <% if (database === "SQLite") { %>
  dialect: "sqlite",
  storage: "./database.sqlite",
  <% } else if (database === "MySQL") { %>
  dialect: "mysql",
  port: 3306,
  <% } else if (database === "PostgreSQL") { %>
  dialect: "postgres",
  port: 5432,
  <% } %>
});

export default database;
