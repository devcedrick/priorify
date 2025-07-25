class DateTimePicker{
    constructor(inputElement) {
        this.input = inputElement;
        this.dropdown = document.querySelector('.datetime-dropdown');
        this.currentDate = new Date(); // today
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
        this.updateTimeInputs();
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
        const today = new Date();

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
                daysGrid.disabled = true;
            }

            // highlight the day of this current date
            if(day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear())
                daysGrid.classList.add('current-day');

            if(this.selectedDate != null){
                if(day.getDate() === this.selectedDate.getDate() && day.getMonth() === this.selectedDate.getMonth() && day.getFullYear() === this.selectedDate.getFullYear())
                daysGrid.classList.add('selected');
            }

            daysGrid.dataset.date = day.toISOString();
            daysGrid.textContent = `${day.getDate()}`;

            grid.appendChild(daysGrid);
        }
    }

    setupEventListener(){
        document.querySelector('.datetime-picker-input').addEventListener('click', () => {
            this.showDropdown();
        });

        document.querySelector('.cancel-button').addEventListener('click', () => {
            this.hideDropdown();
        });

        const datetimeInput = document.querySelector('.datetime-picker-input');
        document.addEventListener('click', (e) => {
            if(!datetimeInput.contains(e.target) && !this.dropdown.contains(e.target)) {
                if (this.selectedDate) 
                    document.querySelector('.datetime-picker-input').value = this.formatDateTime();
                
                this.hideDropdown();
            }
        });

        // tab switching
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        document.querySelector('.affirmative-button').addEventListener('click', (e) => {
            if(e.target.textContent === 'Next'){
                this.switchTab('time');
            }
            else{
                if(this.selectedDate === null){
                    document.querySelector('.datetime-picker-input').classList.add('error');
                    return;
                } else {
                    document.querySelector('.datetime-picker-input').value = this.formatDateTime();
                    document.querySelector('.datetime-picker-input').classList.remove('error');
                }
                
                this.hideDropdown();
            }
        });

        // AM/PM toggling
        document.querySelector('.ampm-button').addEventListener('click', (e) =>  {
            const isAM = e.target.textContent === 'AM';
            e.target.textContent = isAM ? 'PM' : 'AM';
            e.target.classList.toggle('active');
            this.selectedTime.ampm = e.target.textContent;
        });
        
        // navigate through previous/next months
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.populateCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.populateCalendar();
        });

        // date selection
        document.querySelector('.calendar-grid').addEventListener('click', e => {
            if(e.target.classList.contains('calendar-day')){
                const day = e.target.dataset.date;
                this.selectDay(new Date(day), e)
            }
        });

        // time inputs
        document.getElementById('hour').addEventListener('input', (e) => {
            let value = parseInt(e.target.value);
            if (value < 1 || e.target.value === '') value = 1;
            if (value > 12) value = 12;
            e.target.value = value;
            this.selectedTime.hours = value;
        });
        
        document.getElementById('minute').addEventListener('input', (e) => {
            let value = parseInt(e.target.value);
            if (value < 0) value = 0;
            if (value > 59) value = 59;
            e.target.value = value.toString().padStart(2, '0');
            this.selectedTime.minutes = value;
        });
    }

    updateTimeInputs(){
        document.getElementById('hour').value = this.selectedTime.hours.toString();
        document.getElementById('minute').value = this.selectedTime.minutes.toString().padStart(2, '0');
        document.querySelector('.ampm-button').value = this.selectedTime.ampm;
    }

    // helper functions
    showDropdown(){
        document.querySelector('.datetime-picker-input').classList.add('dropdown-active');
        this.dropdown.classList.add('show');
        this.switchTab('date');

        document.querySelector('.datetime-picker-input').classList.add('focus');
    }

    hideDropdown() {
        document.querySelector('.datetime-picker-input').classList.remove('dropdown-active');
        this.dropdown.classList.remove('show');

        document.querySelector('.datetime-picker-input').classList.remove('focus');
    }

    switchTab(tabName) {
        // update tab button
        document.querySelectorAll('.tab-button').forEach(btn =>{
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        })

        // update calendar or time picker view
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.dataset.tab === tabName);
        });

        const affirmativeButton = document.querySelector('.affirmative-button');
        if(affirmativeButton.textContent === 'Next' && tabName === 'time') {
            affirmativeButton.textContent = 'Confirm';
        } else if (affirmativeButton.textContent === 'Confirm' && tabName === 'date') {
            affirmativeButton.textContent = 'Next';
        }
    }

    selectDay(date, e){
        this.selectedDate = date
        document.querySelectorAll('.calendar-day').forEach(btn => {
            btn.classList.remove('selected');
        });
        e.target.classList.add('selected');
        console.log(this.selectedDate);
    }

    formatDateTime(){
        const weekDayOptions = {
            weekday : 'short'
        };

        const dateOptions = {
            year : 'numeric',
            month : 'short',
            day : 'numeric'
        };  

        const weekdayStr = this.selectedDate.toLocaleDateString('en-US', weekDayOptions);

        const dateStr = this.selectedDate.toLocaleDateString('en-US', dateOptions);
        const timeStr = `${this.selectedTime.hours}:${this.selectedTime.minutes.toString().padStart(2, '0')} ${this.selectedTime.ampm}`;

        return `(${weekdayStr}) ${dateStr} at ${timeStr}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('datetimeInput');
    new DateTimePicker(input);
});