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

    completedTasks.forEach(task => {
        const li = createTaskElement(task);
        todoList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(task, index) {
    const li = document.createElement('li');
    li.className = task.completed ? 'todo-item completed' : 'todo-item';
    li.innerHTML = `
                    <span>${task.text}</span>
                    <button class="btn-primary" onclick="completeTask(${index})">Complete</button>
                    <button class="image-button" onclick="deleteTask(${index})"><svg xmlns="http://www.w3.org/2000/svg"
                            x="0px" y="0px" width="30" height="30" margin-top="5px" viewBox="0 0 24 24">
                            <path
                                d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z">
                            </path>
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
    tasks[index].completed = true;
    const completedTask = tasks.splice(index, 1)[0];
    tasks.push(completedTask);
    updateList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateList();
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
        item.style.backgroundColor = index % 2 == 0 ? '#f3f6fd' : '#fff';
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