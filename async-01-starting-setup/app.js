const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success => {
      resolve(success);
    }, error => {
      reject(error);
    }, opts);
  });
  return promise;
};

const setTimer = (duration) => {
  // The promise receives a function in the constructor, is executed right away the promise is created
  // This configures what the Promise will do
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!'); // Comes from the JS engine, this eman the function is done
    }, duration);
  });
  return promise;
};

// Promise chaining, we'll need to wait until both promises are resolved to see the results
function trackUserHandler() {
  getPosition()
    .then(posData => {
      positionData = posData;
      // This make the Promise pending again
      return setTimer(2000);
    })
    .then(data => {
      console.log(data, positionData);
    })
    .catch(error => {
      console.error('Catch: ', error);
    });

  setTimer(1000)
    .then(() => {
      console.log('Timer done!');
    });

  // console.log('Getting position...');
}

async function trackUserHandlerAsync() {
  console.log('Running from Async/Await');
  let posData;
  let timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch(error) {
    console.error(error);
  }

  console.log(timerData, posData);
  setTimer(1000)
    .then(() => {
      console.log('Timer done!');
    });

  console.log('Getting position...');
}

button.addEventListener('click', trackUserHandlerAsync);

// Promise.race([
//   getPosition(),
//   setTimer(1000)
// ])
//   .then (data => {
//     console.log(data);
//   })
// ;

// Promise.all([
//   getPosition(),
//   setTimer(1000)
// ])
//   .then(promiseData => {
//     console.log('Promise all');
//     console.log(promiseData);
//   })
// ;

Promise.allSettled([
  getPosition(),
  setTimer(1000)
])
  .then(promiseData => {
    console.log('Promise allSettled');
    console.log(promiseData);
  })
;


// result = 0;
// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);