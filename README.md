# 🧠 VectorShift Flowbuilder

A drag-and-drop AI pipeline builder built using **React Flow**, **Zustand**, **Atomic Design**, and **FastAPI**.

Designed for rapid prototyping of node-based LLM flows with dynamic inputs, outputs, and system logic — all rendered in a beautiful, responsive canvas.

---

## ✨ Features

- ⚙️ **Node Abstraction** with reusable `BaseNode` component
- 🎨 **Tailwind CSS** styled UI with responsive grid & hover effects
- 🧱 **Atomic Design** file structure for modularity & scalability
- 🧠 **TextNode Parsing** — auto-generates handles from `{{variables}}`
- 🔄 **Backend Integration** to check DAG validity and return pipeline stats

---

## 📁 Tech Stack

- **Frontend:** React + React Flow + Zustand + Tailwind
- **Backend:** FastAPI (Python)
- **Architecture:** Atomic Design + Modular Node System

---

## 🚀 Quick Start

```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
uvicorn main:app --reload
