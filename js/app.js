const taskInput = document.querySelector('.js-task-input');
const datetimePicker = document.querySelector('.datetime-picker');
const fp = flatpickr(".datetime-picker", {
    enableTime: true,
    altInput: true,
    altFormat: "F j, Y (h:i K)",
    dateFormat: "Y-m-d H:i",
    time_24hr: false,
});

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
renderTasks();

function addTask(){
    if (validateForm()){
        taskInput.style.borderColor = 'black';

        tasks.push({
            name: taskInput.value,
            duedDate: fp.selectedDates[0]
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
            
        taskInput.value = '';
        fp.clear();
    }
    
}

const validateForm = () => {
    let isValid = true;

    const nameEmpty = document.querySelector('.task-error');
    const dateEmpty = document.querySelector('.date-error');

    // reset previous errors
    nameEmpty.classList.remove('visible');
    dateEmpty.classList.remove('visible');
    taskInput.style.borderColor = '';
    datetimePicker.style.borderColor = '';

    // check task name
    if (taskInput.value.trim() === '') {
        taskInput.style.border = '1px solid red';
        nameEmpty.classList.add('visible');
        isValid = false;
    }

    // check date selection
    if (fp.selectedDates.length === 0) {
        datetimePicker.style.border = '1px solid red';
        dateEmpty.classList.add('visible');
        isValid = false;
        console.log('No dates were selected!');
    }
    return isValid;
}

function renderTasks() {
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
        task.textContent = tasks[i].name + ' | ' + String(tasks[i].dueDate);

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
    renderTasks();
}

function handleKeyDown(event){
    if(event.key === 'Enter'){
        addTask();
    }
}