const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateList() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    const completedTasks = tasks.filter(task => task.completed);
    const incompleteTasks = tasks.filter(task => !task.completed);

    incompleteTasks.forEach((task, index) => {
        const li = createTaskElement(task, index);
        todoList.appendChild(li);
    });

    if (completedTasks.length > 0 && incompleteTasks.length > 0) {
        const hr = document.createElement('hr');
        todoList.appendChild(hr);
    }

    completedTasks.forEach((task, index) => {
        const li = createTaskElement(task, index, true);
        todoList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(task, index, isCompleted) {
    const li = document.createElement('li');
    li.className = task.completed ? 'todo-item completed' : 'todo-item';
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="btn-primary" onclick="completeTask(${index})">Complete</button>
        <button class="image-button" onclick="deleteTask(${index}, ${isCompleted})">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" margin-top="5px" viewBox="0 0 24 24">
                <path d="M 10.806641 2 ..."></path>
            </svg>
        </button>
    `;
    return li;
}

function addTask() {
    const newTaskText = document.getElementById('new-task').value.trim();
    if (newTaskText !== '') {
        tasks.push({ text: newTaskText, completed: false });
        updateList();
        document.getElementById('new-task').value = '';
    }
}

function completeTask(index) {
    if (index >= 0 && index < tasks.length) {
        const completedTask = tasks[index];
        tasks.splice(index, 1);
        tasks.push(completedTask);
        completedTask.completed = true;
        updateList();
    }
}


function deleteTask(index, isCompleted) {
    const targetArray = isCompleted ? tasks.filter(task => task.completed) : tasks.filter(task => !task.completed);
    if (index >= 0 && index < targetArray.length) {
        const taskToDelete = targetArray[index];
        tasks.splice(tasks.indexOf(taskToDelete), 1);
        updateList();
    }
}

function highlightEven() {
    const todoItems = document.querySelectorAll('.todo-item:not(.completed)');
    todoItems.forEach((item, index) => {
        item.style.backgroundColor = index % 2 !== 0 ? '#f3f6fd' : '#fff';
    });
}

function highlightOdd() {
    const todoItems = document.querySelectorAll('.todo-item:not(.completed)');
    todoItems.forEach((item, index) => {
        item.style.backgroundColor = index % 2 === 0 ? '#f3f6fd' : '#fff';
    });
}

function deleteFirst() {
    tasks.shift();
    updateList();
}

function deleteLast() {
    tasks.pop();
    updateList();
}

updateList();