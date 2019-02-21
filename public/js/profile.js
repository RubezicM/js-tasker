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

document.getElementById('update-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let username = document.getElementById('username');
    let email = document.getElementById('email');
    let responseField = document.getElementById('update-response');

    let body = {};
    if (email.value) {
        body.email = email.value;
    };
    if (username.value) {
        body.username = username.value;
    };

    axios.patch('/users', body)
        .then((response) => {
            responseField.innerHTML = 'Updated successfully.';
            setTimeout(() => {
                window.location.assign('/profile');
            }, 1000);
        })
        .catch((err) => {
            responseField.innerHTML = err.response.data;
        });
});

document.getElementById('update-password').addEventListener('submit', (event) => {
    event.preventDefault();

    let oldPassword = document.getElementById('old-password');
    let newPassword = document.getElementById('new-password');
    let responseField = document.getElementById('update-response');

    let body = { oldPassword: oldPassword.value, newPassword: newPassword.value };

    axios.patch('/users/password', body)
        .then((response) => {
            responseField.innerHTML = 'Password updated successfully.';
            setTimeout(() => {
                window.location.assign('/profile');
            }, 1000);
        })
        .catch((err) => {
            responseField.innerHTML = err.response.data;
        });
});