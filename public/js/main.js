window.addEventListener('resize', function(event){
    let main = document.getElementById('main');
    console.log(window.innerHeight);
    if (main && !main.classList.contains("game-page")) {
        let mainHeight = window.innerHeight - main.offsetTop;

        main.style.height = mainHeight + 'px';
    }
  });
//////////// RESPONSIVE NAVIGATION ////////////
let menuButton = document.getElementById('menuToggle');
let nav = document.querySelector('.nav');
if (menuButton) {
    menuButton.addEventListener('click', function (e) {

        nav.classList.toggle('opened');

        this.classList.toggle('checked');
    });
}



//////// UI /////////

let setHeightOfMain = (() => {
    let main = document.getElementById('main');

    if (main && !main.classList.contains("game-page")) {
        let mainHeight = window.innerHeight - main.offsetTop;

        main.style.height = mainHeight + 'px';
    }
})();

//////// ACTIVE PAGE NAVIGATION ///////

    var pageUrl = location.href.split('/');
    var pageLink = pageUrl[pageUrl.length - 1];



let navLinks = document.querySelectorAll(".header__nav .nav__item");

function checkActivePage() {
    for (let i = 0; i < navLinks.length; i++) {
        if (navLinks[i].dataset.page) {
            if (navLinks[i].dataset.page === pageLink) {
                navLinks[i].classList.add("active");
            }
        }

    }
}

checkActivePage();


let playgroundBtn = document.getElementById("playgroundBtn");
let overlayMain = document.querySelector('.overlay');
let loaderMain = document.querySelector('.loader-main');
let message = document.querySelector('.overlay__message');
console.log(overlayMain,loaderMain);

if(playgroundBtn){
    playgroundBtn.addEventListener('click',function(e){
        e.preventDefault();
        overlayMain.classList.remove('hidden');
        loaderMain.classList.remove('hidden');
        let messages = ["Please wait","Refactoring","Clearing floats","Declaring globals"]
        setInterval(()=>{
            console.log('yes')
            if(messages.length > 0){
                
                message.innerHTML = messages[messages.length - 1];
                messages.pop();
            }
        },250);
        setTimeout(()=>{
            
            window.location.assign('/main');
        },1100);
        
    })
};

////////////////////////////////

let consoleBox = document.getElementById('code');

let writeTime = 50;

let string = `
gg();
*`;

if (document.getElementById('hero')) {
    string = `
    Welcome to JS Tasker!^
    Register or Login to begin.^
    Good luck!*
    `;
    writeTime = 20;
};

if (document.getElementById('user-here') && !document.getElementById('start')) {
    string = `
    Thank you for playing with us.^
    Select Playground to play.^
    Look in Profile for stats.^
    Go to Highscores to see standings.*
    `;
    writeTime = 15;
};

consoleBox.innerHTML = '';

writeCode(string);

function writeCode(string) {
    for (let i = 0; i < string.length; i++) {

        setTimeout(() => {
            addCharacter(string[i]);
        }, i * writeTime);
    };

    function addCharacter(character) {
        if (character === '^') {
            character = '<br>';
        };
        if (character === '*') {
            setTimeout(() => {
                consoleBox.innerHTML = '';
                writeCode(string);
            }, 30000);
        } else {
            consoleBox.innerHTML += character;
        };
    };
};
