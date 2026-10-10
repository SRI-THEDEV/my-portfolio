# Creative Developer — Modern MERN Stack Portfolio

A modern full-stack developer portfolio and project showcase application built with **React 19**, **Node.js**, **Express**, and **MongoDB**. Designed with an obsidian/dark-purple luxury aesthetic inspired by creative agency portfolios.

---

## 🌟 Key Features

- **Pixel-Perfect Modern Aesthetic**:
  - Deep space/dark obsidian palette (`#09080e`), ethereal purple radial glows, glassmorphism panels.
  - Giant hero typography with elegant handwritten script overlay (*"Portfolio"*).
  - Character portrait with cosmic stardust aura, status pill (*"AVAILABLE FOR PROJECTS"*), and rotating circular monogram badge (`CD`).
  - Key impact counters: *4+ Years Experience*, *40+ Projects Delivered*, *25+ Happy Clients*, *10+ Technologies*.

- **Dynamic "What I Do" Services**:
  - Interactive cards for *Web Design*, *Web Development*, *UI/UX Design*, and *Optimization*.
  - Step numbers, custom icons, and responsive glow hover states.

- **Featured Projects Showcase**:
  - Showcase cards for *Brandix Studio*, *Taskly App*, and *Hosteria*.
  - Category filtering (*ALL*, *WEB DEV*, *DASHBOARD*, *LANDING PAGE*).
  - Interactive modal dialogs with architecture breakdown, highlights, and live demo / GitHub links.

- **Developer Toolkit & Work Process**:
  - 12-stack toolkit grid (*HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind, Node.js, Git, Figma, VS Code, MongoDB*).
  - 4-phase agile workflow timeline (*Discover ➔ Design ➔ Develop ➔ Deliver*).
  - High-impact gradient Call-To-Action card.

- **Real-Time MERN Contact System & MongoDB Integration**:
  - Live Contact Form saving inquiries directly into the MongoDB `messages` collection.
  - Interactive **MongoDB Live Panel / Admin Drawer** to inspect real-time database records, view messages, add new projects, and monitor database connection health.

---

## 🏗️ Architecture

```
d:\E-portfolio\
├── package.json               # Root monorepo orchestrator (concurrently)
├── README.md                  # Complete documentation
│
├── server/                    # Node.js + Express + MongoDB API
│   ├── .env                   # Server configuration & MongoDB URI
│   ├── package.json
│   ├── server.js              # Express app, Mongoose connection, auto-seeding
│   ├── models/
│   │   ├── Project.js         # Projects schema
│   │   ├── Service.js         # Services schema
│   │   ├── Toolkit.js         # Tech stack toolkit schema
│   │   ├── Process.js         # Agile process schema
│   │   ├── Profile.js         # Developer profile & stats schema
│   │   └── Message.js         # Contact inquiries schema
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── serviceController.js
│   │   ├── messageController.js
│   │   └── profileController.js
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── messageRoutes.js
│   │   └── profileRoutes.js
│   └── seed/
│       └── seedData.js        # Automatic initial data seeder
│
└── client/                    # Vite + React 19 Frontend
    ├── index.html             # Google Fonts (Syne, Space Grotesk, Caveat, JetBrains Mono)
    ├── vite.config.js         # Tailwind CSS v4 + Proxy to localhost:5000
    ├── package.json
    └── src/
        ├── App.jsx            # Main app assembling all sections & state
        ├── index.css          # Tailwind CSS & theme tokens
        ├── components/
        │   ├── Navbar.jsx
        │   ├── HeroSection.jsx
        │   ├── WhatIDoSection.jsx
        │   ├── FeaturedProjectsSection.jsx
        │   ├── ToolkitCard.jsx
        │   ├── WorkProcessCard.jsx
        │   ├── CtaCard.jsx
        │   ├── BottomGridSection.jsx
        │   ├── ContactSection.jsx
        │   ├── ProjectModal.jsx
        │   ├── AdminDrawer.jsx
        │   └── Icons.jsx
        └── services/
            └── api.js         # Client API service for backend communication
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **Supabase** (free cloud PostgreSQL)

### 2. Supabase Database Setup
1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase project dashboard.
3. Open [`supabase_schema.sql`](file:///d:/E-portfolio/supabase_schema.sql), copy its full content, paste into the SQL Editor, and click **Run**.
4. Get your Project URL and Anon Key from **Project Settings > API**.

### 3. Environment Setup
The server configuration is located in `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
ADMIN_KEY=********
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Both Frontend and Backend Concurrently
From the project root:
```bash
npm run dev
```

This starts:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & MongoDB connection status |
| `GET` | `/api/projects` | Fetch all projects |
| `POST` | `/api/projects` | Create a new project (Admin) |
| `GET` | `/api/projects/:id` | Fetch project by ID |
| `PUT` | `/api/projects/:id` | Update project by ID |
| `DELETE` | `/api/projects/:id` | Delete project by ID |
| `GET` | `/api/services` | Fetch services list ("What I Do") |
| `GET` | `/api/toolkit` | Fetch technology stack items |
| `GET` | `/api/processes` | Fetch work process timeline steps |
| `GET` | `/api/profile` | Fetch profile stats & metadata |
| `POST` | `/api/messages` | Submit a new contact message |
| `GET` | `/api/messages` | Retrieve all messages (Admin view) |
| `DELETE` | `/api/messages/:id` | Delete a message |

---

## 🛠️ Testing & Seeding

---

## 🔐 Admin Access & Security

The MongoDB Live Panel and private database controls are restricted to **Admin only**:
- **Default Development Passcode**: `admin123` (customizable via `ADMIN_KEY` in `server/.env`)
- **How to Open**:
  - Click the **Lock icon** in the top Navbar or **Admin** link in the footer.
  - Or press the keyboard shortcut **`Ctrl + Shift + A`** (or `Cmd + Shift + A` on Mac).
- **Protected Actions**:
  - Viewing received contact messages (`GET /api/messages` -> 401 without key).
  - Deleting messages (`DELETE /api/messages/:id` -> 401 without key).
  - Adding or deleting projects (`POST /api/projects`, `DELETE /api/projects/:id`).
  - For normal visitors, the **MongoDB Panel** button and **+ Add Project** button are completely hidden.

To manually re-seed MongoDB with initial showcase data:
```bash
npm run seed
```

To build the client for production:
```bash
npm run build
```
