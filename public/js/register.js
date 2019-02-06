document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let responseField = document.getElementById('register-response');

    console.log('username: ', username.value, 'password: ', password.value);

    axios.post('/users', {
        username: username.value,
        password: password.value
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