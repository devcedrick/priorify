class DateTimePicker{
    constructor(inputElement) {
        this.input = inputElement;
        this.dropdown = document.querySelector('.datetime-dropdown');
        this.currentDate = new Date();
        this.selectedDate = null;
        this.selectedTime = {
            hours: 12,
            minutes: 0,
            ampm: 'AM'
        };

        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.daysName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        this.init();
    }

    init(){
        this.populateCalendar();
        this.setupEventListener();
    }

    populateCalendar(){
        const grid = document.querySelector('.calendar-grid');
        const monthYear = document.querySelector('.month-year');
        grid.innerHTML = '';

        monthYear.textContent = `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        // populating days of the week
        for(let i=0; i<this.daysName.length; i++){
            const daysGrid = document.createElement('div');
            daysGrid.style.fontSize = '0.65rem';
            daysGrid.style.fontWeight = '700';
            daysGrid.style.border = '1px solid black';
            daysGrid.style.textAlign = 'center';
            daysGrid.style.padding = '3px'
            daysGrid.style.backgroundColor = '#44355b2e';
            daysGrid.style.border = 'none';

            daysGrid.textContent = `${this.daysName[i]}`;
            grid.appendChild(daysGrid);

            console.log('Testing 1!');
        }

        // populate days of the month
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0);
        const calStart = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1-firstDay.getDay());
        
        for(let i=0; i<42; i++){
            const day = new Date(calStart);
            day.setDate(calStart.getDate() + i);

            const daysGrid = document.createElement('button');
            daysGrid.classList.add('calendar-day');

            if(day.getMonth() != this.currentDate.getMonth()){
                daysGrid.classList.add('inactive-day');
            }

            if(day.getDate() === this.currentDate.getDate())
                daysGrid.classList.add('current-day');

            daysGrid.textContent = `${day.getDate()}`;
            grid.appendChild(daysGrid);
        }

    }

    setupEventListener(){
        document.querySelector('.datetime-picker-input').addEventListener('click', () => {
            this.showDropdown();
        });
    }

    // helper functions
    showDropdown(){
        this.dropdown.classList.add('show');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('datetimeInput');
    new DateTimePicker(input);
});