# Quad App CLI
**Quad App CLI** is a command-line tool designed to bootstrap a fully customizable Express backend application with essential features like authentication, database integration, and more—all with TypeScript support. The tool allows you to quickly generate a robust Express template based on your preferences.

## Features
- Customizable project setup:
    - Choose between JSON Web Tokens (JWT) or Express Session for authentication.
- Support for SQLite, MySQL, and PostgreSQL with Sequelize.
- TypeScript integration for type safety.
- Pre-configured authentication and user routes.
- Flexible file structure to get started with RESTful APIs.
## Getting Started
Follow these steps to get started with Quad App CLI:

1. Install Globally (Optional)

    You can install the package globally to use it anywhere:

`
npm install -g quad-app
`

2. Use Without Installation (Preferred)

    Run the tool directly using npx:

`
npx quad-app@latest
`
## Usage
Run the CLI:

`
npx quad-app@latest
`

Follow the prompts:

- Select your preferred authentication method (JWT or Express Session).
- Choose your database (SQLite, MySQL, or PostgreSQL).
- Provide the project name and other configurations.
- Navigate to the generated project folder:

`
cd my-express-app
`

- Install dependencies:

`
npm install
`

- Run the development server:

`
npm run dev
`

- Access your API:
The server will run at http://localhost:3000 by default. You can configure this in the .env file: 
`
cp .env.example .env
`

## Tools and References
### Tools Used
- [Node.js](https://nodejs.org/en) - JavaScript runtime environment.
- [TypeScript](https://www.typescriptlang.org/) - For type-safe JavaScript.
- [Express](https://expressjs.com/) - Web framework for Node.js.
- [Sequelize](https://sequelize.org/) - ORM for database integration.
- [EJS](https://ejs.co/) - Template engine used for rendering files.
- [Inquirer](https://www.npmjs.com/package/inquirer) - For interactive CLI prompts.

### References
- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Choose a License](https://choosealicense.com/)
## Contributing
Contributions are welcome! To get started:

Fork the repository and clone your fork:

```
git clone https://github.com/your-username/quad-app.git

cd quad-app
```

Create a new branch for your feature:

``git checkout -b feature-name``

Make your changes and commit:

``git commit -m "Add a new feature"``

Push your branch:


``git push origin feature-name``

Create a pull request on the main repository.

### Guidelines
- Ensure code is properly linted and formatted.
- Write meaningful commit messages.
- Follow the existing file structure and conventions.
## License
This project is licensed under the MIT License.

