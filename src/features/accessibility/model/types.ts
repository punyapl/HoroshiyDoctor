/**
 * Типы для функционала версии для слабовидящих
 * Соответствует требованиям ГОСТ Р 52872-2019
 */

export type FontSize = 'small' | 'medium' | 'large';
export type ColorScheme = 'default' | 'black-on-white' | 'white-on-black' | 'blue-on-cyan';
export type LetterSpacing = 'normal' | 'medium' | 'large';
export type LineSpacing = 'normal' | 'medium' | 'large';

export interface AccessibilitySettings {
  isEnabled: boolean;
  fontSize: FontSize;
  colorScheme: ColorScheme;
  letterSpacing: LetterSpacing;
  lineSpacing: LineSpacing;
  imagesEnabled: boolean;
}

export const DEFAULT_SETTINGS: AccessibilitySettings = {
  isEnabled: false,
  fontSize: 'small',
  colorScheme: 'default',
  letterSpacing: 'normal',
  lineSpacing: 'normal',
  imagesEnabled: true,
};

export const FONT_SIZE_VALUES: Record<FontSize, string> = {
  small: '100%',
  medium: '150%',
  large: '200%',
};

export const LETTER_SPACING_VALUES: Record<LetterSpacing, string> = {
  normal: 'normal',
  medium: '0.05em',
  large: '0.1em',
};

export const LINE_SPACING_VALUES: Record<LineSpacing, string> = {
  normal: '1.5',
  medium: '1.8',
  large: '2.2',
};
