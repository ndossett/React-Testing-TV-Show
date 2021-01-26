import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockData } from '../mockData';
import Episodes from './Episodes';

jest.mock('../api/fetchShow');


  test('app renders without errors', () => {
    render(<Episodes episodes={mockData.data._embedded.episodes} />);
  });
  
  test('renders change in season selection appropriately', async () => {
    //Arange: render episodes
    const { rerender } = render(<Episodes episodes={[]}/>);

    let episodeObjects = screen.queryAllByTestId('episode');
    expect(episodeObjects).toHaveLength(0);

    rerender(<Episodes episodes={mockData.data._embedded.episodes} />);

    //Assert: We should get the same amount of episodes as our api returned
    episodeObjects = screen.queryAllByTestId('episodes');
    expect(episodeObjects).toHaveLength(3)
  });
