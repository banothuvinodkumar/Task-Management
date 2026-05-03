# Task Management Application

A full-stack task management web application built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Registration and Login with JWT and bcrypt.
- **Task Management**: Create, Read, Update, and Delete tasks.
- **Task Attributes**: Priority (Low, Medium, High), Status (Pending, In-progress, Completed), and Due Dates.
- **Real-Time Updates**: Live updates across clients using Socket.io.
- **Responsive Design**: Modern UI that works on both desktop and mobile devices.
- **Search & Filter**: Easily find tasks by title/description or filter by status.

## Tech Stack

- **Frontend**: React (Vite), Axios, React Router, Socket.io-client.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io, JWT.
- **Styling**: Pure CSS.

## Prerequisites

- Node.js installed on your machine.
- MongoDB Atlas account (connection string provided in `.env`).

## Setup Instructions

### 1. Clone the Repository

```bash
cd task-manager
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (if not already present):

```env
PORT=5000
MONGODB_URI=mongodb+srv://vinodkumarbanothu855_db_user:aa07MgkGHVbGXnEN@cluster0.pgffdcs.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

*Note: Ensure you add a `"start": "node server.js"` script to `server/package.json`.*

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

The application will be running at `http://localhost:5173`.

## Usage

1. Register a new account.
2. Log in with your credentials.
3. Start creating and managing your tasks!
4. Open the app in two different tabs to see real-time updates in action.

## Folder Structure

- `server/`: Backend API and Socket implementation.
- `client/`: React frontend application.
- `client/src/components/`: Reusable UI components.
- `client/src/pages/`: Main application views.
- `client/src/services/`: API and Socket service layers.
- `client/src/styles/`: CSS styling.
