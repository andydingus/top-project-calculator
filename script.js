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
const clearSign = document.querySelector('.clear');

// Variables
let operand1 = 0;
let operand2 = 0;
let operatorSymbol;
let displayValue = display.textContent;

function handleNumberInput(number) {
    if (display.textContent === '0') {
        display.textContent = '';
    }
    display.textContent += number;
    displayValue = display.textContent;
}

function handleOperatorInput(operator) {
    if (!operand1) {
        operand1 = display.textContent;
        operatorSymbol = operator.textContent;
    } else if (!operand2) {
        operand2 = display.textContent;
    }
    display.textContent = 0;
    displayValue = display.textContent;
}

function showCalculation() {
    if (!operand2) {
        operand2 = display.textContent;
    }
    display.textContent = operate(operand1, operatorSymbol, operand2).toString();
}

function resetCalculator() {
    operand1 = null;
    operand2 = null;
    operatorSymbol = null;
    displayValue = null;
    display.textContent = 0;
}

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error: Division by zero';
    }
    return a / b;
}

function operate(a, operator, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === 'x') {
        return multiply(a, b);
    } else {
        return divide(a, b);
    }
}

function numberEventListeners() {
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', () => {
            handleNumberInput(numbers[i].textContent);
        });
    }
}

function operatorEventListeners() {
    for (let i = 0; i < operators.length; i++) {
        operators[i].addEventListener('click', () => {
            handleOperatorInput(operators[i]);
        });
    }
}

function setEventListeners() {
    numberEventListeners();
    operatorEventListeners();
    equalsSign.addEventListener('click', () => {
        showCalculation();
    });

    clearSign.addEventListener('click', () => {
        resetCalculator();
    });
}

setEventListeners();