import { describe, it, expect } from 'vitest';
import { miradorRotationPlugin } from '../src/index';

describe('miradorRotationPlugin', () => {
  it('should export an array of plugins', () => {
    expect(Array.isArray(miradorRotationPlugin)).toBe(true);
    expect(miradorRotationPlugin).toHaveLength(2);
  });

  it('should have MiradorRotation plugin targeting OpenSeadragonViewer', () => {
    const rotationPlugin = miradorRotationPlugin[0];
    expect(rotationPlugin.target).toBe('OpenSeadragonViewer');
    expect(rotationPlugin.mode).toBe('add');
    expect(rotationPlugin.component).toBeDefined();
    expect(rotationPlugin.mapDispatchToProps).toBeDefined();
    expect(rotationPlugin.mapStateToProps).toBeDefined();
  });

  it('should have MiradorRotationMenuItem plugin targeting WindowTopBarPluginMenu', () => {
    const menuItemPlugin = miradorRotationPlugin[1];
    expect(menuItemPlugin.target).toBe('WindowTopBarPluginMenu');
    expect(menuItemPlugin.mode).toBe('add');
    expect(menuItemPlugin.component).toBeDefined();
    expect(menuItemPlugin.mapDispatchToProps).toBeDefined();
    expect(menuItemPlugin.mapStateToProps).toBeDefined();
  });

  it('should include translations in config', () => {
    const rotationPlugin = miradorRotationPlugin[0];
    expect(rotationPlugin.config).toBeDefined();
    expect(rotationPlugin.config.translations).toBeDefined();
  });

  it('should have mapDispatchToProps with updateViewport and updateWindow', () => {
    const rotationPlugin = miradorRotationPlugin[0];
    expect(rotationPlugin.mapDispatchToProps.updateViewport).toBeDefined();
    expect(rotationPlugin.mapDispatchToProps.updateWindow).toBeDefined();
  });

  it('should have mapStateToProps that returns expected shape', () => {
    const rotationPlugin = miradorRotationPlugin[0];
    const mockState = {};
    const mockOwnProps = { windowId: 'test-window' };

    const result = rotationPlugin.mapStateToProps(mockState, mockOwnProps);

    expect(result).toHaveProperty('containerId');
    expect(result).toHaveProperty('enabled');
    expect(result).toHaveProperty('open');
    expect(result).toHaveProperty('viewConfig');
  });
});
