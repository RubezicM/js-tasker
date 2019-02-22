let usernameField = document.getElementById('username');
let passwordField = document.getElementById('password');
let emailField = document.getElementById('email');
let responseField = document.getElementById('form-response');

usernameField.addEventListener('keyup', checkIfAvilable.bind(this, 'Username'));
emailField.addEventListener('keyup', checkIfAvilable.bind(this, 'Email'));

document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();

    axios.post('/users', {
        username: usernameField.value,
        email: emailField.value,
        password: passwordField.value
    })
        .then((response) => {
            responseField.innerHTML = 'Registered successfully.';
            setTimeout(() => {
                window.location.assign('/main');
            }, 1000);
        })
        .catch((err) => {
            responseField.innerHTML = err.response.data;
        });
});

function checkIfAvilable(type) {
    let value = (type === 'Username') ? usernameField.value : emailField.value;
    let oposingType = (type === 'Username') ? 'Email' : 'Username';

    axios.get(`/users/check-${type.toLowerCase()}/${value}`)
        .then((response) => {
            if (response.data) {
                document.querySelector(`label[for='${type.toLowerCase()}']`).innerHTML = `${type}: IN USE`;
                document.getElementById('submit').setAttribute('disabled', true);
            } else {
                if (document.querySelector(`label[for='${oposingType.toLowerCase()}']`).innerHTML === `${oposingType}: OK`) {
                    document.getElementById('submit').removeAttribute('disabled', false);
                };
                document.querySelector(`label[for='${type.toLowerCase()}']`).innerHTML = `${type}: OK`;
            }
        }).catch((err) => {
        });
};