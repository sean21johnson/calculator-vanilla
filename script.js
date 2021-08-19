/*
    -Add event listeners for each of the buttons by looping through sets of arrays
*/

// TARGET ELEMENTS
const currentNumberDisplay = document.getElementById("number_display");
const acButton = document.getElementById("ac");
const decimalButton = document.getElementById("decimal");
const equalButton = document.getElementById("equals");

let currentOperation = [];

const nums = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"zero",
];

const mathSymbols = ["divide", "multiply", "add", "subtract", "bigadd"];

// FUNCTIONS

// Function to handle if a number button is clicked
function handleNumberClick(digit) {
	digit = parseInt(digit);
	currentOperation.push(digit);
	setCurrentDisplay();
}

// Function to handle a math operator being clicked
function handleOperatorClick(operator) {
	currentOperation.push(operator);
	setCurrentDisplay();
}

// Function to handle decimal being clicked
function handleDecimalClick() {
	currentOperation.push(".");
	setCurrentDisplay();
}

// Function to handle the current display in the number box
function setCurrentDisplay() {
	if (
		typeof currentOperation[currentOperation.length - 1] !== "number" &&
		currentOperation[currentOperation.length - 1] !== "."
	) {
		currentNumberDisplay.innerText = "";
	} else if (
		currentOperation.length === 1 &&
		typeof currentOperation[currentOperation.length - 1] === "number"
	) {
		currentNumberDisplay.innerText =
			currentOperation[currentOperation.length - 1];
	} else {
		let currentIndex = currentOperation.length - 1;
		let currentNums = "";

		while (currentIndex >= 0) {
			if (
				typeof currentOperation[currentIndex] === "string" &&
				currentOperation[currentIndex] !== "."
			)
				break;
			else {
				currentNums += currentOperation[currentIndex].toString();
				currentIndex--;
			}
		}
		currentNumberDisplay.innerText = currentNums.split("").reverse().join("");
	}
}

// Function to handle the equation
function handleEquation() {
	const modArr = [];
	let currentNumStr = "";

	for (let i = 0; i < currentOperation.length; i++) {
		const currentEl = currentOperation[i];

		if (currentEl === ".") {
			currentNumStr += ".";
		} else if (typeof currentEl === "number") {
			currentNumStr += currentEl.toString();

			if (i + 1 === currentOperation.length) {
				modArr.push(parseFloat(currentNumStr));
			}
		} else {
			modArr.push(parseFloat(currentNumStr));
			modArr.push(currentEl);

			currentNumStr = "";
		}
	}

	let finalVal;

	for (let i = 0; i < modArr.length; i++) {
		if (i === 0) {
			finalVal = modArr[i];
		} else if (modArr[i - 1] === "+") {
			finalVal += modArr[i];
		} else if (modArr[i - 1] === "-") {
			finalVal -= modArr[i];
		} else if (modArr[i - 1] === "*") {
			finalVal *= modArr[i];
		} else if (modArr[i - 1] === "/") {
			finalVal /= modArr[i];
		} else {
			continue;
		}
	}

	currentNumberDisplay.innerText = finalVal.toFixed(2);
}

// Function to handle if AC is clicked
function handleAcClick() {
	currentOperation = [];
	currentNumberDisplay.innerText = 0;
}

// EVENT LISTENERS

// Number event listener
nums.forEach((num) => {
	const digit = document.getElementById(num);
	digit.addEventListener("click", function () {
		handleNumberClick(digit.innerText);
	});
});

// AC/Clear event listener
acButton.addEventListener("click", handleAcClick);

// Decimal event listener
decimalButton.addEventListener("click", handleDecimalClick);

// Operators event listener
mathSymbols.forEach((symbol) => {
	const operator = document.getElementById(symbol);

	if (symbol === "multiply") {
		operator.addEventListener("click", function () {
			handleOperatorClick("*");
		});
	} else if (symbol === "bigadd") {
		operator.addEventListener("click", function () {
			handleOperatorClick("+");
		});
	} else {
		operator.addEventListener("click", function () {
			handleOperatorClick(operator.innerText);
		});
	}
});

// Equals event listener
equalButton.addEventListener("click", handleEquation);
