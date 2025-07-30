export const validateForm = () => {
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