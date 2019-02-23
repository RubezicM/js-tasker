document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let username = document.getElementById('username');
    let password = document.getElementById('password');


    console.log('username: ', username.value, 'password: ', password.value);

    axios.post('/login', {
            username: username.value,
            password: password.value
        })
        .then((response) => {
            toggleUI('Logged in successfuly!',2500);
            setTimeout(() => {
                window.location.assign('/main');
            }, 3500)
        })
        .catch((err) => {
            let userMessage = err.response.data;
            toggleUI(userMessage,2500);
            setTimeout(() => {
                window.location.assign('/login');
            }, 3500)
        });
});