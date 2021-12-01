const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS'

let gameIsRunning = false;

const getPlayerChoice = () => {
    const selection = prompt(`${ROCK}, ${PAPER}, ${SCISSORS}?`, '').toUpperCase();
    if (
      selection !== ROCK &&
      selection !== PAPER &&
      selection !== SCISSORS
    ) {
      alert(`Invalid choice! We choose ${ROCK} for you!`);
      return;
    }
    return selection;
};

const getComputerChoice = () => {
    const randomValue = Math.random();
    if (randomValue < 0.34) {
        return ROCK
    } else if (randomValue < 0.67) {
        return PAPER;
    } else{
        return SCISSORS;
    }
};

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) =>
    cChoice === pChoice
      ? RESULT_DRAW
      : (cChoice === ROCK && pChoice === PAPER) ||
        (cChoice === PAPER && pChoice === SCISSORS) ||
        (cChoice === SCISSORS && pChoice === ROCK)
      ? RESULT_PLAYER_WINS
      : RESULT_COMPUTER_WINS;
      
      /*if (cChoice === pChoice) {
        return RESULT_DRAW;
      } else if (
        (cChoice === ROCK && pChoice === PAPER) ||
        (cChoice === PAPER && pChoice === SCISSORS) ||
        (cChoice === SCISSORS && pChoice === ROCK)
      ) {
          return RESULT_PLAYER_WINS;
      } else {
          return RESULT_COMPUTER_WINS;
      }*/

startGameBtn.addEventListener('click', () => {
    if (gameIsRunning) {
        return;
    }
    gameIsRunning = true;
    console.log("Game starting...");
    const playerChoice = getPlayerChoice();
    const computerChoice = getComputerChoice();
    let winner;
    if (getPlayerChoice) {
        winner = getWinner(computerChoice, playerChoice);
    } else {
        winner = getWinner(computerChoice, playerChoice);
    }
    
    let message = `You picked ${playerChoice || DEFAULT_USER_CHOICE}, computer picked ${computerChoice}, there you `;  
    if (winner === RESULT_DRAW) {
        message += 'had a draw.';
    } else if (winner === RESULT_PLAYER_WINS) {
        message += 'won.';
    } else {
        message += 'lost.';
    }

    alert(message);
    gameIsRunning = false;
});

const combine = (resultHandler, operation, ...numbers) => {
    const validateNumber = (number) => {
        return isNaN(number) ? 0 : number;
    };

    let sum = 0;
    for (const num of numbers) {
        if (operation === 'ADD') {
            sum += validateNumber(num);
        } else {
            sum -= validateNumber(num);
        }
        
    }
    
    resultHandler(sum);
};

//const substractUp = function(resultHandler, ...numbers) {
//    let sum = 0;
//    for (const num of numbers) {
//        sum -= num;
//    }
//    resultHandler(sum, 'The result after substracting all number is');
//};


const showResult = (messageText, result) => {
    alert(messageText + " " + result)
};

combine(showResult.bind(this, 'The result after adding all numbers is:'), 'ADD', 1, 5, 10, -3, 6, 'a', 7);
combine(showResult.bind(this, 'The result after substracting all numbers is:'), 'SUBSTRACT', 1, 5, 10, -3, 6, 10);