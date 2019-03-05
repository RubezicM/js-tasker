let toggleUI = (msg, delay) => {
    let responseField = document.getElementById('form-response');
    let overlay = document.querySelector('.overlay');
    let loader = document.querySelector('.loader');
    let displayMsg = document.querySelector('.form-popup__message');

    overlay.classList.remove('hidden');
    overlay.classList.add("show");
    responseField.classList.remove("hidden");
    responseField.classList.add("show");
    setTimeout(() => {
        loader.classList.add("hidden");
        displayMsg.classList.remove("hidden");
        displayMsg.classList.add("show");
        displayMsg.innerHTML = msg;

    }, delay);
};

let correctAnswerScreen = () => {
    let overlay = document.querySelector('.overlay');
    let gameStatus = document.querySelector('.game-status');
    overlay.classList.remove('hidden');
    gameStatus.classList.remove('hidden');
    gameStatus.classList.add('show');
    gameStatus.innerHTML = `<i class="fas fa-check fw-600 tertiary-color-txt font-size-huge"></i><span class="block-disp font-size-big ">Correct answer!</span>`;
    setTimeout(() => {
        gameStatus.classList.remove('show');
        gameStatus.classList.add('hidden');
        startButton.style.display = 'block';
        startButton.nextElementSibling.style.display = 'block';
        let allItemsContainer = startButton.parentElement.parentElement.children;
        for (var i = 0; i < allItemsContainer.length; i++) {
            if (!allItemsContainer[i].classList.contains('loader') && !allItemsContainer[i].classList.contains('game-status')) {
                allItemsContainer[i].classList.remove('hidden');
                startButton.focus();
            };
        };
    }, 1500);
};

let wrongAnswerScreen = (response) => {
    let overlay = document.querySelector('.overlay');
    let gameStatus = document.querySelector('.game-status');
    let msg;
    if(response.length === 0){
        msg = "Time is up!"
    } else {
        msg = "Wrong answer!"
    };
    overlay.classList.remove('hidden');
    gameStatus.classList.remove('hidden');
    gameStatus.classList.add('show');
    gameStatus.innerHTML = `<i class="fas fa-times fw-600 secondary-color-txt font-size-huge"></i><span class="block-disp font-size-big ">${msg}</span>`;
    setTimeout(() => {
        gameStatus.classList.remove('show');
        gameStatus.classList.add('hidden');
        startButton.style.display = 'block';
        startButton.nextElementSibling.style.display = 'block';
        let allItemsContainer = startButton.parentElement.parentElement.children;
        for (var i = 0; i < allItemsContainer.length; i++) {
            if (!allItemsContainer[i].classList.contains('loader') && !allItemsContainer[i].classList.contains('game-status')) {
                allItemsContainer[i].classList.remove('hidden');
                startButton.focus();
            }}
    }, 1500);
};


let initializeTaskUI = () => {
    let loader = document.querySelector('.loader');
    let overlay = document.querySelector('.overlay');
    startButton.style.display = 'none';
    startButton.nextElementSibling.style.display = 'none';
    let allItemsContainer = startButton.parentElement.parentElement.children;
    for (var i = 0; i < allItemsContainer.length; i++) {
        if (!allItemsContainer[i].classList.contains('loader')) {
            allItemsContainer[i].classList.add('hidden');
        };
    };
    timeLeft.innerHTML = time;
    loader.classList.remove('hidden');
    loader.classList.add('show');
    setTimeout(() => {
        loader.classList.remove('show');
        loader.classList.add('hidden');
        overlay.classList.add('hidden');
        startTimer(timeLeft, time);
    }, 1500);
};