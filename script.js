const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const clearCompletedBtn = document.getElementById('clear-completed');


function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach(task => addTaskToDOM(task.text, task.completed));
  updateCount();
}


function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.todo-item').forEach(item => {
    tasks.push({
      text: item.querySelector('.todo-text').textContent,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask() {
  const text = input.value.trim();
  if (text === '') return;

  addTaskToDOM(text, false);
  saveTasks();
  updateCount();
  input.value = '';
}

function addTaskToDOM(text, completed) {
  const li = document.createElement('li');
  li.className = 'todo-item' + (completed ? ' completed' : '');

  li.innerHTML = `
    <span class="todo-text">${text}</span>
    <div class="actions">
      <button class="edit-btn"><i class="fas fa-edit"></i></button>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>
  `;

  
  li.querySelector('.todo-text').addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
    updateCount();
  });

  
  li.querySelector('.edit-btn').addEventListener('click', () => {
    const newText = prompt('Edit task:', text);
    if (newText && newText.trim() !== '') {
      li.querySelector('.todo-text').textContent = newText.trim();
      saveTasks();
    }
  });

  
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
    saveTasks();
    updateCount();
  });

  todoList.appendChild(li);
}


function updateCount() {
  const total = document.querySelectorAll('.todo-item').length;
  const completed = document.querySelectorAll('.todo-item.completed').length;
  const remaining = total - completed;
  taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} left`;
}


clearCompletedBtn.addEventListener('click', () => {
  document.querySelectorAll('.todo-item.completed').forEach(item => item.remove());
  saveTasks();
  updateCount();
});


addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});


loadTasks();