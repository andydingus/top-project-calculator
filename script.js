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
let operand1 = null;
let operand2 = null;
let operator1 = null;
let operator2 = null;
let operatorSymbol;
let result = 0;
let displayValue = '0';

function updateDisplay() {
    display.textContent = displayValue;
    if (displayValue.length > 9) {
        display.textContent = displayValue.substring(0,9);
    }
}

updateDisplay();

function handleNumberInput(number) {
    // if (display.textContent === '0') {
    //     display.textContent = '';
    // }
    // displayValue = display.textContent;
    if (operand1 === null) {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = number;
        } else if (displayValue === operand1) {
            displayValue = number;
        } else {
            displayValue += number;
        }
    } else {
        if(displayValue === operand1) {
            displayValue = number;
        } else {
            displayValue += number;
        }
    }
}

function handleOperatorInput(operator) {
    // Logic:
    // When an operator symbol is clicked, whatever number is on the display gets stored in operand1 first
    // After doing so, the display should return to 0
    // Next, when the operator symbol is clicked again, whatever number is on the display gets stored in operand2 now
    // After doing so, the display should show the result. The result then becomes operand1 just in case there's more calculations. Operand2 returns to 0.
    // After the result is shown, when the user clicks on the numbers, it should erase the result and display a new number
    // Then, after clicking an operator symbol again, the result should show up again on the display. It becomes operand1 again and operand 2 is 0.
    // Rinse and repeat
    
    // if (operand1 && operand2) {
    //     result = operate(operand1, operatorSymbol, operand2);
    // } else if (!operand1 && !operand2) {
    //     operand1 = +displayValue;
    //     display.textContent = '0';
    // } else if (operand1 && !operand2) {
    //     operand2 = +displayValue;
    //     result = operate(operand1, operatorSymbol, operand2);
    //     display.textContent = result;
        
    //     // Operand1 takes the value of result after calculations
    //     operand1 = result;
    //     // Operand2 becomes 0 again
    //     operand2 = 0;
    // }
    if(operator1 != null && operator2 === null) {
        //4th click - handles input of second operator
        operator2 = operator;
        operand2 = displayValue;
        result = operate(Number(operand1), Number(operand2), operator1);
        displayValue = roundAccurately(result, 15).toString();
        operand1 = displayValue;
        result = null;
    } else if(operator1 != null && operator2 != null) {
        //6th click - new operator2
        operand2 = displayValue;
        result = operate(Number(operand1), Number(operand2), operator2);
        operator2 = operator;
        displayValue = roundAccurately(result, 15).toString();
        operand1 = displayValue;
        result = null;
    } else { 
        //2nd click - handles first operator input
        operator1 = operator;
        operand1 = displayValue;
    }
}


function showCalculation() {
    operand2 = +display.textContent;
    display.textContent = operate(operand1, operatorSymbol, operand2).toString();
    operand1 = +display.textContent;
    // operand2 = null;
}

function resetCalculator() {
    operand1 = 0;
    operand2 = 0;
    operatorSymbol = null;
    displayValue = null;
    display.textContent = 0;
}

// function add(a, b) {
//     return +a + +b;
// }

// function subtract(a, b) {
//     return a - b;
// }

// function multiply(a, b) {
//     return a * b;
// }

// function divide(a, b) {
//     if (b === 0) {
//         return 'Error: Division by zero';
//     }
//     return a / b;
// }

function operate(a, b, operator) {
    if (operator === '+') {
        return a + b;
    } else if (operator === '-') {
        return a - b;
    } else if (operator === 'x') {
        return a * b;
    } else {
        if (b === 0) {
            return 'wat';
        }
        return a / b;
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
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