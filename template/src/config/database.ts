// database.ts
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    storage: "./database.sqlite", // Adjust for your database choice
});

export default sequelize;
