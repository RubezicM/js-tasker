
///////// MECHANICS //////////

let gameInProgress = false;
let answer = document.getElementById('answer');
let taskID;
let time = 30;
let comboField = document.getElementById('combo');
let startButton = document.getElementById('start');
let nextGameCountdownDiv = document.querySelector('.next-game-countdown');
let xpField = document.getElementById('player-xp');
let percentageField = document.getElementById('player-basic-percentage');
let attemptedField = document.getElementById('player-basic-attempts');
let bestComboField = document.getElementById('player-best-combo');
let answerConsole = document.getElementById('form-game');
let nextGameCounter;

///// UI FOR TIMER /////
let timeLeft = document.getElementById('timeLeft');
let timer;
let stopTimer;

answerConsole.style.display = 'none';
startButton.focus();

document.getElementById('form-game').addEventListener("submit", (event) => {
    event.preventDefault();
    if (!gameInProgress) {
        return alert('Start game first!');
    };
    stopTimer();
    postAnswer();
});

startButton.addEventListener("click", startGame);


function startGame() {
    if (gameInProgress) {
        return alert('Finish current task first.');
    };
    answerConsole.style.display = 'flex';
    time = 30;
    gameInProgress = true;
    clearInterval(nextGameCounter);
    nextGameCountdownDiv.textContent = 4;
    nextGameCountdownDiv.style.display = 'none';
    UITimerReset();
    initializeTaskUI();
    answer.focus();
    answer.value = '';
    axios.post('/answer')
        .then((response) => {
            let taskFunction = response.data.function;
            let image = converter(taskFunction);
            let gameHolder = document.getElementById('game-area');
            taskID = response.data.taskID;

            if (gameHolder.childElementCount > 0) {
                gameHolder.removeChild(gameHolder.firstChild);
            };
            gameHolder.appendChild(image);
            answerConsole.style.display = 'flex';
        })
        .catch((err) => {
            console.log(err);
        });
}

function postAnswer(message = '') {
    answerConsole.style.display = 'none';
    axios.post('/answer-send', {
        _id: taskID,
        result: answer.value
    }).then((response) => {
        if (response.data.correct) {
            correctAnswerScreen();
        } else {
            wrongAnswerScreen(answer.value);
        };
        comboField.innerHTML = `Answers in a row: ${response.data.combo}`;
        bestComboField.innerHTML = response.data.bestCombo;
        xpField.innerHTML = response.data.xp;
        percentageField.innerHTML = response.data.percentage + '%';
        attemptedField.innerHTML = response.data.attempted;
        gameInProgress = false;
        answer.value = '';

    }).catch((err) => {
        gameInProgress = false;
        answer.value = '';
    });
}


let exitBtn = document.getElementById("exit");
exitBtn.addEventListener('click', function (e) {
    window.location.assign('/');
});



let setHeightOfGameArea = (() => {
    let gameArea = document.querySelector('.main.game-page');
    if (gameArea) {
        if (window.innerHeight > 845) {
            let mainHeight = window.innerHeight - main.offsetTop;

            main.style.height = mainHeight + 'px';
        }

    }
})();