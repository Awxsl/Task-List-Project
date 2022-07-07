 const form = document.querySelector('#task-form');
 const newTask = document.querySelector('#task');
 const filter = document.getElementById('filter');
 const taskList = document.querySelector('.collection');
 const clearBtn = document.querySelector('.clear-tasks');

loadEventListener();

function loadEventListener() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearList);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks(e) {
    let tasks; 
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}


function addTask(e) {
    if(newTask.value === '') {
        alert('Please add a task!');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(newTask.value));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
        storeTaskInLocalStorage(newTask.value);
        newTask.value = '';
    }
    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks; 
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
    tasks.push(task);
    localStorage.setItem('tasks' , JSON.stringify(tasks)); 
}

function removeTask(e) {
    if(e.target.classList.contains('fa')) {
        if(confirm('ARE YOU SURE ABOUT THAT?!')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(task) {
    let tasks; 
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.forEach(function(taskItem, index) {
        if(task.textContent === taskItem) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function clearList(e) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}