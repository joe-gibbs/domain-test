import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { getAccessToken, searchProperties } from "./searchProvider";
import userEvent from "@testing-library/user-event";

test("renders search component", () => {
  render(<App />);
  const titleEl = screen.getByText(/Search/i);
  expect(titleEl).toBeInTheDocument();
});

test("renders favourites component", () => {
  render(<App />);
  const titleEl = screen.getByText(/Search/i);
  expect(titleEl).toBeInTheDocument();
});

test("api acquires auth token", async () => {
  expect(
    typeof (await getAccessToken(
      "client_4c2d4fd5a5a2e63ccf1299112cac90b1",
      "secret_4eea8bc506fad3b30fe861f54f2e87d4"
    ))
  ).toBe("string");
});

test("api loads properties", async () => {
  const accessToken = await getAccessToken(
    "client_4c2d4fd5a5a2e63ccf1299112cac90b1",
    "secret_4eea8bc506fad3b30fe861f54f2e87d4"
  );

  const results = await searchProperties(accessToken, "richmond");

  expect(results.length).toBeGreaterThan(0);
});

test("properties load in screen", async () => {
  const app = render(<App />);
  await new Promise((r) => setTimeout(r, 2000));

  const searchInput = app.container.querySelector("#search-input");
  userEvent.type(searchInput!, "camberwell");

  await new Promise((r) => setTimeout(r, 2000));

  const camberwellElements = screen.getAllByText(/Camberwell/i);

  expect(camberwellElements.length).toBeGreaterThan(0);
});
