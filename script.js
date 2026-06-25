// IIF fucntion to keep variables private

(function () {
  // Initializing operands as empty strings and operator as null (used as state variable)
  let prevNumber = "";
  let nextNumber = "";
  let selectedOperator = null;
  let nextOperator = null;
  let operatorCount = 0;

  // To evaluate the values based on operator
  function calculate(a, b, op) {
    // Trims user inputs in cases where inputs are 1.1.2.3 to 1.1
    a = parseFloat(a);
    b = parseFloat(b);
    let result = 0;

    // Performs arithmetic ops based on selected operator
    switch (op) {
      case "+":
        result = a + b;
        break;

      case "-":
        result = a - b;
        break;

      case "*":
        result = a * b;
        break;

      case "/":
        result = a / b;
        break;

      case "^":
        result = Math.pow(a, b);
        break;
    }
    displayScreen.value = result;

    // Updates first operand with result as a value & resetting second operand in case if user want to perform continued operations
    prevNumber = result;
    nextNumber = "";
    selectedOperator = null;
  }

  // Clears the calculator values
  function clear() {
    prevNumber = "";
    nextNumber = "";
    displayScreen.value = "";
    selectedOperator = null;
  }

  // To undo the inputs
  function backSpace(e) {
    // Checks for operator state before slicing
    if (!selectedOperator) {
      prevNumber = prevNumber.slice(0, -1);
    } else {
      nextNumber = nextNumber.slice(0, -1);
    }
    // Updates the input field upon undo changes
    displayScreen.value = displayScreen.value.slice(0, -1);
  }

  // Helper function validates upon user clicks &
  function helperFn(e) {
    if (!e.target.matches("button")) return;

    console.log(e.target);

    if (selectedOperator === null) {
      // Get the first operand for evaluation
      if (e.target.classList.contains("digits")) {
        prevNumber += e.target.textContent;
        displayScreen.value = prevNumber;
        console.log(prevNumber);
      }
    } else {
      // Get the second operand for evaluation
      if (e.target.classList.contains("digits")) {
        nextNumber += e.target.textContent;
        displayScreen.value = nextNumber;
        console.log(nextNumber);
      }
    }

    // Get the operator
    if (e.target.classList.contains("operators")) {
      if (prevNumber !== "" && nextNumber !== "" && selectedOperator !== null) {
        calculate(prevNumber, nextNumber, selectedOperator);
      }

      selectedOperator = e.target.textContent;
    }

    // To undo the input
    if (e.target.id == "backSpace") {
      backSpace(e);
    }

    // Validates all three key variables before calculation
    if (e.target.id == "equals") {
      if (prevNumber !== "" && nextNumber !== "" && selectedOperator !== null) {
        calculate(prevNumber, nextNumber, selectedOperator);
      }
    }

    // Clears all values
    if (e.target.id == "clearAll") {
      clear();
    }
  }

  // Click event on the parent container CALCULATOR
  document.getElementById("calculator").addEventListener("click", helperFn);
})();
