let startTime;
let elapsedTime = 0;
let timerInterval;

const timeDisplay = {
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  milliseconds: document.getElementById("milliseconds"),
};

const startPauseButton = document.getElementById("startPauseButton");
const clearButton = document.getElementById("clearButton");

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  startPauseButton.textContent = "Pause";
  startPauseButton.classList.add("pause");
}

function pauseTimer() {
  clearInterval(timerInterval);
  startPauseButton.textContent = "Continue";
  startPauseButton.classList.remove("pause");
}

function clearTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  startPauseButton.textContent = "Start";
  startPauseButton.classList.remove("pause");
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  updateDisplay();
}

function updateDisplay() {
  const time = new Date(elapsedTime);
  timeDisplay.hours.textContent = padTime(time.getUTCHours());
  timeDisplay.minutes.textContent = padTime(time.getUTCMinutes());
  timeDisplay.seconds.textContent = padTime(time.getUTCSeconds());
  timeDisplay.milliseconds.textContent = padMilliseconds(
    time.getUTCMilliseconds()
  );
}

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function padMilliseconds(ms) {
  return ms.toString().padStart(3, "0");
}

startPauseButton.addEventListener("click", () => {
  if (
    startPauseButton.textContent === "Start" ||
    startPauseButton.textContent === "Continue"
  ) {
    startTimer();
  } else {
    pauseTimer();
  }
});

clearButton.addEventListener("click", clearTimer);

// Initialize display
updateDisplay();
