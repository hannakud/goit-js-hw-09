import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start');
let targetDate = Date.now();
const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      button.disabled = true;
    } else {
      button.disabled = false;
      targetDate = selectedDates[0];
    }
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  const formattedDays = days.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function showTime() {
  const diffMs = targetDate.getTime() - Date.now();
  const time = convertMs(diffMs);
  const [days, hours, minutes, seconds] = time.split(':');
  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

function startTimer() {
  button.disabled = true;
  if (targetDate.getTime() - Date.now() > 0) {
    showTime();
    setTimeout(startTimer, 1000);
  } else {
    button.disabled = false;
    Notiflix.Notify.success('You died');
  }
}

button.addEventListener('click', startTimer);

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
