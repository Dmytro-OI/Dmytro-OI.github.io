document.addEventListener("DOMContentLoaded", initTimer);
function initTimer() {
    let studyTime = parseInt(localStorage.getItem("studyTime")) || 0;
    let timerDisplay = document.getElementById("timer");

    function updateDisplay() {
        const minutes = Math.floor(studyTime / 60);
        const seconds = studyTime % 60;
        timerDisplay.textContent = `Час навчання: ${minutes} хв ${seconds} сек`;
    }

    setInterval(function() {
        studyTime++;
        localStorage.setItem("studyTime", studyTime);
        updateDisplay();
    }, 1000);
    

    updateDisplay();
}

