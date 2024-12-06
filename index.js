#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import ejs from "ejs";
import inquirer from "inquirer";
import { execSync } from "child_process";

import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
    default: "my-express-app",
    validate: (input) => input.trim() !== "" || "Project name cannot be empty.",
  },
  {
    type: "list",
    name: "authMethod",
    message: "Which authentication method do you want to use?",
    choices: ["JWT", "Session"],
  },
  {
    type: "list",
    name: "database",
    message: "Which database do you want to use?",
    choices: ["SQLite", "MySQL", "PostgreSQL"],
  },
];

async function getUserInputs() {
  try {
    const answers = await inquirer.prompt(questions);
    console.log("Your selections");
    console.log(answers);
    return answers;
  } catch (error) {
    console.error("Error gathering user input:", error);
  }
}



async function generateProject(userChoices) {
  const { projectName, authMethod, database } = userChoices;

  const projectPath = path.join(process.cwd(), projectName);
  fs.mkdirSync(projectPath, { recursive: true });

  const templatePath = path.join(__dirname, "template");

  const filesToGenerate = [
    "package.json",
    "src/app.ts",
    "src/config/database.ts",
    "src/controllers/authController.ts",
    "src/middlewares/authMiddleware.ts",
    "src/models/userModel.ts",
    "src/routes/authRoutes.ts",
    "src/routes/userRoutes.ts",
    "tsconfig.json",
    ".env.example",
  ];

  for (const file of filesToGenerate) {
    const templateFile = path.join(templatePath, file);
    const outputFile = path.join(projectPath, file);

    // Read and render EJS template
    const template = fs.readFileSync(templateFile, "utf8");

    const content = ejs.render(template, { projectName, authMethod, database });

    fs.outputFileSync(outputFile, content);
  }
  if (database === "SQLite") {
    const templateFile = path.join(templatePath, "src/config/database.sqlite");
    const outputFile = path.join(projectPath, "src/config/database.sqlite");

    const template = fs.readFileSync(templateFile, "utf8");

    const content = ejs.render(template, { projectName, authMethod, database });

    fs.outputFileSync(outputFile, content);
  }
  execSync("git init");
  execSync("git branch -M main");

  return projectPath;
}

function installDependencies(projectPath) {
  console.log("Installing dependencies...");

  try {
    execSync("npm install", { cwd: projectPath, stdio: "inherit" });
    console.log(chalk.blue("Dependencies installed successfully."));
  } catch (error) {
    console.error(chalk.red("Error installing dependencies:", error.message));
  }
}

async function main() {
  const userChoices = await getUserInputs();

  if (userChoices) {
    console.log(
      chalk.blue(
        `\nStarting project generation for "${userChoices.projectName}"...`
      )
    );
    // Call your project generation logic here
    const projectPath = await generateProject(userChoices);
    installDependencies(projectPath);
  }
  console.log(chalk.green("🎉 Project generated successfully!"));
  console.log(chalk.blue("Run the following commands to get started:"));
  console.log(chalk.yellow(`cd ${userChoices.projectName}`));
  console.log(chalk.yellow("npm start"));
}

main();
