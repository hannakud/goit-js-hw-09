import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const button = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises(event) {
  event.preventDefault();
  const delay = Number(event.target[0].value);
  const step = Number(event.target[1].value);
  const amount = Number(event.target[2].value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

form.addEventListener('submit', createPromises);
