import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const blue = 'rgb(0, 51, 255)';
const red = 'rgb(255, 0, 0)';
const green = 'rgb(0,255,8)';

describe('the app', () => {
  it('does what it\'s supposed to...', () => {
    const { container } = render(<App />);
    expect(container).not.toBeEmptyDOMElement();

    const input = screen.getByLabelText('display');
    expect(input.style.backgroundColor).toEqual(red);

    const display = screen.getByLabelText('color-picker');
    fireEvent.change(display, blue);
    waitFor(() => 
      expect(display.style.backgroundColor).toEqual(blue));

    const undo = screen.getByLabelText('undo-button');
    
    fireEvent.change(display, green);
    
    
    waitFor(() => 
      expect(input).toHaveStyle({ 'background-color': green }));
    
    
    fireEvent.click(undo);
    waitFor(() => 
      expect(input).toHaveStyle({ 'background-color': blue }));


    const redo = screen.getByLabelText('redo-button');
        
    fireEvent.click(redo);
    waitFor(() => 
      expect(input).toHaveStyle({ 'background-color': green }));
  });
});
