import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import ProfileSetupForm from "./ProfileSetupForm";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("renders ProfileSetupForm and submits data", async () => {
  mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

  render(<ProfileSetupForm />);

  // Fill out the form
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
  fireEvent.change(screen.getByLabelText(/location/i), { target: { value: "New York" } });
  fireEvent.change(screen.getByLabelText(/budget/i), { target: { value: "500" } });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /save profile/i }));

  // Assert that axios.post was called with the correct data
  expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:3000/api/profiles", {
    name: "John Doe",
    email: "john@example.com",
    location: "New York",
    budget: 500,
    interests: [],
    itemsLookingFor: [],
  });
});