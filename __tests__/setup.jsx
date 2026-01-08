/* eslint-disable react/prop-types */
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock mirador exports
vi.mock('mirador', () => ({
  getContainerId: vi.fn(() => 'container-id'),
  getViewer: vi.fn(() => ({ rotation: 0 })),
  getWindowConfig: vi.fn(() => ({ rotationEnabled: true, rotationOpen: true })),
  MiradorMenuButton: function MockMiradorMenuButton({ children, onClick, ...props }) {
    return React.createElement('button', { type: 'button', onClick, ...props }, children);
  },
  updateViewport: vi.fn(),
  updateWindow: vi.fn(),
  useTranslation: () => ({
    t: (key, options) => {
      const translations = {
        collapse_close: 'Expand rotation',
        collapse_open: 'Collapse rotation',
        help: 'Help',
        hide: 'Hide rotation',
        init: 'Init',
        progress: 'Show angle',
        revert: 'Revert',
        rotateLeft: 'Rotate 90 left',
        rotateRight: 'Rotate 90 right',
        show: 'Show rotation',
      };
      if (options?.context) {
        return translations[`${key}_${options.context}`] || key;
      }
      return translations[key] || key;
    },
  }),
}));

// Mock @custom-react-hooks/use-element-size
vi.mock('@custom-react-hooks/use-element-size', () => ({
  useElementSize: () => [vi.fn(), { height: 600, width: 800 }],
}));

// Mock merge-refs
vi.mock('merge-refs', () => ({
  default: (...refs) => (element) => {
    refs.forEach((r) => {
      if (typeof r === 'function') {
        r(element);
      } else if (r) {
        // eslint-disable-next-line no-param-reassign
        r.current = element;
      }
    });
  },
}));
