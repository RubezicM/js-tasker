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
let userwidgetLinks = document.querySelectorAll('.side-menu')
let tabs = document.querySelectorAll('.tab');
let loader = document.querySelector('.loader');
let accordion = document.querySelectorAll('.accordion__button');
for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener('click', toggler);
}

function toggler(event) {
    let allBtns = document.querySelectorAll('.selected');
    for (let y = 0; y < allBtns.length; y++) {
        allBtns[y].classList.remove('selected');
    }
    if (event) {

    }
    event.currentTarget.classList.add('selected');
    let name = event.currentTarget.children[0].id;
    let tab = document.querySelector(`.${name}`);
    let allDivs = tab.parentElement.children;
    for (let k = 0; k < allDivs.length; k++) {
        if (allDivs[k].classList.contains('custom-scroll')) {
            allDivs[k].classList.remove('active');
            allDivs[k].style.display = 'none';
        }
    }
    tab.style.display = "block";
    accordion = document.querySelectorAll('.accordion__button');
    showLoader().then(() => {
        tab.classList.add('active');
    }).then(() => {
        for (let i = 0; i < tabLinks.length; i++) {
            tabLinks[i].addEventListener('click', toggler);
        }
    })
    if (accordion) {
        for (let i = 0; i < accordion.length; i++) {
            accordion[i].addEventListener('click', function () {
                this.classList.toggle('active');
                let panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
    }
}

function showLoader() {
    for (var k = 0; k < tabLinks.length; k++) {
        tabLinks[k].removeEventListener("click", toggler)
    }
    return new Promise((resolve, reject) => {

        loader.classList.remove('hidden');
        setTimeout(() => {
            loader.classList.add('hidden');
            resolve('Stuff worked');
        }, 750);
    });
}


/////// HISTORY TAB /////////
let history = document.querySelector('.history__list');


axios.get('answers').then((response) => {
    let tasks = response.data;
    tasks.forEach((task) => {
        let validation = task.correct === true ? "CORRECT" : "WRONG";
        let txtColor = task.correct === true ? "tertiary-color-txt" : "secondary-color-txt";
        //let borderColor = task.correct === true ? "tertiary-color-border":"secondary-color-border";
        history.innerHTML += `
            <div class="accordion__button flex-disp"><div>${task.createdAt}</div><div class="${txtColor}">${validation}</div><i class="fas fa-angle-double-down"></i></div>
            <div class="accordion__body">
                <table class="table-history">
                    <thead>
                    <tr>
                    <th colspan="2" class="table-history__header">Assigment details:</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td>Function:</td>
                    <td><pre>${task.function}</pre></td>
                    </tr>
                    <tr>
                    <td>Result:</td>
                    <td>${task.result}</td>
                    </tr>
                    <tr>
                    <td>Status:</td>
                    <td><span class="${txtColor}">${validation}</span></td>
                    </tr>
                    <tr>
                    <td>Date:</td>
                    <td>${task.createdAt}</td>
                    </tr>
                    </tbody>
                </table>
            </div>`;
        // `<p><pre>Function:\n${task.function}Result:${task.result}\nStatus:${task.correct}\nDate: ${task.createdAt}</pre></p><hr>`;
    })
}).catch((err) => {
    history.innerHTML = err;
});
var url = location.href.split('/');
var page = url[url.length - 1];

//////// DISPLAY PROFILE-EDIT OR HISTORY ////////
console.log(tabLinks);
for (let i = 0; i < tabLinks.length; i++) {
    console.log(tabLinks[i])
    tabLinks[i].classList.remove('selected');
    
    if (tabLinks[i].firstElementChild.id === page) {
        tabLinks[i].classList.add('selected');
        var tab = document.querySelector(`.${page}`);
        let allDivs = tab.parentElement.children;
        for (let k = 0; k < allDivs.length; k++) {
            if (allDivs[k].classList.contains('custom-scroll')) {
                allDivs[k].classList.remove('active');
                allDivs[k].style.display = 'none';
            }
        }
        tab.style.display = "block";
        tab.classList.add('active');
    }
}

/////////
