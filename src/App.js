import "./App.css";

import { useState } from "react";
import { evaluate } from "mathjs";

// Components
import Button from "./Button";

const buttons = [
  "AC",
  "+/-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

function App() {
  // Calculator buffer
  const [calcBuffer, setCalcBuffer] = useState([]);
  // Result display
  const [display, setDisplay] = useState("0");

  // Handle button clicks here
  function handleClick(value) {
    // Clear the calculator buffer and display
    if (value === "AC") {
      setCalcBuffer([]);
      setDisplay("0");
    } else if (value === "+/-") {
      if (calcBuffer.length > 0 && !isNaN(calcBuffer[calcBuffer.length - 1])) {
        const newBuffer = [...calcBuffer];
        newBuffer[newBuffer.length - 1] = (
          parseFloat(newBuffer[newBuffer.length - 1]) * -1
        ).toString();
        setCalcBuffer(newBuffer);
      }
    }
    // Execute the calculation and display the result
    else if (value === "=") {
      try {
        const expression = calcBuffer
          .join("")
          .replace("x", "*")
          .replace("÷", "/")
          .replace("%", "/100");
        const result = evaluate(expression);
        setDisplay(result.toString());
      } catch (error) {
        setDisplay("Error");
      }
    } else if (["+", "-", "x", "÷", "%"].includes(value)) {
      // Prevent multiple operators
      if (
        calcBuffer.length > 0 &&
        ["+", "-", "x", "÷", "%"].includes(calcBuffer[calcBuffer.length - 1])
      ) {
        const newBuffer = [...calcBuffer];
        newBuffer[newBuffer.length - 1] = value;
        setCalcBuffer(newBuffer);
      } else {
        calcBuffer.length > 0 && setCalcBuffer([...calcBuffer, value]);
      }
    } else if (value === ".") {
      // Prevent multiple decimals in a same number, add a leading zero if necessary
      if (!calcBuffer.length) {
        setCalcBuffer(["0", value]);
      } else {
        let lastNumber = "";
        for (let i = calcBuffer.length - 1; i >= 0; i--) {
          if (["+", "-", "x", "÷", "%"].includes(calcBuffer[i])) {
            break;
          }
          lastNumber = calcBuffer[i] + lastNumber;
        }
        if (!lastNumber.includes(".")) {
          setCalcBuffer([...calcBuffer, value]);
        }
      }
    } else {
      setCalcBuffer([...calcBuffer, value]);
    }
  }

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1 className="is-size-1 mt-6 mb-4">Calculator</h1>
        </header>
      </div>
      <main className="calculator card mx-auto p-4">
        <div
          className="has-background-light mx-2 p-2"
          style={{
            borderRadius: "0.75rem",
          }}
        >
          {/* Calculator buffer */}
          <div className="is-size-4 is-flex is-justify-content-right pr-2">
            {calcBuffer?.length ? (
              calcBuffer.map((v, i) => (
                <p
                  key={v + i + "-key"}
                  className={
                    ["+", "-", "x", "÷", "%"].includes(v) ? "mx-2" : ""
                  }
                >
                  {v}
                </p>
              ))
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
          {/* Result */}
          <div className="display pr-2">
            <p>{display}</p>
          </div>
        </div>
        {/* Keypad */}
        <div className="grid has-4-columns mt-2">
          {buttons.map((button, index) => {
            return (
              <div
                key={index + "btn-key"}
                className={`cell ${button === "=" ? "is-col-span-2" : ""} m-2`}
              >
                <Button
                  id={index + "btn-id"}
                  label={button}
                  value={button}
                  handleClick={() => handleClick(button)}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
