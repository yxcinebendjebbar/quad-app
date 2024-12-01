
# **Express App Starter**

A simple and customizable starter template for building Express.js applications with TypeScript, Sequelize, and authentication options. This boilerplate is designed to help you quickly set up a robust and scalable backend application.

## **Features**
- **Authentication Options**: Choose between JWT or session-based authentication during setup.
- **Database Support**: Works with SQLite, MySQL, or PostgreSQL.
- **Environment Configuration**: Use `.env` files for easy configuration.
- **Modern Development Tools**:
  - TypeScript for type safety.
  - Nodemon for automatic server reload during development.
  - Pre-configured `tsconfig.json` for seamless TypeScript compilation.
- **Seamless Project Generation**: Set up your app by answering a few prompts.

---

## **Getting Started**

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in the required values (e.g., database credentials, JWT secret).

4. Set up your database:
   - Ensure your database is running (e.g., SQLite file exists, MySQL/PostgreSQL is configured).
   - Run migrations if applicable (future versions may include this).

---

### **Usage**

#### **Development**
To start the development server with hot-reloading:
```bash
npm run dev
```

#### **Production**
To build and start the production server:
```bash
npm run build
npm start
```

---

## **Project Structure**
```
.
├── src/
│   ├── app.ts                  # Entry point of the application
│   ├── config/
│   │   └── database.ts         # Sequelize configuration
│   ├── controllers/
│   │   └── authController.ts   # Handles authentication logic
│   ├── middlewares/
│   │   └── authMiddleware.ts   # Authentication middleware
│   ├── models/
│   │   └── userModel.ts        # User model definition
│   ├── routes/
│   │   └── authRoutes.ts       # Authentication routes
│   └── ...
│              
├── .env.example                # Environment variable template
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
└─                   
```

---

## **Customizing Your Project**
This template uses `ejs` to dynamically generate code during setup. Some parts of the project (e.g., dependencies, database configuration) are adjusted based on your choices during initialization.

---

## **Contributing**
Contributions are welcome! Feel free to fork the repo and submit pull requests.

---

## **License**
This project is licensed under the [MIT License](LICENSE).

---
