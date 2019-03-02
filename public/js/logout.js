document.getElementById('back').addEventListener("click", (event) => {
    window.location.assign('/');
});

let responseField = document.getElementById('register-response');

document.getElementById('logout').addEventListener("click", (event) => {
    axios.delete('/logout')
        .then((response) => {
            toggleUI('Logged out successfully!',1000);
            //responseField.innerHTML = 'Logged out successfully';
            setTimeout(() => {
                window.location.assign('/');
            }, 1500);
        })
        .catch((err) => {
            responseField.innerHTML = err.response.data;
        });
});
