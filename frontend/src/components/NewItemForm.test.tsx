import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewItemForm from "./NewItemForm";

test("renders NewItemForm with all fields", () => {
  render(<NewItemForm />);

  // Check if the form fields are rendered
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
});