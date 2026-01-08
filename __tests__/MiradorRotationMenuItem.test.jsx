import React from 'react';
import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MiradorRotationMenuItem from '../src/plugins/MiradorRotationMenuItem';

describe('MiradorRotationMenuItem', () => {
  const defaultProps = {
    handleClose: vi.fn(),
    updateWindow: vi.fn(),
    windowId: 'test-window',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render menu item with hide text when enabled', () => {
    render(<MiradorRotationMenuItem {...defaultProps} enabled />);
    expect(screen.getByText('Hide rotation')).toBeInTheDocument();
  });

  it('should render menu item with show text when disabled', () => {
    render(<MiradorRotationMenuItem {...defaultProps} enabled={false} />);
    expect(screen.getByText('Show rotation')).toBeInTheDocument();
  });

  it('should call handleClose and updateWindow when clicked', () => {
    const handleClose = vi.fn();
    const updateWindow = vi.fn();

    render(
      <MiradorRotationMenuItem
        {...defaultProps}
        handleClose={handleClose}
        updateWindow={updateWindow}
        enabled
      />,
    );

    const menuItem = screen.getByRole('menuitem');
    fireEvent.click(menuItem);

    expect(handleClose).toHaveBeenCalled();
    expect(updateWindow).toHaveBeenCalledWith('test-window', { rotationEnabled: false });
  });

  it('should toggle rotationEnabled to true when disabled', () => {
    const updateWindow = vi.fn();

    render(
      <MiradorRotationMenuItem
        {...defaultProps}
        updateWindow={updateWindow}
        enabled={false}
      />,
    );

    const menuItem = screen.getByRole('menuitem');
    fireEvent.click(menuItem);

    expect(updateWindow).toHaveBeenCalledWith('test-window', { rotationEnabled: true });
  });

  it('should render tune icon', () => {
    render(<MiradorRotationMenuItem {...defaultProps} />);
    expect(screen.getByTestId('TuneSharpIcon')).toBeInTheDocument();
  });
});
