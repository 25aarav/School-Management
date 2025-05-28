# 📚 School Management System API

This project is a RESTful API built with **Node.js**, **Express.js**, and **MySQL** to manage school data. It allows users to:

- Add new schools
- List schools sorted by proximity
- Use pagination
- Easily integrate into larger educational platforms

---

## 🚀 Features

- ✅ Add new school entries with validation
- 📍 List schools sorted by **distance** from user location (uses **Haversine formula**)
- 🔄 Supports **pagination** in the school list
- 📦 Environment variable configuration via `.env`
- 🔒 Secure and clean backend structure

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **mysql2**
- **dotenv**
- **Postman**

---

## 📁 Folder Structure

school-management/
│
├── dbConfig/
│ └── dbConfig.js # MySQL database connection
│
├── routes/
│ ├── listSchools.js # GET /listSchools endpoint
│ └── addSchool.js # POST /addSchool endpoint
│
├── .env # Environment variables
├── .gitignore
├── server.js # Main entry point, setup express and routes
├── package.json
└── README.md