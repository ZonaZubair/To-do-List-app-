<h1>✅ To-Do List Demo</h1>

<p>
A to-do list app with add, edit, complete, delete, filters, and persistence. Built to practice DOM manipulation, event handling, and array methods.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-yellow" />
  <img src="https://img.shields.io/badge/Status-Complete-brightgreen" />
</p>

---

## 📌 What it demonstrates

| Concept | Where it shows up |
|---|---|
| 🖥️ DOM Manipulation | The task list is rebuilt every time tasks or the filter change |
| 🎯 Event Handling | Add button, checkboxes, delete buttons, edit-in-place, filters, and keyboard keys all trigger actions |
| 🔁 Array Methods | Uses `.map()`, `.filter()`, and `.forEach()` to manage and display the task list |
| 📦 Scope | Task state lives in one place (`tasks` array) and is updated through dedicated functions |
| 💾 Persistence | `localStorage` saves tasks so they survive a page reload |

---

## ✨ Extra Features

- **Edit a task** — click any task's text to turn it into an editable field. Press **Enter** to save, **Escape** to cancel, or click away to save automatically.
- **Filters** — switch between **All**, **Active**, and **Completed** views
- **Persistence** — tasks are saved to `localStorage`, so reloading the page doesn't lose anything
- **Press Enter to add** — no need to click the Add button every time
- **Remaining task counter** — live count of tasks not yet completed
- **Clear completed** — removes all checked-off tasks in one click

---

## 🚀 How to Run

**Option 1 — Just open it:**

No installation needed.

```
Open index.html in any browser
```

**Option 2 — Local server:**

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`

---

## 🌐 Deployed

*(Add your live URL here if deployed — Netlify / Vercel / GitHub Pages)*

---

## 📁 Files

```
todo/
├── index.html
├── script.js
└── README.md
```
