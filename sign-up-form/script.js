// assign js consts to the password and confirm password html fields
const password1 = document.getElementById('#password');
const password2 = document.getElementById('#confirmPassword');

// criteria: min 8 chars, 1 of each: uppercase, lowercase, symbol, number
const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

// validate that passwords match via regex
function regexValidate(password1, password2) {
    console.log(password1, password2)
    if (!regexPassword.test(password1)) {
        return false;
    }
    if (!regexPassword.test(password2)) {
        return false;
    }
    if (password1 !== password2) {
        return false;
    } else if (password1 === password2) {
        return true;
    }
}

regexValidate(password1, password2)