// First steps:
// 1) Create add function
// 2) Create subtract function
// 3) Create multiply function
// 4) Create divide function

// Element variables
const display = document.querySelector('.display');
const numbers = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');
const multiplicationSymbol = document.querySelector('.multiply');
const divisionSymbol = document.querySelector('.divide');
const subtractionSymbol = document.querySelector('.subtract');
const additionSymbol = document.querySelector('.add');
const equalsSign = document.querySelector('.equals');

// Variables
let firstDigit;
let secondDigit;
let operationSymbol;
let displayValue = display.textContent;

function updateDisplay(){
    for (let i=0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', () => {
            if (display.textContent === '0') {
                display.textContent = '';
                display.textContent += numbers[i].textContent;
            } else {
                display.textContent += numbers[i].textContent;
            }
            displayValue = display.textContent;
        });
    }
    
    for (let i=0; i < operators.length; i++) {
        operators[i].addEventListener('click', () => {
            if (!firstDigit) {
                firstDigit = display.textContent;
                operationSymbol = operators[i].textContent;
            } else if (!secondDigit) {
                secondDigit = display.textContent;
            }
            display.textContent = 0;
            displayValue = display.textContent;
        });
    }
}

equalsSign.addEventListener('click', () => {
    if (!secondDigit) {
        secondDigit = display.textContent;
    }
    display.textContent = (operate(firstDigit, operationSymbol, secondDigit)).toString();
});

// function checkOperator(operator){
//     if (operator.textContent === '+') {
//         operate(firstDigit, '+', secondDigit);
//     } else if (operator.textContent === '-') {
//         operate(firstDigit, '-', secondDigit);
//     } else if (operator.textContent === '/') {
//         operate(firstDigit, '/', secondDigit);
//     } else if (operator.textContent === 'x') {
//         operate(firstDigit, '*', secondDigit);
//     }
// }

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a / b;
}

function operate(a, operator, b) {
    if (operator === '+') {
        return add(a,b);
    } else if (operator === '-') {
        return subtract(a,b);
    } else if (operator === 'x') {
        return multiply(a,b);
    } else {
        return divide(a,b);
    }
}

updateDisplay();