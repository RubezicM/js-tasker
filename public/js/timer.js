var canvas = document.getElementById('progress');
var ctx = canvas.getContext('2d');

function startTimer(div, n) {
    time--;
    var i = n - 1;
    timer = setInterval(function () {
        
        stopTimer = function () {
            clearInterval(timer);
            div.innerHTML = i + 1;
            // Resets and sending data
            div.innerHTML = '0';
            time = 30;
            postAnswer('Times up! ');
        }


        function updateProgress() {
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 60;
            var circ = Math.PI * 2;
            var percent = i / n;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, ((circ) * percent), circ, false);
            ctx.lineWidth = 10;
            if (i < 5) {
                ctx.strokeStyle = '#FF5C26';
            } else {
                ctx.strokeStyle = '#BC9405';
            }
            ctx.stroke();
        }

        updateProgress();
        if (i < 5) {
            // Different color
        }
        if (i < 0) {
            stopTimer();
        } else {
            div.innerHTML = i--;
        }
    }, 1000);

}

let canvasReset = ()=>{
    // Clearing the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timeLeft.innerHTML = time;
}