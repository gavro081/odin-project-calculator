let operand1 = 0 , operand2 = null, operationSign = null;
let operandDecimal = 0;
let currOperand = 0;
const inputBox = document.querySelector('#input-box');
const commaButton = document.querySelector('#comma');
const clearButton = document.querySelector('#clear');
const currInput = document.querySelector('#current-input');
const numButtons = document.querySelectorAll("button:not(.action-button)");
let commaON = false;
let flag = 0;
let hasCalculated = false;
const operationButtons = document.querySelectorAll(".operation");
const equalButton = document.querySelector('#equal')

clearButton.addEventListener("click", () => {
   clearAll();
});
equalButton.addEventListener("click", () => {
    calculate();
})
commaButton.addEventListener("click", () => {
    if (!commaON) {
        inputBox.value += '.';
        commaON = true;
    }
})

document.addEventListener('keydown', (e) => {
    if (Number.isInteger(Number(e.key))){
        if (!commaON) addNumber(Number(e.key));
        else addDecimal(Number(e.key));
    }
    else if (e.key === 'Enter') calculate();
    else if (e.key === 'Backspace') clearAll();
    // else if (e.key === '*') operationSign = '×';
    // else if (e.key === '-') operationSign = '-';
    // else if (e.key === '+') operationSign = '+';
    // else if (e.key === '/') operationSign = '/';
    else if (e.key === '.') {
        if (!commaON) {
            inputBox.value += '.';
            commaON = true;
        }
    }
})

function clearAll(){
    inputBox.value = 0;
    operand1 = null;
    operand2 = null;
    operationSign = null;
    operandDecimal = null;
    commaON = false;
    currInput.innerText = '';
    flag = 0;
}

numButtons.forEach(number => {
    number.addEventListener("click", () => {
        if (!commaON) addNumber(Number(number.innerText));
        else addDecimal(Number(number.innerText));
    });
});


function addNumber(number){
    if (!operationSign) {
        if (!operand1 || hasCalculated) {
            operand1 = number;
            hasCalculated = false;
        }
        else operand1 = 10*operand1 + number;

        inputBox.value = operand1;

        currInput.innerText = operand1;

        currOperand = operand1;
        flag = 1;
    }
    else {
        if (!operand2) operand2 = number;
        else operand2 = 10*operand2 + number;
        inputBox.value = operand2;

        currInput.innerText = `${operand1} ${operationSign} ` + operand2;

        currOperand = operand2;
        flag = 2;
    }
    // setCurrInput();
}

function addDecimal(number){
    if (!operandDecimal) {
        operandDecimal = number;
        // currInput.innerText += '.' + `${number}`;
    }
    else operandDecimal = 10 * operandDecimal + number;
    inputBox.value = currOperand + '.' + operandDecimal;
    if (operand2){
        currInput.innerText = `${operand1} ${operationSign} ` + currOperand + '.' + operandDecimal;
    }
    else {
        currInput.innerText = + currOperand + '.' + operandDecimal;
    }
    // setCurrInput();
}

operationButtons.forEach(sign => {
    sign.addEventListener("click", () => {
        if (operandDecimal){
           makeDecimal();
        }
        if (operationSign) {
            calculate();
            operationSign = sign.innerText;
            // setCurrInput();
        }
        else if (operand1) {
            let test = sign.innerText;
            if (test === '×' || test === '-' || test === '+' || test === '/')
            operationSign = sign.innerText;
            setCurrInput();
        }
        // setCurrInput();
    });
});

function calculate () {
    if (operandDecimal){
        makeDecimal();
    }
    let result = 0;
    console.log(operand1);
    console.log(operand2);
    if (operationSign === '×') result = operand1 * operand2;
    else if (operationSign === `-`) result = operand1 - operand2;
    else if (operationSign === `/`) {
        if (operand2 === 0) {
            clearAll();
            currInput.innerText = `no division with 0`;
            return;
        }
        else {
            result = operand1 / operand2;
        }
    }
    else if (operationSign === `+`) result = Number(operand1) + Number(operand2);
    result = Number.isInteger(result) ? result : result.toFixed(2);
    inputBox.value = result;
    operand1 = result;
    hasCalculated = true;
    commaON = false;
    operand2 = null;
    operationSign = null;
    currInput.innerText = '';
    flag = 0;
}

function setCurrInput (){
    currInput.innerText = operand1;
    if (operationSign) currInput.innerText += ' ' +  operationSign;
    if (operand2) currInput.innerText += ' ' + operand2;
}

function makeDecimal() {
    let numString = operandDecimal.toString();
    if (numString.length > 3) numString = numString.slice(0,3);
    // else if (numString.length === 2) numString += '0';
    else if (numString.length === 1) numString += '0';
    numString = Number(numString);
    numString /= 100;
    if (flag === 1) operand1 += Number(numString.toFixed(3));
    else if (flag === 2) operand2 += Number(numString.toFixed(3));
    flag = 0;
    operandDecimal = null;
    commaON = false;
}
