let proba = document.querySelector('.proba');

if(proba){
    let probaHeight = window.innerHeight - proba.offsetTop;

    proba.style.minHeight = probaHeight + 'px';
    console.log(proba.offsetTop,window.innerHeight);
}

let taskResponse = 5;
let gameInProgress = false;
let answer = document.getElementById('answer');
let taskID;
let timeField = document.getElementById('timer');
let time = 30;
let setTime;
let comboField = document.getElementById('combo');
//timeField.innerHTML = `Time left: ${time} seconds`;
//answer.value = '';

document.getElementById('form-game').addEventListener("submit", (event) => {
    event.preventDefault();
    if (!gameInProgress) {
        return alert('Start game first!');
    };

    clearInterval(setTime);
    time = 30;
    postAnswer();
    timeField.innerHTML = `Time left: ${time} seconds`;
});

document.getElementById('start').addEventListener("click", (event) => {
    if (gameInProgress) {
        return alert('Finish current task first.');
    };

    setTime = setInterval(timer, 1000);

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


function timer() {
    if (time === 0) {
        clearInterval(setTime);
        time = 30;
        postAnswer('Times up! ');
    } else {
        --time;
    };

    timeField.innerHTML = `Time left: ${time} seconds`;
};

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

