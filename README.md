<div align="center">

# 🔗 URL Shortener API

A REST API that turns long URLs into short, shareable links, with user authentication and a PostgreSQL database.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

---

## 📖 Overview

This is a backend project I built to learn Node.js backend development properly: layered architecture, relational databases, authentication, and request validation. Users register, log in, and create short links for long URLs. Each short code is stored in PostgreSQL and tied to the user who created it.

I'm a Flutter developer first, so this API is also the foundation for the backend my mobile apps can talk to.

---

## ✨ Features

- 🔐 **JWT authentication** with middleware-protected routes
- ✂️ **Short code generation** using `nanoid`
- ✅ **Request validation** with Zod
- 🗄️ **PostgreSQL** with type-safe queries through **Drizzle ORM**
- 🧱 **Layered structure**: routes → controllers → services → database
- 🐳 **Docker Compose** setup for a local PostgreSQL instance

---

## 🛠️ Tech Stack

| Technology                | Purpose                         |
| ------------------------- | ------------------------------- |
| Node.js (ES modules)      | Runtime                         |
| Express 5                 | HTTP server and routing         |
| PostgreSQL                | Relational database             |
| Drizzle ORM + drizzle-kit | Queries, schema, and migrations |
| jsonwebtoken              | JWT authentication              |
| Zod                       | Request validation              |
| nanoid                    | Short code generation           |
| dotenv                    | Environment configuration       |
| Docker Compose            | Local database                  |
| pnpm                      | Package manager                 |

---

## 📁 Project Structure

```
url_shortner/
├── src/
│   ├── config/        # DB connection and app config
│   ├── controller/    # Handle requests and responses
│   ├── middleware/    # Authentication middleware
│   ├── models/        # Drizzle table schemas
│   ├── router/        # Route definitions
│   ├── services/      # Business logic and database queries
│   ├── utils/         # Helpers
│   └── validations/   # Zod schemas
├── docker-compose.yml
├── drizzle.config.js
├── index.js           # App entry point
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) (for the local PostgreSQL database)

### 1. Clone and install

```bash
git clone https://github.com/Talhaarif326/url_shortner.git
cd url_shortner
pnpm install
```

### 2. Start PostgreSQL

```bash
docker compose up -d
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/postgres
JWT_SECRET=your_long_random_secret
PORT=8000
```

Use the same user and password you set in `docker-compose.yml`. Adjust the variable names if your `src/config` uses different ones.

### 4. Create the database tables

```bash
pnpm db:push
```

### 5. Run the server

```bash
pnpm dev
```

---

## 📜 Scripts

| Command          | What it does                              |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Starts the server with `node --watch`     |
| `pnpm db:push`   | Pushes the Drizzle schema to the database |
| `pnpm db:studio` | Opens Drizzle Studio to browse your data  |

## 📄 License

ISC

---

<div align="center">

Built by [Talha Arif](https://github.com/Talhaarif326) · [@TalhaArif794](https://x.com/TalhaArif794)

</div>
