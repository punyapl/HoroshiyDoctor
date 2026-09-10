import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { AccessibilitySettings, FontSize, ColorScheme, LetterSpacing, LineSpacing } from './types';
import { DEFAULT_SETTINGS } from './types';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  isPanelOpen: boolean;
  togglePanel: () => void;
  updateFontSize: (size: FontSize) => void;
  updateColorScheme: (scheme: ColorScheme) => void;
  updateLetterSpacing: (spacing: LetterSpacing) => void;
  updateLineSpacing: (spacing: LineSpacing) => void;
  toggleImages: () => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Применение настроек к документу
  useEffect(() => {
    const root = document.documentElement;

    if (settings.isEnabled) {
      root.setAttribute('data-accessibility', 'enabled');
      root.setAttribute('data-font-size', settings.fontSize);
      root.setAttribute('data-color-scheme', settings.colorScheme);
      root.setAttribute('data-letter-spacing', settings.letterSpacing);
      root.setAttribute('data-line-spacing', settings.lineSpacing);
      root.setAttribute('data-images', settings.imagesEnabled ? 'enabled' : 'disabled');
    } else {
      root.removeAttribute('data-accessibility');
      root.removeAttribute('data-font-size');
      root.removeAttribute('data-color-scheme');
      root.removeAttribute('data-letter-spacing');
      root.removeAttribute('data-line-spacing');
      root.removeAttribute('data-images');
    }
  }, [settings]);

  const togglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  const updateFontSize = useCallback((size: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize: size, isEnabled: true }));
  }, []);

  const updateColorScheme = useCallback((scheme: ColorScheme) => {
    setSettings((prev) => ({ ...prev, colorScheme: scheme, isEnabled: true }));
  }, []);

  const updateLetterSpacing = useCallback((spacing: LetterSpacing) => {
    setSettings((prev) => ({ ...prev, letterSpacing: spacing, isEnabled: true }));
  }, []);

  const updateLineSpacing = useCallback((spacing: LineSpacing) => {
    setSettings((prev) => ({ ...prev, lineSpacing: spacing, isEnabled: true }));
  }, []);

  const toggleImages = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      imagesEnabled: !prev.imagesEnabled,
      isEnabled: true,
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setIsPanelOpen(false);
  }, []);

  const value: AccessibilityContextType = {
    settings,
    isPanelOpen,
    togglePanel,
    updateFontSize,
    updateColorScheme,
    updateLetterSpacing,
    updateLineSpacing,
    toggleImages,
    resetSettings,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility должен использоваться внутри AccessibilityProvider');
  }
  return context;
};
