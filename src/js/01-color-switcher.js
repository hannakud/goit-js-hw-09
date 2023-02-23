const refs = {
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startButton.addEventListener('click', () => {
  refs.stopButton.disabled = false;
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.startButton.disabled = true;
  }, 1000);
});

refs.stopButton.addEventListener('click', () => {
  refs.startButton.disabled = false;
  clearInterval(timerId);
  refs.stopButton.disabled = true;
});
