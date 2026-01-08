import { describe, it, expect } from 'vitest';
import translations from '../src/translations';

describe('translations', () => {
  it('should have English translations', () => {
    expect(translations.en).toBeDefined();
    expect(translations.en.hide).toBe('Hide rotation');
    expect(translations.en.show).toBe('Show rotation');
    expect(translations.en.revert).toBe('Revert');
    expect(translations.en.rotateLeft).toBe('Rotate 90\u00b0 left');
    expect(translations.en.rotateRight).toBe('Rotate 90\u00b0 right');
  });

  it('should have Japanese translations', () => {
    expect(translations.ja).toBeDefined();
    expect(translations.ja.hide).toBe('\u56de\u8ee2\u3092\u96a0\u3059');
    expect(translations.ja.show).toBe('\u56de\u8ee2\u3092\u8868\u793a');
    expect(translations.ja.revert).toBe('\u30ea\u30bb\u30c3\u30c8');
    expect(translations.ja.rotateLeft).toBe('\u5de6\u306b90\u5ea6\u56de\u8ee2');
    expect(translations.ja.rotateRight).toBe('\u53f3\u306b90\u5ea6\u56de\u8ee2');
  });

  it('should have all required keys in both languages', () => {
    const requiredKeys = [
      'collapse_close',
      'collapse_open',
      'help',
      'helpReset',
      'helpRotateLeft',
      'helpRotateRight',
      'helpSlider',
      'helpTitle',
      'hide',
      'init',
      'progress',
      'revert',
      'rotateLeft',
      'rotateRight',
      'show',
    ];

    requiredKeys.forEach((key) => {
      expect(translations.en[key]).toBeDefined();
      expect(translations.ja[key]).toBeDefined();
    });
  });
});
