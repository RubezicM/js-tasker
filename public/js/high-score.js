let highScore = document.getElementById('high-score');

axios.get('score').then((response) => {
    let users = response.data;
    console.log(users);
    users.forEach((user) => {
        highScore.innerHTML += `<tr><td>${user.username}</td><td>${user.score.basic.percentage}%</td>
        <td>${user.score.basic.attempted}</td><td>${user.score.basic.successful}</td></tr>`
    });
}).catch((err) => {
    highScore.innerHTML = err;
});





