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
    let handler;
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
let loader = document.querySelector('.loader');

for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener('click', toggler);
}

function toggler(event) {
    let allBtns = document.querySelectorAll('.selected');
    for (let y = 0; y < allBtns.length; y++) {
        allBtns[y].classList.remove('selected');
    }
    event.currentTarget.classList.add('selected');
    let name = event.currentTarget.children[0].id;
    let tab = document.querySelector(`.${name}`);
    let allDivs = tab.parentElement.children;
    for(let k = 0; k < allDivs.length; k++){
        if(allDivs[k].classList.contains('custom-scroll')){
            allDivs[k].classList.remove('active');
            allDivs[k].style.display = 'none';
        }
        
    }
    tab.style.display = "block";
    showLoader().then(() => {
        tab.classList.add('active');
    }).then(()=>{
        for (let i = 0; i < tabLinks.length; i++) {
            tabLinks[i].addEventListener('click', toggler);
        }
    })
    
}

function showLoader() {
    for (var k = 0; k < tabLinks.length; k++) {
        tabLinks[k].removeEventListener("click",toggler)
    }
    return new Promise((resolve, reject) => {
        
        loader.classList.remove('hidden');
        setTimeout(() => {
            loader.classList.add('hidden');
            resolve('Stuff worked');
        }, 750);
    });
}
