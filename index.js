 const form = document.querySelector('#task-form');
 const newTask = document.querySelector('#task');
 const filter = document.getElementById('filter');
 const taskList = document.querySelector('.collection');
 const clearBtn = document.querySelector('.clear-tasks');

loadEventListener();

function loadEventListener() {
    form.addEventListener('submit', addTask);
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
        newTask.value = '';
    }
    e.preventDefault();
}