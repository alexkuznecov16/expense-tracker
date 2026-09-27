# Expense Tracker

A full-stack expense management app built with React + TypeScript on the front end and Express + MySQL on the back end. It lets users add, view, update, and delete expenses with category and date tracking.

## Overview

This project is structured as a two-part application:

- Frontend: Vite + React + TypeScript
- Backend: Node.js + Express + MySQL

The client renders a dashboard-style expense list and form, while the API serves the expense data and validates user input before writing to MySQL.

## Features

- Create new expenses with title, amount, category, and date
- View a list of expenses sorted by newest date first
- Delete individual expenses
- Update existing entries via the API
- Responsive UI with custom styling
- MySQL-backed persistence
- API validation for required fields and valid dates

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Sass

### Backend

- Node.js
- Express 5
- MySQL2
- CORS
- dotenv

## Project Structure

```text
expense-tracker/
├── src/                       # React frontend
│   ├── components/            # UI components
│   ├── hooks/                # Data fetching hooks
│   ├── pages/                # Pages
│   ├── services/             # Fetch wrappers for the API
│   ├── styles/               # SCSS styles
│   ├── types/                # Shared TypeScript types
│   ├── utils/                # Utility helpers
│   ├── App.tsx               # App entry
│   └── main.tsx              # Frontend bootstrap
├── server/                    # Express API
│   ├── src/
│   │   ├── config/           # MySQL pool config
│   │   ├── controllers/      # Expense CRUD handlers
│   │   ├── middleware/       # Request validation
│   │   ├── routes/           # API routes
│   │   └── server.js         # API server entry
│   ├── .env                  # Local environment config
│   └── package.json
├── package.json               # Frontend scripts and dependencies
├── vite.config.ts
├── tsconfig*.json
├── index.html
├── eslint.config.js
└── README.md
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+ and npm
- MySQL installed and running locally
- A database named `expense_tracker` (or change the value in your `.env`)

## Database Setup

Create a MySQL database and table:

```sql
CREATE DATABASE expense_tracker;
USE expense_tracker;

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  expense_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Configuration

Create or update the backend environment file at `server/.env`:

```env
PORT=8200
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=expense_tracker
```

> The project already includes a local `.env` file in `server/`, but you should update the credentials to match your own MySQL setup.

## Installation

Install both frontend and backend dependencies:

```bash
npm install
cd server
npm install
cd ..
```

## Running the Project

Start the backend API in one terminal:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
npm run dev
```

Then open:

- Frontend: http://localhost:5173
- API: http://localhost:8200

## API Endpoints

### GET /api/expenses

Returns all expenses ordered by date descending.

### GET /api/expenses/:id

Returns a single expense by ID.

### POST /api/expenses

Creates a new expense.

Request body:

```json
{
	"title": "Groceries",
	"amount": 54.25,
	"category": "Food",
	"expense_date": "2026-09-27"
}
```

### PUT /api/expenses/:id

Updates an existing expense.

### DELETE /api/expenses/:id

Deletes an expense.

### GET /api/test-db

Checks whether the backend can connect to MySQL successfully.

## Frontend Behavior

The app is a single-page React interface powered by `useExpenses` and the `expenseService` fetch layer. It fetches records from the backend and updates the list after create and delete actions.

## Scripts

### Root project

```bash
npm run dev       # Start Vite frontend
npm run build     # Build production bundle
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Server project

```bash
cd server
npm run dev       # Start Express API with nodemon
npm run start     # Start API in production mode
```

## Production Build

To build the frontend for deployment:

```bash
npm run build
```

This compiles the React app into the `dist/` directory.

## Notes

- The API validates title, amount, category, and date before creating or updating entries.
- Expense dates are stored as MySQL `DATE` values.
- The app currently expects the API to be running at `http://localhost:8200`.

## License

This project is for local development and learning purposes.

## Contributing

Feel free to fork this repo, improve the UI, add filtering, analytics, or budget summaries, and submit your changes.
