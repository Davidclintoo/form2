const firstNameEl = document.querySelector('#first_name');
const secondnameEl=document.querySelector('#second_name')
const emailEl = document.querySelector('#email')
const passwordEl=document.querySelector('#password')
const formEl=document.querySelector('#signup')









const checkFirstname = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const first_name = firstNameEl.value.trim();

    if (!isRequired(first_name)) {
        showError(firstNameEl, 'First name cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(firstNameEl, `First name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
};


const checkSecondname = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const second_name = secondnameEl.value.trim();

    if (!isRequired(second_name)) {
        showError(secondnameEl, 'Second name cannot be blank.');
    } else if (!isBetween(second_name.length, min, max)) {
        showError(secondnameEl, `Second name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(secondnameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};



const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isfirst_nameValid = checkFirstname(),
        issecond_nameValid=checkSecondname(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword()

    let isFormValid = isfirst_nameValid &&
        issecond_nameValid &&
        isEmailValid &&
        isPasswordValid 

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'first_name':
            checkFirstname();
            break;
        case 'second_name':
            checkSecondname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        
    }
}));