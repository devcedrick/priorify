function getTasksFromStorage(){
    try{
        const storedTask = localStorage.getItem('tasks');
        if(!storedTask) return [];

        const parsed = JSON.parse(storedTask);

        if(Array.isArray(parsed))
            return parsed;
        else   
            return [];
    } catch (error) {
        console.error('Error parsing task  from localStorage:', error);
        return [];
    }
}

const tasks = getTasksFromStorage();
displayTasks();

function addTask(){
    const taskInput = document.querySelector('.js-task-input');
    const taskName = taskInput.value.trim();

    const inputError = document.querySelector('.input-error');
    if (taskName === ''){
        inputError.classList.add('visible');
        taskInput.style.borderColor = 'red';
        return;
    }
    inputError.classList.remove('visible');
    taskInput.style.borderColor = 'black';

    tasks.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
        
    taskInput.value = '';
}

function displayTasks() {
    const container = document.querySelector('.tasks-div');
    container.innerHTML = '';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'flex-start';
    container.style.justifyContent = 'flex-start';
    container.style.overflow = 'auto';

    if (tasks.length === 0){
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.overflow = 'hidden';

        const text = document.createElement('p');
        text.textContent = 'What a Chill Day!';
        text.style.fontSize = '4rem';
        text.style.color = 'gray';
        container.appendChild(text);
    }

    for (let i=0; i<tasks.length; i++){
        const task = document.createElement('p');
        task.textContent = tasks[i];

        // Delete Button 
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.padding = '0.3rem 0.5rem';
        deleteButton.style.margin = ' 0 1rem';
        deleteButton.onclick = () => deleteTask(i);

        task.appendChild(deleteButton);
        container.appendChild(task);
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function handleKeyDown(event){
    if(event.key === 'Enter'){
        addTask();
    }
}