let taskHistory = document.getElementById('task-history');

axios.get('answers').then((response) => {
    let tasks = response.data;
    tasks.forEach((task) => {
        taskHistory.innerHTML += `<p><pre>Function:\n${task.function}Result:${task.result}</pre></p><hr>`;
    })
}).catch((err) => {
    taskHistory.innerHTML = err;
});





