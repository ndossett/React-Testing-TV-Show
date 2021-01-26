import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';
import App from './App';
import { fetchShow as mockFetchShow } from './api/fetchShow';
import { mockData } from './mockdata';

jest.mock('./api/fetchShow');


  test('app renders without errors', () => {
    mockFetchShow.mockResolvedValueOnce(mockData);
    render(<App />);
  });

  test('fetches episodes and renders data on screen', async () => {
    mockFetchShow.mockResolvedValueOnce(mockData);

    //Arrange: render app
    render(<App />);

    //Act: get data from api and push button
    const dropdown = await screen.findByText(/Select a season/i);
    userEvent.click(dropdown);
    const seasonOne = await screen.findByText(/Season 1/i);
    userEvent.click(seasonOne);

    //Assert:We should find the episode names of the season we selected
    await waitFor(() => {
      screen.findByText(/Chapter One: The Vanishing of Will Byers/i);
      screen.findByText(/Chapter One: The Weirdo on Maple Street/i);
      screen.findByText(/Chapter One: Holly, Jolly/i);
    }); 
  });
