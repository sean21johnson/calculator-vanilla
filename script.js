/*
    -Add event listeners for each of the buttons by looping through sets of arrays
*/

// TARGET ELEMENTS
const currentNumberDisplay = document.getElementById("number_display");
const acButton = document.getElementById("ac");

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
    console.log('operator is', operator)
    currentOperation.push(operator)
}


// Function to handle the current display in the number box
function setCurrentDisplay() {
	if (typeof currentOperation[currentOperation.length - 1] !== "number") {
		console.log("first if statement hit");
		currentNumberDisplay.innerText = "";
	} else if (
		currentOperation.length === 1 &&
		typeof currentOperation[currentOperation.length - 1] === "number"
	) {
		console.log("else if statement hit");
		currentNumberDisplay.innerText =
			currentOperation[currentOperation.length - 1];
	} else {
		let currentIndex = currentOperation.length - 1;
		let currentNums = "";

		while (
			currentIndex >= 0 &&
			typeof currentOperation[currentIndex] === "number"
		) {
			currentNums += currentOperation[currentIndex].toString();
			currentIndex--;
		}
		currentNumberDisplay.innerText = currentNums.split("").reverse().join("");
	}
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
