//////// UI /////////


let main =document.getElementById('main');

if(main){
    let mainHeight = window.innerHeight - main.offsetTop;

    main.style.height = mainHeight + 'px';
}


///////// MECHANICS //////////

let taskResponse = 5;
let gameInProgress = false;
let answer = document.getElementById('answer');
let taskID;
let timeField = document.getElementById('timer');
let time = 30;
let comboField = document.getElementById('combo');

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
});

document.getElementById('start').addEventListener("click", (event) => {
    if (gameInProgress) {
        return alert('Finish current task first.');
    };

    canvasReset();
    timeLeft.innerHTML = time;
    startTimer(timeLeft,time);

    gameInProgress = true;
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
});


// function timer() {
//     if (time === 0) {
//         clearInterval(setTime);
//         time = 30;
//         postAnswer('Times up! ');
//     } else {
//         --time;
//     };

//     timeField.innerHTML = `Time left: ${time} seconds`;
// };

// function resetTimer() {
//     if (time === 0) {
//         clearInterval(setTime);
//         time = 30;
//         postAnswer('Times up! ');
//     } else {
//         --time;
//     };
// };
function postAnswer(message = '') {
    axios.post('/answer-send', {
        _id: taskID,
        result: answer.value
    }).then((response) => {
        if (response.data.correct) {
            alert(`${message}Correct answer!`);
        } else {
            alert(`${message}Wrong answer!`);
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

