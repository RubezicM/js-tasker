document.getElementById('login-form').addEventListener('submit', (event) => {

    event.preventDefault();

    let username = document.getElementById('username');
    let password = document.getElementById('password');

    axios.post('/login', {
            username: username.value,
            password: password.value
        })
        .then((response) => {
            username.disabled = true;
            password.disabled = true;
            event.target[2].disabled = true;
            toggleUI('Logged in successfuly!',1000);
            setTimeout(() => {
                window.location.assign('/');
            }, 1500)
        })
        .catch((err) => {
            let userMessage = err.response.data;
            username.disabled = true;
            password.disabled = true;
            event.target[2].disabled = true;
            toggleUI(userMessage,1000);
            setTimeout(() => {
                window.location.assign('/login');
            }, 1500)
        });
});