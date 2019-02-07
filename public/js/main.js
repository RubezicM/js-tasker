let taskResponse = 5;
let game = false;
let answer = document.getElementById('answer');
answer.value = '';

document.getElementById('form-game').addEventListener("submit", (event) => {
    event.preventDefault();
    if (!gameInProgress) {
        return alert('Start game first!');
    };

    if (answer.value === taskResponse) {
        alert('Correct!');
    } else {
        alert('Wrong!');
    };

    answer.value = '';

    gameInProgress = false;
});

document.getElementById('start').addEventListener("click", (event) => {
    gameInProgress = true;
    answer.value = '';
    axios.get('/parser')
        .then((response) => {
            let taskFunction = response.data.function;
            taskResponse = response.data.result.trim();
            console.log(taskResponse);
            document.getElementById('game-area').innerHTML = `<pre>${taskFunction}</pre>`;
        })
        .catch((err) => {
            responseField.innerHTML = err.response.data;
        });
});
