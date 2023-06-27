import AllProviders from "@/components/AllProviders";
import LandingPage from "@/components/LandingPage";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("Buttons send to correct location", () => {
  it("sends you to pokedex", async () => {
    render(
      <AllProviders>
        <LandingPage></LandingPage>
      </AllProviders>
    );
    const tryForFreeButton = screen.getByText("Try For Free");
    await waitFor(() => {
      userEvent.click(tryForFreeButton);
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe("/pokedex/home/0");
    });
  });
});
