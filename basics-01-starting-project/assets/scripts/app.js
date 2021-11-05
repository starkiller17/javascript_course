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

function calculateResult(calculationType) {
    const enteredNumber = getUserInput();
    const initialResult = currentResult;
    let mathOperator;
    
    if (
        calculationType !== 'ADD' &&
        calculationType !== 'SUBSTRACT' &&
        calculationType !== 'MULTIPLY' &&
        calculationType !== 'DIVIDE' ||
        !enteredNumber
    ) {
        return;
    }
    
    if(calculationType === 'ADD') {
        currentResult += enteredNumber;
        mathOperator = '+';
    } else if(calculationType === 'SUBSTRACT') {
        currentResult -= enteredNumber;
        mathOperator = '-';
    } else if(calculationType === 'MULTIPLY') {
        currentResult *= enteredNumber;
        mathOperator = '*';
    } else if(calculationType === 'DIVIDE') {
        currentResult /= enteredNumber;
        mathOperator = '/';
    }
    
    createAndWirteLog(mathOperator, initialResult, enteredNumber);
    writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}


function add() {
    calculateResult('ADD');
}

function substract() {
    calculateResult('SUBSTRACT');
}

function multiply() {
    calculateResult("MULTIPLY");
}

function divide() {
    calculateResult("DIVIDE");
}

/* Create click event listeners for opreator buttons */
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", substract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);