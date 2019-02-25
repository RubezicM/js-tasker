///////// NAVIGATION FOR HEADER///////////

let profileMainItemContainer = document.querySelector('.profile-has-dropdown');
let profileDropdownContainer = document.querySelector('#profile-dropdown');
let userWidgetMainItemContainer = document.querySelector('.userWidget-has-dropdown');
let userWidgetDropdownContainer = document.querySelector('#userWidget-dropdown');

// setting size 

let changeDropdownPosition = (()=>{
    let profileMainH = profileMainItemContainer.offsetHeight;
    let userWidgetMainH = userWidgetMainItemContainer.offsetHeight;
    profileDropdownContainer.style.top = profileMainH + "px";
    userWidgetDropdownContainer.style.top = userWidgetMainH + "px";
})();


profileMainItemContainer.addEventListener('mouseenter',(e)=>{
    profileDropdownContainer.style.display = "block";
});

profileMainItemContainer.addEventListener('mouseleave',(e)=>{
    profileDropdownContainer.style.display = "none";
});

userWidgetMainItemContainer.addEventListener('mouseenter',(e)=>{
    userWidgetDropdownContainer.style.display = "block";
});

userWidgetMainItemContainer.addEventListener('mouseleave',(e)=>{
    userWidgetDropdownContainer.style.display = "none";
});

//////// UI /////////

let setHeightOfMain = (()=>{
    let main = document.getElementById('main');

    if (main) {
        let mainHeight = window.innerHeight - main.offsetTop;
    
        main.style.height = mainHeight + 'px';
    }
})();
