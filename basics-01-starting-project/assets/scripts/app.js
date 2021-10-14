const defaultResult = 0;
let currentResult = defaultResult;

/* Get user input from input field */
function getUserInput() {
    return parseInt(userInput.value);
}

/* Generates and writes calculation log */
function createAndWirteLog(operator,  resultBeforeCalc, calcNumber) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription); // From vendor file
}

function add() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult += enteredNumber;
    createAndWirteLog("+", initialResult, enteredNumber);
}

function substract() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult -= enteredNumber;
    createAndWirteLog("-", initialResult, enteredNumber);
}

function multiply() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;
    createAndWirteLog("*", initialResult, enteredNumber);
}

function divide() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;
    createAndWirteLog("/", initialResult, enteredNumber);
}

/* Create click event listeners for opreator buttons */
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", substract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);