const calculator = document.getElementById("calculator");
const displayInput = document.querySelector(".input");
const displayResult = document.querySelector(".result");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const dots = document.querySelectorAll(".dot");

// Configuration
let values = new Array(100).fill("");
let valuesIndex = 0;
let selectedOperator = "";
let result = 0;

// Manage numbers input
numbers.forEach((number) => {
  number.addEventListener("click", () => updateDisplay(number.textContent));
});

// Manage operators
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    let operatorType = operator.textContent;
    switch (operatorType) {
      case "AC":
        resetValues();
        resetDisplay();
        break;

      case "CE":
        if (displayInput.textContent === "") {
          cancelElement();
        } else {
          resetValues();
          resetDisplay();
        }

        break;

      case "+/-":
        values[valuesIndex] *= -1;
        if (valuesIndex !== 0) {
          values[valuesIndex] = `(${values[valuesIndex]})`;
        }
        addToInputDisplay();
        break;

      case "/":
        valuesIndex++;
        if (stillOperator()) {
          values[valuesIndex - 1] = "/";
        } else {
          values[valuesIndex] = "/";
          valuesIndex++;
        }
        addToInputDisplay();
        break;

      case "X":
        valuesIndex++;
        if (stillOperator()) {
          values[valuesIndex - 1] = "*";
        } else {
          values[valuesIndex] = "*";
          valuesIndex++;
        }
        addToInputDisplay();
        break;

      case "-":
        valuesIndex++;
        if (stillOperator()) {
          values[valuesIndex - 1] = "-";
        } else {
          values[valuesIndex] = "-";
          valuesIndex++;
        }
        addToInputDisplay();
        break;

      case "+":
        valuesIndex++;
        if (stillOperator()) {
          values[valuesIndex - 1] = "+";
        } else {
          values[valuesIndex] = "+";
          valuesIndex++;
        }
        addToInputDisplay();
        break;

      case "=":
        fillDots();
        calculateResult();
        displayResult.innerHTML = result;
        resetValues();
        break;

      default:
        break;
    }
  });
});

// Update values array with new number and update display
function updateDisplay(number) {
  values[valuesIndex] += number;
  addToInputDisplay();
}

// Update display every time a new element is added
function addToInputDisplay() {
  let resultString = "";
  values.forEach((value) => {
    resultString += value;
  });
  if (resultString.length < 11) {
    displayResult.style.fontSize = "2.2rem";
  }

  if (resultString.length > 11) {
    displayResult.style.fontSize = "1.5rem";
  }
  if (resultString.length > 40) {
    displayResult.style.fontSize = "1.3rem";
  }
  if (resultString.length > 80) {
    displayResult.style.fontSize = "1rem";
  }
  displayResult.innerHTML = resultString;
}

// Check if the last element is another operator when click on operator
function stillOperator() {
  return (
    values[valuesIndex - 1] === "/" ||
    values[valuesIndex - 1] === "*" ||
    values[valuesIndex - 1] === "-" ||
    values[valuesIndex - 1] === "+"
  );
}

// Remove last inserted number and update display
function cancelElement() {
  values[valuesIndex] = "";
  addToInputDisplay();
}

// Calculate the final result of the operation
function calculateResult() {
  let operation = "";
  values.forEach((value) => {
    operation += value;
  });
  displayInput.innerHTML = operation;
  result = eval(operation).toFixed(2);
  selectedOperator = "";
}

// Reset values of the calculator
function resetValues() {
  values = new Array(100).fill("");
  selectedOperator = "";
  result = 0;
  valuesIndex = 0;
}

// Reset display info
function resetDisplay() {
  displayInput.innerHTML = "";
  displayResult.innerHTML = "";
  unfillDots();
}

// Timer for dots fill and unfill
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
async function fillDots() {
  for (var i = 3; i >= 0; i--) {
    dots[i].style.backgroundColor = "lightgreen";
    await timer(200);
  }
}
async function unfillDots() {
  for (var i = 0; i < 4; i++) {
    dots[i].style.backgroundColor = "white";
    await timer(200);
  }
}

// Move the calculator on the page with mouse
let width = calculator.offsetWidth;
let height = calculator.offsetHeight;
calculator.addEventListener("pointermove", (e) => {
  if (e.pressure > 0) {
    const x = e.pageX;
    const y = e.pageY;
    calculator.style.top = y - height / 2 + "px";
    calculator.style.left = x - width / 2 + "px";
  }
});
