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
            let image = converter(taskFunction);
            let gameHolder = document.getElementById('game-area');
            taskResponse = response.data.result.trim();
            console.log(response.data.result);
            
            if(gameHolder.childElementCount > 0){
                gameHolder.removeChild(gameHolder.firstChild);
            } 
            gameHolder.appendChild(image);
            //  console.log(taskFunction);
            
        })
        .catch((err) => {
            document.getElementById('game-area').innerHTML = err;
        });
});
