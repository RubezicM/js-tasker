
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
menuButton.addEventListener('click',function(e){
    
    nav.classList.toggle('opened');

    this.classList.toggle('checked');
});


//////// UI /////////

let setHeightOfMain = (()=>{
    let main = document.getElementById('main');

    if (main) {
        let mainHeight = window.innerHeight - main.offsetTop;
    
        main.style.height = mainHeight + 'px';
    }
})();

//////// ACTIVE PAGE NAVIGATION ///////
url;
page;

let navLinks = document.querySelectorAll(".header__nav .nav__item");
function check(){
    for(let i = 0; i < navLinks.length; i++){
        if(navLinks[i].dataset.page){
            if(navLinks[i].dataset.page === page){
                navLinks[i].classList.add("active");
            }
        }
        
    }
}

check();
