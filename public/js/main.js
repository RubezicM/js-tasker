let taskResponse = 5;
let game = false;
let answer = document.getElementById('answer');
let taskID;
answer.value = '';

document.getElementById('form-game').addEventListener("submit", (event) => {
    event.preventDefault();
    if (!gameInProgress) {
        return alert('Start game first!');
    };
    axios.post('/answer-send', {
        _id: taskID,
        result: answer.value
    }).then((response) => {
        if (response.data.correct) {
            alert('Correct!');
        } else {
            alert('Wrong!');
        };
        gameInProgress = false;
        answer.value = '';
    }).catch((err) => {
        document.getElementById('game-area').innerHTML = err;
        gameInProgress = false;
        answer.value = '';
    });
});

document.getElementById('start').addEventListener("click", (event) => {
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
