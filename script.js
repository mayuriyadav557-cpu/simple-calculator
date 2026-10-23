
const display = document.getElementById("display");
let expression = "";

function appendValue(value) {
    if (display.value === "Error") {
        expression = "";
    }

    if (expression.length >= 40) {
        return;
    }

    expression += value;
    display.value = expression;
}

function clearDisplay() {
    expression = "";
    display.value = "0";
}

function deleteLast() {
    expression = expression.slice(0, -1);
    display.value = expression || "0";
}

function calculate() {
    try {
        if (!expression ||
            !/^[0-9+\-*/%.()\s]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (typeof result !== "number" ||
            !Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        display.value = Number(result.toPrecision(12)).toString();
        expression = display.value;
    } catch {
        display.value = "Error";
        expression = "";
    }
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Numbers 0-9
  if (key >= "0" && key <= "9") {
    appendValue(key);
  }
  // Operators and decimal point
  else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "." || key === "%") {
    appendValue(key);
  }
  // Enter or = calculates the result
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  }
  // Backspace deletes the last character
  else if (key === "Backspace") {
    deleteLast();
  }
  // Escape or C clears everything
  else if (key === "Escape" || key.toLowerCase() === "c") {
    clearDisplay();
  }
});