// ///////// NAVIGATION FOR HEADER ~~~ Dropdowns///////////
// let profileMainItemContainer = document.querySelector('.profile-has-dropdown');
// let profileDropdownContainer = document.querySelector('#profile-dropdown');
// let userWidgetMainItemContainer = document.querySelector('.userWidget-has-dropdown');
// let userWidgetDropdownContainer = document.querySelector('#userWidget-dropdown');

// // setting size 

// let changeDropdownPosition = (()=>{
//     let profileMainH = profileMainItemContainer.offsetHeight;
//     if(userWidgetMainItemContainer){
//         let userWidgetMainH = userWidgetMainItemContainer.offsetHeight;
//         userWidgetDropdownContainer.style.top = userWidgetMainH + "px";
//     };
//     profileDropdownContainer.style.top = profileMainH + "px";

// })();


// profileMainItemContainer.addEventListener('mouseenter',(e)=>{
//     profileDropdownContainer.style.display = "block";
// });

// profileMainItemContainer.addEventListener('mouseleave',(e)=>{
//     profileDropdownContainer.style.display = "none";
// });

// if(userWidgetMainItemContainer){
//     userWidgetMainItemContainer.addEventListener('mouseenter',(e)=>{
//         userWidgetDropdownContainer.style.display = "block";
//     });

//     userWidgetMainItemContainer.addEventListener('mouseleave',(e)=>{
//         userWidgetDropdownContainer.style.display = "none";
//     });
// }

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

    if (main) {
        let mainHeight = window.innerHeight - main.offsetTop;

        main.style.height = mainHeight + 'px';
    }
})();

//////// ACTIVE PAGE NAVIGATION ///////

    var pageUrl = location.href.split('/');
    var pageLink = pageUrl[pageUrl.length - 1];



let navLinks = document.querySelectorAll(".header__nav .nav__item");

function check() {
    for (let i = 0; i < navLinks.length; i++) {
        if (navLinks[i].dataset.page) {
            if (navLinks[i].dataset.page === pageLink) {
                navLinks[i].classList.add("active");
            }
        }

    }
}

check();


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
        },1500);
        setTimeout(()=>{
            
            window.location.assign('/main');
        },7000)
        
    })
};

////////////////////////////////

let consoleBox = document.getElementById('code');

let string = `
var rubor = [ "bar",  "qux", "henk",  8];

    rubor.reverse();

    var cons = {
      natum: function () {
        return rubor.push(this.dolor[0])
      },
      dolor: rubor[3],
      semper: function () {
          this.sit++;
          return this.sit - this.dolor;
      },
      sit: 4,
    };

    cons.natum();

    return (cons.dolor);

    cons.natum();
*`;

consoleBox.innerHTML = '';

writeCode(string);

function writeCode(string) {
    for (let i = 0; i < string.length; i++) {

        setTimeout(() => {
            addCharacter(string[i]);
        }, i * 50);
    };

    function addCharacter(character) {
        if (character === ';') {
            character = ';<br>';
        };
        if (character === '*') {
            setTimeout(() => {
                consoleBox.innerHTML = '';
                writeCode(string);
            }, 1500);
        } else {
            consoleBox.innerHTML += character;
        };
    };
};
