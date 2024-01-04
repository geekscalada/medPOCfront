import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

// Mocks adicionales aquí si son necesarios

test("renders without crashing", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
