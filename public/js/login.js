document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let responseField = document.getElementById('login-response');

    console.log('username: ', username.value, 'password: ', password.value);

    axios.post('/login', {
        username: username.value,
        password: password.value
    })
        .then((response) => {
            responseField.innerHTML = 'Logged in successfully.';
            setTimeout(() => {
                window.location.assign('/main');
            }, 1000);
        })
        .catch((err) => {
            responseField.innerHTML = err.response.data;
        });
});