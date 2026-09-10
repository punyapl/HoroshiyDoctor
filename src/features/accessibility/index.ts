export { AccessibilityProvider, useAccessibility } from './model/context';
export { AccessibilityPanel } from './ui/AccessibilityPanel/AccessibilityPanel';
export { AccessibilityButton } from './ui/AccessibilityButton/AccessibilityButton';
export type {
  AccessibilitySettings,
  FontSize,
  ColorScheme,
  LetterSpacing,
  LineSpacing,
} from './model/types';

// Импорт глобальных стилей
import './styles/accessibility.scss';
