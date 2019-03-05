let highScore = document.getElementById('high-score');

axios.get('score').then((response) => {
    let users = response.data;
    users.forEach((user) => {
        highScore.innerHTML += `<tr class="table-main__user"><td class="table-main__username">${user.username}</td><td>${user.score.basic.percentage}%</td>
        <td>${user.score.basic.attempted}</td><td>${user.score.basic.successful}</td>
        <td>${user.xp}</td><td>${user.bestCombo}</td></tr>`;
    });
}).catch((err) => {
    highScore.innerHTML = err;
});





