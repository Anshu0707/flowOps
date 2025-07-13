# 🧠 AI Pipeline Builder

A drag-and-drop AI pipeline builder built using **React Flow**, **Zustand**, **Atomic Design**, and **FastAPI**.

Designed for rapid prototyping of node-based LLM flows with dynamic inputs, outputs, and system logic — all rendered in a beautiful, responsive canvas.

🔗 **Live Demo:** [flowops-hu9f.onrender.com](https://flowops-hu9f.onrender.com/)

---

## 🧩 About This Project

This project was developed to simulate a low-code visual pipeline editor for AI workflows — similar to tools like Langflow or Flowise. The goal was to apply component abstraction, UI consistency, backend validation, and scalable design patterns under a tight deadline.

---

## ✨ Features

- ⚙️ **Reusable Node Abstraction** via a shared `BaseNode` component
- 🧠 **Smart TextNode Parsing** – auto-generates handles from `{{variables}}`
- 🎨 **Tailwind CSS** styling with clean grid, hover states, and shadows
- 🔁 **Diverse Node Types** (Condition, Delay, Filter, Transform, Comment)
- 🧱 **Atomic Design Architecture** for long-term scalability
- 🔄 **Backend Integration** (WIP) to check DAG structure and pipeline stats

---

## 📁 Tech Stack

- **Frontend:** React, React Flow, Zustand, Tailwind CSS
- **Backend:** Python + FastAPI
- **Architecture:** Atomic Design + modular canvas state logic

---

## 🚀 Quick Start

```bash
# Frontend
cd frontend
npm install
npm start

# Backend (in development)
cd backend
uvicorn main:app --reload
```


## Previews

- Pipeline
<img width="2559" height="1236" alt="Screenshot 2025-07-13 193542" src="https://github.com/user-attachments/assets/d1ca116f-d613-4aba-b621-523882fadf15" />

---

- Pipeline Stats
<img width="585" height="631" alt="Screenshot 2025-07-13 193601" src="https://github.com/user-attachments/assets/a4666f64-8839-4f22-b206-ea543f82e913" />
