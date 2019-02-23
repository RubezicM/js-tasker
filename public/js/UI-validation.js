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
}

let correctAnswerScreen = () => {
    let overlay = document.querySelector('.overlay');
    let gameStatus = document.querySelector('.game-status');
    let nextGameCountdownDiv = document.querySelector('.next-game-countdown');

    overlay.classList.remove('hidden');
    gameStatus.classList.remove('hidden');
    gameStatus.classList.add('show');
    gameStatus.textContent = `Correct answer!`;
    setTimeout(() => {
        let miniTimer = 4;
        gameStatus.classList.remove('show');
        gameStatus.classList.add('hidden');
        startButton.style.display = 'block';
        nextGameCounter = setInterval(() => {
            nextGameCountdownDiv.style.display = 'block';
            --miniTimer;
            if (miniTimer === 0 && gameInProgress === false) {
                startGame();
                nextGameCountdownDiv.textContent = 4;
                nextGameCountdownDiv.style.display = 'none';
            }
            if(gameInProgress === true){
                nextGameCountdownDiv.textContent = 4;
                nextGameCountdownDiv.style.display = 'none';
            }
            nextGameCountdownDiv.textContent = miniTimer;
        }, 1000);
    }, 1500)
}

let wrongAnswerScreen = () => {
    let overlay = document.querySelector('.overlay');
    let gameStatus = document.querySelector('.game-status');
    overlay.classList.remove('hidden');
    gameStatus.classList.remove('hidden');
    gameStatus.classList.add('show');
    gameStatus.textContent = `Wrong answer!`;
    setTimeout(() => {
        gameStatus.classList.remove('show');
        gameStatus.classList.add('hidden');
        startButton.style.display = 'block';
    }, 1500)

}


let initializeTaskUI = () => {
    let loader = document.querySelector('.loader');
    let overlay = document.querySelector('.overlay');

    startButton.style.display = 'none';
    timeLeft.innerHTML = time;
    loader.classList.remove('hidden');
    loader.classList.add('show');
    setTimeout(() => {
        loader.classList.remove('show');
        loader.classList.add('hidden');
        overlay.classList.add('hidden');
        startTimer(timeLeft, time);
    }, 1500)
}