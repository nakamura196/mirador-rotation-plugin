import React from 'react';
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MiradorRotation from '../src/plugins/MiradorRotation';

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

describe('MiradorRotation', () => {
  const defaultProps = {
    updateViewport: vi.fn(),
    updateWindow: vi.fn(),
    viewConfig: { rotation: 0 },
    viewer: {},
    windowId: 'test-window',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render when enabled', () => {
    renderWithTheme(<MiradorRotation {...defaultProps} enabled />);
    expect(screen.getByRole('button', { name: /collapse/i })).toBeInTheDocument();
  });

  it('should not render controls when disabled', () => {
    renderWithTheme(<MiradorRotation {...defaultProps} enabled={false} />);
    expect(screen.queryByRole('button', { name: /collapse/i })).not.toBeInTheDocument();
  });

  it('should not render controls when viewer is null', () => {
    renderWithTheme(<MiradorRotation {...defaultProps} viewer={null} />);
    expect(screen.queryByRole('button', { name: /collapse/i })).not.toBeInTheDocument();
  });

  it('should toggle open state when toggle button is clicked', () => {
    const updateWindow = vi.fn();
    renderWithTheme(
      <MiradorRotation {...defaultProps} updateWindow={updateWindow} open />,
    );

    const toggleButton = screen.getByRole('button', { name: /collapse/i });
    fireEvent.click(toggleButton);

    expect(updateWindow).toHaveBeenCalledWith('test-window', { rotationOpen: false });
  });

  it('should show rotation controls when open', () => {
    renderWithTheme(<MiradorRotation {...defaultProps} open />);
    expect(screen.getByRole('button', { name: /rotate.*left/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /rotate.*right/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /revert/i })).toBeInTheDocument();
  });

  it('should hide rotation controls when closed', () => {
    renderWithTheme(<MiradorRotation {...defaultProps} open={false} />);
    expect(screen.queryByRole('button', { name: /rotate.*left/i })).not.toBeInTheDocument();
  });

  it('should rotate left by 90 degrees', () => {
    const updateViewport = vi.fn();
    renderWithTheme(
      <MiradorRotation
        {...defaultProps}
        updateViewport={updateViewport}
        viewConfig={{ rotation: 0 }}
        open
      />,
    );

    const rotateLeftButton = screen.getByRole('button', { name: /rotate.*left/i });
    fireEvent.click(rotateLeftButton);

    expect(updateViewport).toHaveBeenCalledWith('test-window', { rotation: -90 });
  });

  it('should rotate right by 90 degrees', () => {
    const updateViewport = vi.fn();
    renderWithTheme(
      <MiradorRotation
        {...defaultProps}
        updateViewport={updateViewport}
        viewConfig={{ rotation: 0 }}
        open
      />,
    );

    const rotateRightButton = screen.getByRole('button', { name: /rotate.*right/i });
    fireEvent.click(rotateRightButton);

    expect(updateViewport).toHaveBeenCalledWith('test-window', { rotation: 90 });
  });

  it('should reset rotation when revert is clicked', () => {
    const updateViewport = vi.fn();
    renderWithTheme(
      <MiradorRotation
        {...defaultProps}
        updateViewport={updateViewport}
        viewConfig={{ rotation: 180 }}
        open
      />,
    );

    const revertButton = screen.getByRole('button', { name: /revert/i });
    fireEvent.click(revertButton);

    expect(updateViewport).toHaveBeenCalledWith('test-window', { rotation: 0 });
  });

  it('should accumulate rotations', () => {
    const updateViewport = vi.fn();
    renderWithTheme(
      <MiradorRotation
        {...defaultProps}
        updateViewport={updateViewport}
        viewConfig={{ rotation: 90 }}
        open
      />,
    );

    const rotateRightButton = screen.getByRole('button', { name: /rotate.*right/i });
    fireEvent.click(rotateRightButton);

    expect(updateViewport).toHaveBeenCalledWith('test-window', { rotation: 180 });
  });
});
