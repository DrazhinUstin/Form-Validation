const setupForm = () => {

    const form = document.querySelector('.form-body');
    const inputs = [...document.querySelectorAll('.form-input')];
    let errors = 0;

    form.addEventListener('submit', event => {
        event.preventDefault();
        errors = 0;
        inputs.forEach(input => {
            checkInput(input);
        });
        if (errors) return;
        form.innerHTML = '<p class="success">Thank you for registering!</p>';
    });

    inputs.forEach(input => {
        input.addEventListener('change', () => checkInput(input));
    });

    const checkInput = (input) => {
        const value = input.value.trim();
        const id = input.id;
        if (!value) {
            displayError(input, 'This field is required!');
            return;
        }
        switch (id) {
            case 'username':
                checkUsername(input, value);
                break;
            case 'email':
                checkEmail(input, value);
                break;
            case 'password':
                checkPassword(input, value);
                break;
            case 'confirm-password':
                confirmPassword(input, value);
                break;                          
        }
    };

    const checkUsername = (input, value) => {
        const re = /^[a-zA-Z0-9]+$/;
        if (!re.test(value)) displayError(input, 'Must be only a-z, A-Z and 0-9 symbols!');
        else if (value.length < 6 || value.length > 20) displayError(input, 'Must be at least 6 and no more than 20 symbols!');
        else displaySuccess(input);
    };

    const checkEmail = (input, value) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(value)) displayError(input, 'Not valid email!');
        else displaySuccess(input);
    };

    const checkPassword = (input, value) => {
        const re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
        if(!re.test(value)) displayError(input, 'Only a-z, A-Z, 0-9 symbols and at least one number and one letter!');
        else if (value.length < 8 || value.length > 30) displayError(input, 'Must be at least 8 and no more than 30 symbols!');
        else displaySuccess(input);
    };

    const confirmPassword = (input, value) => {
        const password = inputs.find(input => input.id === 'password').value.trim();
        if (password !== value) displayError(input, 'Password not confirmed!');
        else displaySuccess(input);
    };

    const displayError = (input, message) => {
        const parent = input.parentElement.parentElement;
        parent.lastElementChild.textContent = message;
        parent.classList.remove('valid');
        parent.classList.add('invalid');
        errors++;
    };

    const displaySuccess = (input) => {
        const parent = input.parentElement.parentElement;
        parent.lastElementChild.textContent = '';
        parent.classList.remove('invalid');
        parent.classList.add('valid');
    };

};

setupForm();