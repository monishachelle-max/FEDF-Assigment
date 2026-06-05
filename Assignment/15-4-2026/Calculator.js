let num1 = Number(prompt("Enter first number: "));
let num2 = Number(prompt("Enter second number: "));

console.log("Addition:", num1 + num2);
console.log("Subtraction:", num1 - num2);
console.log("Multiplication:", num1 * num2);

if (num2 === 0) {
    console.log("Division: Cannot divide by zero");
} else {
    console.log("Division:", num1 / num2);
}