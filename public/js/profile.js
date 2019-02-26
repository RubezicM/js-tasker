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

    let body = {
        oldPassword: oldPassword.value,
        newPassword: newPassword.value
    };

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

///////// TAB switching logic ////////

let tabLinks = document.querySelectorAll('.side-menu__link');
let tabs = document.querySelectorAll('.tab');

for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener('click', (e) => {
        for (let y = 0; y < tabLinks.length; y++) {
            tabLinks[y].classList.remove('selected');
        }
        for (let k = 0; k < tabs.length; k++) {
            tabs[k].classList.remove('active');
        }
        tabLinks[i].classList.add('selected');
        let name = tabLinks[i].children[0].id;
        let tab = document.querySelector(`.${name}`);
        if (i == 0) {
            setTimeout(() => {
                tab.nextElementSibling.style.display = "none"
            }, 1)
            //tab.nextElementSibling.classList.add('hidden');
        } else {
            setTimeout(() => {
                tab.previousElementSibling.style.display = "none"
            }, 1)
            tab.previousElementSibling.classList.remove('active');
            //tab.previousElementSibling.classList.add('hidden');
        }
        console.log(tab)
        //tab.classList.remove('hidden');

        setTimeout(() => {
            tab.style.display = "block";
            tab.classList.add('active');
        }, 1)


    });
}