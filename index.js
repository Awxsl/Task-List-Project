 const form = document.querySelector('#task-form');
 const newTask = document.querySelector('#task');
 const filter = document.getElementById('filter');
 const taskList = document.querySelector('.collection');
 const clearBtn = document.querySelector('.clear-tasks');

loadEventListener();

function loadEventListener() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearList);
    filter.addEventListener('keyup', filterTasks);
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

function removeTask(e) {
    if(e.target.classList.contains('fa')) {
        if(confirm('ARE YOU SURE ABOUT THAT?!')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

function clearList(e) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
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