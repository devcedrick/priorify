class Main{
    constructor(){
        this._userData = JSON.parse(localStorage.getItem('userData'));
        
        this.init();
    }

    init(){
        if(this._userData === null){
            document.querySelector('.name-modal-backdrop').style.display = 'flex';
        } else {
            document.querySelector('.name-modal-backdrop').style.display = 'none';
        }

        this.setupEventListeners();
        this.updateName();
        
        //localStorage.removeItem('userData');
    }

    setupEventListeners(){
        if (this._userData === null) 
            this.askUserName();
    }

    // helper functions
    askUserName(){
        const modalConfirm = document.querySelector('.confirm-modal-button');
        const nameInput = document.querySelector('.nickname-input');

        const userData = {
            name: '',
            projects: []
        };

        const handleSubmit = () => {
            if(!nameInput) return;

            const name = nameInput.value.trim();
            if(name) {
                userData.name = name;
                this._userData = userData;
                localStorage.setItem('userData', JSON.stringify(userData));
                document.querySelector('.name-modal-backdrop').style.display = 'none';
            } 
            else
                alert('Please enter name');
        };

        modalConfirm.addEventListener('click', () => handleSubmit());
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Enter')
                handleSubmit();
        });
        
    }

    updateName(){
        document.querySelector('.user-name').textContent = this._userData.name;
    }

    confirmName(userObj, name) {
        userObj.name = name;
        localStorage.setItem('userData', JSON.stringify(userObj));
        this.userData = userObj;
        document.querySelector('.name-modal-backdrop').style.display = 'none';
        console.log(name);
    }

    
}

document.addEventListener('DOMContentLoaded', () => {
    new Main();
});