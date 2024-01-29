// First steps:
// 1) Create add function
// 2) Create subtract function
// 3) Create multiply function
// 4) Create divide function

// Element variables

const buttons = document.querySelectorAll(".button");
// const numbers = document.getElementsByClassName("number");
// const operators = document.getElementsByClassName("operator");
// const multiplicationSymbol = document.querySelector(".multiply");
// const divisionSymbol = document.querySelector(".divide");
// const subtractionSymbol = document.querySelector(".subtract");
// const additionSymbol = document.querySelector(".add");
// const equalsSign = document.querySelector(".equals");
// const clearSign = document.querySelector(".clear");

// Variables
let operand1 = null;
let operand2 = null;
let operator1 = null;
let operator2 = null;
let operatorSymbol;
let result = 0;
let displayValue = "0";

function updateDisplay() {
  // display.textContent = displayValue;
  const display = document.querySelector(".display");
  display.innerText = displayValue;
  if (displayValue.length > 9) {
    display.textContent = displayValue.substring(0, 9);
  }
}

updateDisplay();

function setButtonEventListeners() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      if (buttons[i].classList.contains("number")) {
        handleNumberInput(buttons[i].textContent);
        updateDisplay();
      } else if (buttons[i].classList.contains("operator")) {
        handleOperatorInput(buttons[i].textContent);
      } else if (buttons[i].classList.contains("clear")) {
        resetCalculator();
        updateDisplay();
      } else if (buttons[i].classList.contains("equals")) {
        showCalculation();
        updateDisplay();
      }
    });
  }
  // numberEventListeners();
  // operatorEventListeners();
  // equalsSign.addEventListener("click", () => {
  //   showCalculation();
  // });

  // clearSign.addEventListener("click", () => {
  //   resetCalculator();
  // });
}

setButtonEventListeners();

function handleNumberInput(number) {
  // if (display.textContent === '0') {
  //     display.textContent = '';
  // }
  // displayValue = display.textContent;
  if (operand1 === null) {
    if (displayValue === "0" || displayValue === 0) {
      displayValue = number;
    } else if (displayValue === operand1) {
      displayValue = number;
    } else {
      displayValue += number;
    }
  } else {
    if (displayValue === operand1) {
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
  if (operator1 != null && operator2 === null) {
    //4th click - handles input of second operator
    operator2 = operator;
    operand2 = displayValue;
    result = operate(Number(operand1), Number(operand2), operator1);
    displayValue = roundAccurately(result, 15).toString();
    operand1 = displayValue;
    result = null;
    updateDisplay();
  } else if (operator1 != null && operator2 != null) {
    //6th click - new operator2
    operand2 = displayValue;
    result = operate(Number(operand1), Number(operand2), operator2);
    operator2 = operator;
    displayValue = roundAccurately(result, 15).toString();
    operand1 = displayValue;
    result = null;
    updateDisplay();
  } else {
    //2nd click - handles first operator input
    operator1 = operator;
    operand1 = displayValue;
  }
}

function showCalculation() {
  // If there's no operand1 stored and equals is clicked, do nothing
  if (operator1 === null) {
    displayValue = displayValue;
  } else if (operator2 !== null) {
    // After multiple operations
    operand2 = displayValue;
    result = operate(Number(operand1), Number(operand2), operator2);
    if (result === "wat") {
      displayValue = "wtf";
    } else {
      displayValue = roundAccurately(result, 15).toString();
      operand1 = displayValue;
      operand2 = null;
      operator1 = null;
      operator2 = null;
      result = null;
    }
  } else {
    // After first operation
    operand2 = displayValue;
    result = operate(Number(operand1), Number(operand2), operator1);
    if (result === "wat") {
      displayValue = "wtf";
    } else {
      displayValue = roundAccurately(result, 15).toString();
      operand1 = displayValue;
      operand2 = null;
      operator1 = null;
      operator2 = null;
      result = null;
    }
  }
}

function resetCalculator() {
  operand1 = null;
  operand2 = null;
  operatorSymbol = null;
  displayValue = "0";
  // display.textContent = 0;
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
  if (operator === "+") {
    return a + b;
  } else if (operator === "-") {
    return a - b;
  } else if (operator === "x") {
    return a * b;
  } else {
    if (b === 0) {
      return "wat";
    }
    return a / b;
  }
}

function roundAccurately(num, places) {
  return parseFloat(Math.round(num + "e" + places) + "e-" + places);
}

// function numberEventListeners() {
//   for (let i = 0; i < numbers.length; i++) {
//     numbers[i].addEventListener("click", () => {
//       // Value only works with buttons but I'm using divs
//       handleNumberInput(numbers[i].textContent);
//       updateDisplay();
//     });
//   }
// }

// function operatorEventListeners() {
//   for (let i = 0; i < operators.length; i++) {
//     operators[i].addEventListener("click", () => {
//       handleOperatorInput(operators[i].textContent);
//     });
//   }
// }
