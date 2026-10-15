# 💰 Premium Full-Stack Expense Tracker

A production-ready, beautiful, and secure full-stack application designed to track and manage personal finances. This application features robust **Multi-User Isolation**, an interactive UI with high-end glassmorphism styling, automated input validation, and full security schemas including encrypted password hashing and token-based state management.

---

## 🚀 Live Demo

- **Frontend (UI Hosted on Vercel):** `https://vercel.app`
- **Backend (API Hosted on Render):** `https://expense-tracker-chwk.onrender.com`
- **Database (Cloud Instance Hosted on Aiven):** MySQL 8.4 Server (DigitalOcean FRA Node)

---

## 🔥 Key Upgrades & Features

### 👥 1. Multi-User Isolation & Security

- **Data Segregation:** Added a complete `users` management model. Expenses are dynamically linked to users via a restricted relational schema (`user_id` mapping). Users can **only** query, create, update, or delete their own data.
- **Password Encryption:** Zero plain-text storage. Passwords are securely salted and hashed using **`bcrypt`** before entering the cloud storage node.
- **State Authorization:** Implemented stateless **JWT (JSON Web Tokens)** validation middleware. Secure passes are issued upon sign-in, valid for 24 hours, and automatically injected into all frontend API request headers.

### 🎨 2. High-End UI & UX Design

- **Glassmorphism Theme:** Custom dark-mode design stack built with **Sass/SCSS**, blending deep indigo background cards with fine neon borders, responsive glowing form wrappers, and smooth linear gradients.
- **Smart Adaptive Shell:** A unified, dynamic `AuthPage` supporting zero-refresh switching between login and registration layouts.
- **Premium Event Indicators:** Integrated a dynamic notification system tracking operations (Success/Error states) with a fluid, self-draining micro-progress timeline bar.
- **Resilient Connection Guards:** Replaced raw exceptions with an elegant, glowing **Error Overlay Panel** featuring micro-flicker animations and an instant query recovery mechanism ("Try Again" action).
- **Global Header Control:** Constructed a sticky navigation header utilizing the React Router engine to watch and adapt routing link behaviors based on live user authentication properties (toggling Sign In / Log Out states).

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                              |
| :----------- | :------------------------------------------------------------------------ |
| **Frontend** | React 19, TypeScript, Vite, Sass (SCSS), React Router Dom                 |
| **Backend**  | Node.js, Express, JWT, Bcrypt, CORS, Dotenv                               |
| **Database** | MySQL 8.4 (Cloud Hosted, Enforced SSL/TLS Node)                           |
| **DevOps**   | Vercel (Client Deployment), Render (API Compute), Aiven (Database Engine) |

---

## 📂 Project Structure

```text
expense-tracker/
├── src/                       # React Frontend Application
│   ├── components/            # Shared UI Views (Forms, Modals, Lists)
│   ├── hooks/                 # Custom Hooks (useExpenses engine)
│   ├── pages/                 # Full Page layouts (ExpensesPage, AuthPage)
│   ├── services/              # Secure API Fetch Wrappers (expenseService)
│   ├── styles/                # Modular SCSS style sheets
│   ├── types/                 # Consolidated TypeScript Typings
│   ├── App.tsx                # App shell & Route Guard configurations
│   └── main.tsx               # Frontend client bootstrap
├── server/                    # Node.js Express Backend API
│   ├── src/
│   │   ├── config/            # Relational Cloud Pool settings (database.js)
│   │   ├── controllers/       # Business handlers (expenseController, authController)
│   │   ├── middleware/        # Validations & Route Protection (auth.js)
│   │   ├── routes/            # Isolated router definitions
│   │   └── server.js          # Main Application Entry point
│   └── package.json           # Backend dependency configuration
├── package.json               # Root Vite scripts and clients
├── vite.config.ts             # Vite bundler parameters
└── README.md                  # System Documentation
```

---

## 🗄️ Relational Database Schema

The core MySQL engine is structured using the schema below, establishing relational referential integrity via strict foreign keys and cascading delete constraints:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    expense_date DATE NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_expense_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🌐 API Reference

All requests must supply JSON payloads. Protected endpoints demand a valid token prefix: `Authorization: Bearer <JWT_TOKEN>`.

### Authentication Routes

- `POST /api/auth/register` — Registers a unique identity profile.
- `POST /api/auth/login` — Verifies passwords against salted hashes and dispenses auth tokens.

### Protected Expense Routes

- `GET /api/expenses` — Returns sorted expenses assigned **exclusively** to the requesting individual.
- `GET /api/expenses/:id` — Retretries an explicit personal record line.
- `POST /api/expenses` — Persists a new item linked to the active token owner.
- `PUT /api/expenses/:id` — Safely updates a distinct owned record.
- `DELETE /api/expenses/:id` — Irreversibly purges a target expense line.

---

## 🔧 Environment Variables

Configure your local or container production keys inside a `.env` environment layout:

### Server Setup (`server/.env`)

```env
PORT=3000
DB_HOST=://aivencloud.com
DB_PORT=27382
DB_USER=avnadmin
DB_NAME=defaultdb
DB_PASSWORD=your_secure_cloud_password
JWT_SECRET=your_long_custom_alphanumeric_hmac_hash_key
```

---

## 💻 Local Quickstart

### 1. Installation

Install project requirements for both segments concurrently:

```bash
npm install
cd server && npm install
cd ..
```

### 2. Execution

Fire up the backend engine process loop:

```bash
cd server
npm run dev
```

Launch the hot-reloading client bundle environment in an alternate terminal pane:

```bash
# Executed from root directory
npm run dev
```

- **Local Interface Client:** `http://localhost:5173`
- **Local Active Server Framework:** `http://localhost:3000`
