#!/usr/bin/env node


import fs from "fs-extra";
import path from "path";
import ejs from "ejs";
import inquirer from "inquirer";
import { execSync } from "child_process";

import { fileURLToPath } from "url";
import chalk from "chalk";

// Get the current file path and directory
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
    {
        type: "confirm",
        name: "useCors",
        message: "Do you want to include CORS middleware?",
        when: (answers) => answers.authMethod === "JWT", // Only ask if JWT is selected
    },
    {
        type: "checkbox",
        name: "optionalLibraries",
        message: "Select additional libraries to include:",
        choices: ["dotenv", "cors", "morgan"],
    }


];


async function getUserInputs() {
    try {
        const answers = await inquirer.prompt(questions)
        console.log("Your selections")
        console.log(answers)
        return answers
    } catch (error) {
        console.error("Error gathering user input:", error)
    }
}


async function copyTemplate(dest) {
    try {
        await fs.copy('./template', dest)
        console.log('Template files copied successfully')
    } catch (error) {
        console.error('Error copying template:', error)
    }
}



async function createPackageJson(destination, { authType, database }) {
    const dependencies = {
        express: "^4.17.1",
        sequelize: "^6.6.5",
        bcryptjs: "^2.4.3",
    };
    if (authType === 'JWT') dependencies['jsonwebtoken'] = "^8.5.1";
    if (database === 'Postgres') dependencies['pg'] = "^8.7.1";
    else if (database === 'MySQL') dependencies['mysql2'] = "^2.3.3";

    const devDependencies = {
        typescript: "^4.4.3",
        "@types/express": "^4.17.13",
        "@types/node": "^16.10.1",
        // Additional types as necessary
    };

    const packageJson = {
        name: "express-app",
        version: "1.0.0",
        main: "dist/index.js",
        scripts: {
            start: "ts-node src/app.ts",
            build: "tsc"
        },
        dependencies,
        devDependencies,
    };

    await fs.writeFile(destination + '/package.json', JSON.stringify(packageJson, null, 2));
}



async function generateProject(userChoices) {
    const { projectName, authMethod, database } = userChoices;

    // Create project directory
    const projectPath = path.join(process.cwd(), projectName);
    fs.mkdirSync(projectPath, { recursive: true });

    // Template folder path
    const templatePath = path.join(__dirname, "template");

    // Copy files and render templates
    const filesToGenerate = [
        "package.json",
        "src/app.ts",
        "src/config/database.ts",
        "tsconfig.json",
        ".env.example",
    ];

    for (const file of filesToGenerate) {
        const templateFile = path.join(templatePath, file);
        const outputFile = path.join(projectPath, file);

        // Read and render EJS template
        const template = fs.readFileSync(templateFile, "utf8");

        const content = ejs.render(template, { projectName, authMethod, database });

        // Ensure directory exists and write file
        fs.outputFileSync(outputFile, content);
    }

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
        console.log(chalk.blue(`\nStarting project generation for "${userChoices.projectName}"...`));
        // Call your project generation logic here
        const projectPath = await generateProject(userChoices);
        installDependencies(projectPath)

    }
    console.log(chalk.green("🎉 Project generated successfully!"));
    console.log(chalk.blue("Run the following commands to get started:"));
    console.log(chalk.yellow(`cd ${userChoices.projectName}`));
    console.log(chalk.yellow("npm start"));
}

main();
