import React from 'react';
import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Rotation from '../src/plugins/Rotation';

const theme = createTheme({
  palette: {
    shades: {
      main: '#ffffff',
    },
  },
});

const renderWithTheme = (component) => render(
  <ThemeProvider theme={theme}>
    {component}
  </ThemeProvider>,
);

describe('Rotation', () => {
  const defaultProps = {
    label: 'Show angle',
    onChange: vi.fn(),
    value: 0,
    windowId: 'test-window',
  };

  it('should render toggle button', () => {
    renderWithTheme(<Rotation {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'Show angle' });
    expect(button).toBeInTheDocument();
  });

  it('should toggle slider visibility on button click', () => {
    renderWithTheme(<Rotation {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'Show angle' });

    // Initially slider is hidden
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();

    // Click to show slider
    fireEvent.click(button);
    expect(screen.getByRole('slider')).toBeInTheDocument();

    // Click to hide slider
    fireEvent.click(button);
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
  });

  it('should display current rotation value', () => {
    renderWithTheme(<Rotation {...defaultProps} value={90} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '90');
  });

  it('should call onChange when slider value changes', () => {
    const onChange = vi.fn();
    renderWithTheme(<Rotation {...defaultProps} onChange={onChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 45 } });

    expect(onChange).toHaveBeenCalled();
  });

  it('should render in small mode when prop is set', () => {
    renderWithTheme(<Rotation {...defaultProps} small />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should render in vertical mode by default', () => {
    renderWithTheme(<Rotation {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-orientation', 'vertical');
  });
});
