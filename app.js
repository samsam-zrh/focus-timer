const DURATIONS = {
  focus: 25 * 60,
  break: 5 * 60,
};

const timeElement = document.querySelector("#time");
const progressElement = document.querySelector("#progress");
const toggleButton = document.querySelector("#toggle");
const resetButton = document.querySelector("#reset");
const statusElement = document.querySelector("#status");
const sessionsElement = document.querySelector("#sessions-count");
const modeButtons = [...document.querySelectorAll(".mode")];

let mode = "focus";
let remaining = DURATIONS[mode];
let intervalId = null;

function todayKey() {
  return `focus-sessions-${new Date().toISOString().slice(0, 10)}`;
}

function getSessions() {
  return Number.parseInt(localStorage.getItem(todayKey()) ?? "0", 10);
}

function setSessions(value) {
  localStorage.setItem(todayKey(), String(value));
  sessionsElement.textContent = value;
  sessionsElement.parentElement.lastChild.textContent =
    value > 1 ? " sessions terminées aujourd'hui" : " session terminée aujourd'hui";
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
}

function render() {
  const duration = DURATIONS[mode];
  const label = formatTime(remaining);

  timeElement.textContent = label;
  timeElement.dateTime = `PT${remaining}S`;
  progressElement.max = duration;
  progressElement.value = duration - remaining;
  document.title = intervalId ? `${label} · Focus Timer` : "Focus Timer";
  toggleButton.textContent = intervalId ? "Mettre en pause" : "Démarrer";
}

function stopTimer(message) {
  window.clearInterval(intervalId);
  intervalId = null;
  statusElement.textContent = message;
  render();
}

function switchMode(nextMode) {
  if (intervalId) {
    stopTimer("Minuteur arrêté.");
  }

  mode = nextMode;
  remaining = DURATIONS[mode];
  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  statusElement.textContent =
    mode === "focus" ? "Prêt pour une session de 25 minutes." : "Prêt pour une pause de 5 minutes.";
  render();
}

function completeSession() {
  if (mode === "focus") {
    setSessions(getSessions() + 1);
    switchMode("break");
    statusElement.textContent = "Session terminée. Il est temps de faire une pause.";
  } else {
    switchMode("focus");
    statusElement.textContent = "Pause terminée. Prêt à reprendre ?";
  }
  navigator.vibrate?.(200);
}

function tick() {
  remaining -= 1;
  if (remaining <= 0) {
    completeSession();
  } else {
    render();
  }
}

function toggleTimer() {
  if (intervalId) {
    stopTimer("Session en pause.");
    return;
  }

  intervalId = window.setInterval(tick, 1000);
  statusElement.textContent = mode === "focus" ? "Concentration en cours." : "Pause en cours.";
  render();
}

function resetTimer() {
  if (intervalId) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
  remaining = DURATIONS[mode];
  statusElement.textContent = "Minuteur remis au début.";
  render();
}

toggleButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);
modeButtons.forEach((button) => {
  button.addEventListener("click", () => switchMode(button.dataset.mode));
});

document.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLButtonElement) {
    return;
  }
  if (event.code === "Space") {
    event.preventDefault();
    toggleTimer();
  }
  if (event.key.toLowerCase() === "r") {
    resetTimer();
  }
});

setSessions(getSessions());
switchMode(mode);
