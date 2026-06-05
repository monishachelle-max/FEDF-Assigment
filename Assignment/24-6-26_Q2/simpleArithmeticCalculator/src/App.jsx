/*import { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  const calculate = (operation) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult("Enter valid numbers");
      return;
    }

    let res;
    switch (operation) {
      case "add":
        res = n1 + n2;
        break;
      case "sub":
        res = n1 - n2;
        break;
      case "mul":
        res = n1 * n2;
        break;
      case "div":
        res = n2 !== 0 ? n1 / n2 : "Cannot divide by zero";
        break;
      default:
        res = "";
    }

    setResult(res);
  };

  const clearAll = () => {
    setNum1("");
    setNum2("");
    setResult("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Arithmetic Calculator</h2>

      <input
        type="number"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <br /><br />

      <button onClick={() => calculate("add")}>Add</button>
      <button onClick={() => calculate("sub")}>Subtract</button>
      <button onClick={() => calculate("mul")}>Multiply</button>
      <button onClick={() => calculate("div")}>Divide</button>

      <br /><br />

      <button onClick={clearAll}>Clear</button>

      <h3>Result: {result}</h3>
    </div>
  );
}

export default App;*/

import { useState } from "react";
import Add from "./components/Add";
import Subtract from "./components/Subtract";
import Multiply from "./components/Multiply";
import Divide from "./components/Divide";
import Clear from "./components/Clear";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Arithmetic Calculator</h2>

      <input
        type="number"
        placeholder="Enter First Number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Second Number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <div style={{ margin: "20px" }}>
        <Add num1={num1} num2={num2} setResult={setResult} />
        <Subtract num1={num1} num2={num2} setResult={setResult} />
        <Multiply num1={num1} num2={num2} setResult={setResult} />
        <Divide num1={num1} num2={num2} setResult={setResult} />
      </div>

      <Clear setNum1={setNum1} setNum2={setNum2} setResult={setResult} />

      <h3>Result: {result}</h3>
    </div>
  );
}

export default App;
