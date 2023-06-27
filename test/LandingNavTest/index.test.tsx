import AllProviders from "@/components/AllProviders";
import LandingNav from "@/components/NavBar";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

beforeEach(()=>{
  localStorage.clear;
})

describe("Landing page contains content", () => {
  it("MyComponent renders with the correct content", async () => {
    render(
      //allProviderskkj
      <AllProviders>
        <LandingNav hasButtons={true} />
      </AllProviders>
    );

    const linkElement = screen.getByRole("button");

    expect(linkElement).toBeInTheDocument();

    // Click the button using userEvent
    userEvent.click(linkElement);

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });
});
