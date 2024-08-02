document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const timeInput = document.getElementById('time-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskTime = timeInput.value;
        if (taskText === '' || taskTime === '') {
            alert('Please enter a task and a time.');
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${taskText} - ${new Date(taskTime).toLocaleString()}</span>
            <div class="task-actions">
                <button class="complete" title="Mark as Completed"><i class="fas fa-check"></i></button>
                <button class="edit" title="Edit Task"><i class="fas fa-edit"></i></button>
                <button class="delete" title="Delete Task"><i class="fas fa-trash-alt"></i></button>
            </div>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = '';
        timeInput.value = '';

        const completeBtn = taskItem.querySelector('.complete');
        const editBtn = taskItem.querySelector('.edit');
        const deleteBtn = taskItem.querySelector('.delete');

        completeBtn.addEventListener('click', () => completeTask(taskItem));
        editBtn.addEventListener('click', () => editTask(taskItem));
        deleteBtn.addEventListener('click', () => deleteTask(taskItem));
    }

    function completeTask(taskItem) {
        taskItem.classList.toggle('completed');
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector('span').textContent.split(' - ')[0];
        const taskTime = taskItem.querySelector('span').textContent.split(' - ')[1];
        taskInput.value = taskText;
        timeInput.value = new Date(taskTime).toISOString().slice(0, 16);
        taskList.removeChild(taskItem);
    }

    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
    }
});
