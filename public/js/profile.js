document.getElementById('delete-account').addEventListener("click", deleteAccount);

let responseField = document.getElementById('register-response');

function deleteAccount() {
    if (confirm('Delete account?')) {
        axios.delete('/users')
            .then((response) => {
                responseField.innerHTML = response.data.text;
                setTimeout(() => {
                    window.location.assign('/');
                }, 1000);
            })
            .catch((err) => {
                responseField.innerHTML = err.response.data;
            });
    };

};