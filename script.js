// This array holds all our tasks.
// Each task is an object: { id, text, completed }
// "let" is used here (not "const") because we reassign
// this array later when filtering or loading from storage.
let tasks = [];

// Which filter is currently active: 'all', 'active', or 'completed'
let currentFilter = 'all';

const STORAGE_KEY = 'todo_demo_tasks';

// Grabbing the DOM elements we'll need
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyMsg = document.getElementById('emptyMsg');
const remainingCount = document.getElementById('remainingCount');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Extra feature: persistence.
// Saves the current tasks array to localStorage as a JSON string,
// so the list survives a page reload.
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Loads tasks back from localStorage on page load.
// If nothing is saved yet, starts with an empty array.
function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  tasks = saved ? JSON.parse(saved) : [];
}

// Adds a new task to the array and re-renders the list.
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return; // ignore empty input

  tasks.push({
    id: Date.now(),       // simple unique id using timestamp
    text: trimmed,
    completed: false
  });

  saveTasks();
  render();
}

// Toggles a task's completed state by its id.
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  render();
}

// Removes a single task by its id.
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
}

// Updates the text of an existing task (used by the edit feature).
function editTaskText(id, newText) {
  const trimmed = newText.trim();
  if (!trimmed) return; // don't allow saving an empty task

  tasks = tasks.map(task =>
    task.id === id ? { ...task, text: trimmed } : task
  );
  saveTasks();
  render();
}

// Removes all completed tasks at once.
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  render();
}

// Turns a task's text into an editable input box.
// Saves the new text on Enter or when the input loses focus (blur).
// Pressing Escape cancels the edit and restores the original text.
function startEdit(task, span) {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  input.value = task.text;
  input.maxLength = 60;

  span.replaceWith(input);
  input.focus();
  input.select();

  function commitEdit() {
    editTaskText(task.id, input.value);
  }

  input.addEventListener('blur', commitEdit);

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      input.blur(); // triggers commitEdit above
    }
    if (event.key === 'Escape') {
      input.value = task.text; // restore original text
      input.blur();
    }
  });
}

// Returns only the tasks that match the current filter.
// This doesn't change the real "tasks" array — it just decides
// what gets shown on screen.
function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(task => !task.completed);
  }
  if (currentFilter === 'completed') {
    return tasks.filter(task => task.completed);
  }
  return tasks; // 'all'
}

// Builds the <li> elements and puts them in the list.
// This is the main DOM manipulation part — every time tasks
// or the filter change, we clear the list and rebuild it.
function render() {
  taskList.innerHTML = '';

  const visibleTasks = getFilteredTasks();

  visibleTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    span.title = 'Click to edit';
    span.addEventListener('click', () => startEdit(task, span));

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  // Show the empty message based on what's visible, not the full list.
  // (e.g. if filter is "completed" but nothing is completed yet)
  emptyMsg.style.display = visibleTasks.length === 0 ? 'block' : 'none';
  emptyMsg.textContent = tasks.length === 0
    ? 'No tasks yet. Add one above 👆'
    : `No ${currentFilter} tasks.`;

  // Live count of how many tasks are left to do (always based on ALL tasks,
  // not the filtered view, since "remaining" should be a global number).
  const remaining = tasks.filter(task => !task.completed).length;
  remainingCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} left`;
}

// Event listeners

addBtn.addEventListener('click', () => {
  addTask(taskInput.value);
  taskInput.value = '';
  taskInput.focus();
});

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask(taskInput.value);
    taskInput.value = '';
  }
});

clearCompletedBtn.addEventListener('click', clearCompleted);

// Filter buttons — clicking one updates currentFilter and
// highlights the active button.
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    render();
  });
});

// On page load: restore saved tasks first, then render.
loadTasks();
render();
