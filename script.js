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

let curr;
document.addEventListener('keydown', (e) => {
    if (Number.isInteger(Number(e.key))){
        findClickedNumber(Number(e.key));
        curr.classList.add('clicked');
        if (!commaON) addNumber(Number(e.key));
        else addDecimal(Number(e.key));
    }
    else if (e.key === 'Enter') {
        equalButton.classList.add('clicked');
        calculate();
    }
    else if (e.key === 'Backspace') {
        clearButton.classList.add('clicked');
        clearAll();
    }
    else if (e.key === '*' || e.key === '-' || e.key === '+' || e.key === '/'){
        switch (e.key){
            case "*": document.querySelector('#multiply').classList.add('clicked')
                operate('×');
                break;
            case "+":document.querySelector('#plus').classList.add('clicked');
                operate(e.key);
                break;
            case "-":document.querySelector('#minus').classList.add('clicked');
                operate(e.key);
                break;
            case "/":document.querySelector('#divide').classList.add('clicked');
                operate(e.key);
                break;
        }
    }
    else if (e.key === '.') {
        if (!commaON) {
            inputBox.value += '.';
            commaON = true;
        }
    }
})

document.addEventListener('keyup', () => {
    document.querySelector('.clicked').classList.remove('clicked');
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
}

operationButtons.forEach(sign => {
    sign.addEventListener("click", () => {
        operate(sign.innerText);

    });
});

function operate (sign){
    if (operandDecimal){
        makeDecimal();
    }
    if (operationSign) {
        calculate();
        operationSign = sign;
        // setCurrInput();
    }
    else if (operand1) {
        let test = sign;
        if (test === '×' || test === '-' || test === '+' || test === '/')
            operationSign = sign;
        setCurrInput();
    }
}

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
function findClickedNumber(num){
    switch (num){
        case 0: curr = document.querySelector('#zero')
            break;
        case 1: curr = document.querySelector('#one')
            break;
        case 2: curr = document.querySelector('#two')
            break;
        case 3: curr = document.querySelector('#three')
            break;
        case 4: curr = document.querySelector('#four')
            break;
        case 5: curr = document.querySelector('#five')
            break;
        case 6: curr = document.querySelector('#six')
            break;
        case 7: curr = document.querySelector('#seven')
            break;
        case 8: curr = document.querySelector('#eight')
            break;
        case 9: curr = document.querySelector('#nine')
            break;
    }
}