let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// this is the timer which is counting the seconds from now after one seconds
function timer(seconds) {
  // clear the existing timer
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTime(seconds);
  displayEndTime(then);
  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }
    displayTime(secondsLeft);
  }, 1000);
}

//display the time in hours, mins and seconds
function displayTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  let remainderSeconds = seconds % 3600;
  const minutes = Math.floor(remainderSeconds / 60);
  remainderSeconds = remainderSeconds % 60;
  const display = `${hours}:${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

//display the time when we end our timer
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${hour}:${
    minutes < 10 ? '0' : ''
  }${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

function handleSubmit(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
}
document.customForm.addEventListener('submit', handleSubmit);
