document.getElementById('back').addEventListener("click", (event) => {
    window.location.assign('/main');
});

let responseField = document.getElementById('register-response');

document.getElementById('logout').addEventListener("click", (event) => {
    axios.delete('/logout')
        .then((response) => {
            responseField.innerHTML = 'Logged out successfully';
            setTimeout(() => {
                window.location.assign('/');
            }, 1000);
        })
        .catch((err) => {
            responseField.innerHTML = err.response.data;
        });
});
