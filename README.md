# MERN MySQL Authentication & CRUD System

## 📌 Project Overview

This is a full-stack MERN application using MySQL database. It includes authentication, password reset via email, and a dashboard with full CRUD operations.

---

## 🧰 0. Prerequisites

Install:

* Node.js → https://nodejs.org
* MySQL → https://dev.mysql.com/downloads/
* Git → https://git-scm.com

Verify:
node -v
npm -v
git --version

---

## 📥 1. Clone Project

git clone https://github.com/your-username/mern-mysql-auth-crud.git
cd mern-mysql-auth-crud

---

## 🗄️ 2. Setup MySQL Database

### Create Database

CREATE DATABASE mern_auth_db;
USE mern_auth_db;

### Create Tables

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
phone VARCHAR(20),
password VARCHAR(255) NOT NULL,
reset_token VARCHAR(255),
reset_token_expiry DATETIME,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE items (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT,
status ENUM('active','pending','completed') DEFAULT 'active',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

---

## ⚙️ 3. Backend Setup

cd backend
npm install

### Create .env file inside backend

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=mern_auth_db
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
EMAIL_USER=[your_email@gmail.com](mailto:your_email@gmail.com)
EMAIL_PASS=your_app_password

### Run Backend

npm run dev

---

## 🎨 4. Frontend Setup

cd frontend
npm install
npm run dev

Open: http://localhost:5173

---

## 🔐 5. Authentication Flow

1. User registers → password hashed
2. User logs in → JWT token generated
3. Token stored in localStorage
4. Axios attaches token
5. Backend verifies token

---

## 🔄 6. Password Reset Flow

1. Enter email
2. Token generated
3. Email sent
4. Open link
5. Reset password

---

## 🔗 7. API Endpoints

Base URL: http://localhost:5000/api

### Auth APIs

POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot
POST /api/auth/reset
GET /api/auth/me

Header: Authorization: Bearer TOKEN

---

### Item APIs

GET /api/items
GET /api/items/:id
POST /api/items
PUT /api/items/:id
DELETE /api/items/:id

---

### Stats API

GET /api/stats

---

## 🧪 8. Testing

Use:

* Postman for API testing
* MySQL Workbench for database
* Browser for frontend

---

## 📸 9. Screenshots

Create folder: screenshots/

Add:

* login.png
* register.png
* dashboard.png
* crud.png
* database.png

---

## 📦 10. Git Setup & Push

git init
git add .
git commit -m "initial commit"

Create repo on GitHub

git remote add origin https://github.com/your-username/mern-mysql-auth-crud.git
git branch -M main
git push -u origin main

---

## 📁 11. Project Structure

mern-mysql-auth-crud/
│
├── backend/
├── frontend/
├── database.sql
├── screenshots/
├── README.md

---

## 🛡️ 12. Security

* Passwords hashed using bcrypt
* JWT authentication
* SQL injection prevented
* .env not uploaded

---

## ⚠️ 13. Common Errors

DB not connecting → check credentials
Email not sending → use app password
JWT error → check secret
Git not working → install git

---

## 🚀 14. Run Project

Backend:
cd backend
npm run dev

Frontend:
cd frontend
npm run dev

---

## 🎯 Final Output

* Register/Login works
* Dashboard works
* CRUD works
* MySQL stores data
* Password reset works

---

## 👨‍💻 Author

Developed as part of MERN Stack Assignment
