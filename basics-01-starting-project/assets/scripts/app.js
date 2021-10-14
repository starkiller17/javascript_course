const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

/* Get user input from input field */
function getUserInput() {
    return parseInt(userInput.value);
}

/* Generates and writes calculation log */
function createAndWirteLog(operator,  resultBeforeCalc, calcNumber) {
    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription); // From vendor file
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
    const logEntry = {
        operation: operationIdentifier,
        prevResult: prevResult,
        enteredNumber: operationNumber,
        result: newResult
    };
    logEntries.push(logEntry);
    console.log(logEntries);
}

function add() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult += enteredNumber;
    createAndWirteLog("+", initialResult, enteredNumber);
    writeToLog("ADD", initialResult, enteredNumber, currentResult);
}

function substract() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult -= enteredNumber;
    createAndWirteLog("-", initialResult, enteredNumber);
    writeToLog("SUBSTRACT", initialResult, enteredNumber, currentResult);
}

function multiply() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;
    createAndWirteLog("*", initialResult, enteredNumber);
    writeToLog("MULTIPLY", initialResult, enteredNumber, currentResult);
}

function divide() {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;
    createAndWirteLog("/", initialResult, enteredNumber);
    writeToLog("DIVIDE", initialResult, enteredNumber, currentResult);
}

/* Create click event listeners for opreator buttons */
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", substract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);