



///////// MECHANICS //////////

let taskResponse = 5;
let gameInProgress = false;
let answer = document.getElementById('answer');
let taskID;
let time = 30;
let comboField = document.getElementById('combo');
let startButton = document.getElementById('start');
let nextGameCountdownDiv = document.querySelector('.next-game-countdown');
let nextGameCounter;
//timeField.innerHTML = `Time left: ${time} seconds`;
//answer.value = '';

///// UI FOR TIMER /////
let timeLeft = document.getElementById('timeLeft');
let timer;
let stopTimer;


document.getElementById('form-game').addEventListener("submit", (event) => {
    event.preventDefault();
    if (!gameInProgress) {
        return alert('Start game first!');
    };
    stopTimer();
    time = 30;
    postAnswer();
});

startButton.addEventListener("click", startGame);


function startGame(){
    if (gameInProgress) {
        return alert('Finish current task first.');
    };
    time = 30;0
    gameInProgress = true;
    clearInterval(nextGameCounter);
    nextGameCountdownDiv.textContent = 4;
    nextGameCountdownDiv.style.display = 'none';
    UITimerReset();
    initializeTaskUI();
    
    answer.value = '';
    axios.post('/answer')
        .then((response) => {
            let taskFunction = response.data.function;
            let image = converter(taskFunction);
            let gameHolder = document.getElementById('game-area');
            taskID = response.data.taskID;
            taskResponse = response.data.result.trim();
            console.log(response.data.result);

            if (gameHolder.childElementCount > 0) {
                gameHolder.removeChild(gameHolder.firstChild);
            };
            gameHolder.appendChild(image);
        })
        .catch((err) => {
            document.getElementById('game-area').innerHTML = err;
        });
}

function postAnswer(message = '') {
    axios.post('/answer-send', {
        _id: taskID,
        result: answer.value
    }).then((response) => {
        if (response.data.correct) {
            correctAnswerScreen();
            // display overlay, bring back the button
            //alert(`${message}Correct answer!`);
        } else {
            wrongAnswerScreen();
    //alert(`${message}Wrong answer!`);
        };
        comboField.innerHTML = `Answers in a row: ${response.data.combo}`;
        gameInProgress = false;
        answer.value = '';
    }).catch((err) => {
        document.getElementById('game-area').innerHTML = err;
        gameInProgress = false;
        answer.value = '';
    });
}

