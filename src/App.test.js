import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

test("renders the page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Calculator/i);
  expect(linkElement).toBeInTheDocument();
});
test('initial state shows "0"', () => {
  render(<App />);

  const displayElement = screen.getByTestId("result");
  expect(displayElement).toBeInTheDocument();
});

test('AC button clears the calculator state and resets the display to "0"', () => {
  render(<App />);
  const buttonElement = screen.getByTestId("AC");
  act(() => {
    buttonElement.click();
  });
  const displayElement = screen.getByTestId("result");
  expect(displayElement).toHaveTextContent("0");
});

test("user cannot enter an operator first", () => {
  render(<App />);
  const operatorButton = screen.getByTestId("+");
  act(() => {
    operatorButton.click();
  });
  const displayElement = screen.getByTestId("buffer");
  expect(displayElement).not.toHaveTextContent("+");
});

test("digit buttons enter numbers", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("1");
  act(() => {
    buttonElement.click();
  });
  const displayElement = screen.getByTestId("buffer");
  expect(displayElement).toHaveTextContent("1");
});

test("decimal button adds a decimal to a number", () => {
  render(<App />);
  const buttonElement = screen.getByTestId(".");
  act(() => {
    buttonElement.click();
  });
  const displayElement = screen.getByTestId("result");
  expect(displayElement).toBeInTheDocument();
});

test('decimal button begins a number that starts with "0."', () => {
  render(<App />);
  const buttonElement = screen.getByTestId(".");
  act(() => {
    buttonElement.click();
  });
  const displayElement = screen.getByTestId("buffer");
  expect(displayElement).toHaveTextContent("0.");
});

test("+/- button negates a number", () => {
  render(<App />);

  const buttonElement1 = screen.getByTestId("1");
  act(() => {
    buttonElement1.click();
  });
  const buttonElement2 = screen.getByTestId("+/-");
  act(() => {
    buttonElement2.click();
  });
  const displayElement = screen.getByText("-1");
  expect(displayElement).toBeInTheDocument();
});

test("operator buttons enter an operator", () => {
  render(<App />);
  const buttonElement1 = screen.getByTestId("1");
  act(() => {
    buttonElement1.click();
  });
  const buttonElement2 = screen.getByTestId("+");
  act(() => {
    buttonElement2.click();
  });
  const displayElement = screen.getByTestId("result");
  expect(displayElement).toBeInTheDocument();
});

test("second operator overwrites the first operator", () => {
  render(<App />);
  const buttonElement1 = screen.getByTestId("1");
  act(() => {
    buttonElement1.click();
  });
  const buttonElement2 = screen.getByTestId("+");
  act(() => {
    buttonElement2.click();
  });
  const buttonElement3 = screen.getByTestId("-");
  act(() => {
    buttonElement3.click();
  });
  const displayElement = screen.getByTestId("result");
  expect(displayElement).toBeInTheDocument();
});

test("= button calculates and displays the result", () => {
  render(<App />);
  const buttonElement1 = screen.getByTestId("1");
  act(() => {
    buttonElement1.click();
  });
  const buttonElement2 = screen.getByTestId("+");
  act(() => {
    buttonElement2.click();
  });
  const buttonElement3 = screen.getByTestId("1");
  act(() => {
    buttonElement3.click();
  });
  const buttonElement4 = screen.getByTestId("=");
  act(() => {
    buttonElement4.click();
  });
  const displayElement = screen.getByTestId("result");
  expect(displayElement).toBeInTheDocument();
});
