import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import { fetchShow as mockFetchShow } from "./api/fetchShow";
import { mockData } from "./mockdata";
import userEvent from "@testing-library/user-event";
jest.mock("./api/fetchShow");


  test("app renders without errors", async () => {

    mockFetchShow.mockResolvedValueOnce(mockData);
    render(<App />);
  });

  test("fetches showdata and renders data", async () => {
    mockFetchShow.mockResolvedValueOnce(mockData);

    //Arrange
    render(<App />);

    //Act: get
    const dropdown = await screen.findByText(/Select a season/i);
    userEvent.click(dropdown);
    const seasonOne = await screen.findByText(/Season 1/i);
    userEvent.click(seasonOne);

    //Assert:We should find the episode names of the season we selected
    await screen.findByText(/Chapter One: The Vanishing of Will Byers/i);
    await screen.findByText(/Chapter One: The Weirdo on Maple Street/i);
    await screen.findByText(/Chapter One: Holly, Jolly/i);
  });
