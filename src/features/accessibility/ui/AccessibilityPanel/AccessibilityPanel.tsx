import React from 'react';
import { useAccessibility } from '../../model/context';
import type { FontSize, ColorScheme, LetterSpacing, LineSpacing } from '../../model/types';
import styles from './AccessibilityPanel.module.scss';

export const AccessibilityPanel: React.FC = () => {
  const {
    settings,
    isPanelOpen,
    togglePanel,
    updateFontSize,
    updateColorScheme,
    updateLetterSpacing,
    updateLineSpacing,
    toggleImages,
    resetSettings,
  } = useAccessibility();

  if (!isPanelOpen) {
    return null;
  }

  return (
    <div className={styles.panel} role="region" aria-label="Панель управления версией для слабовидящих">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Версия для слабовидящих</h2>
          <button
            onClick={togglePanel}
            className={styles.closeButton}
            aria-label="Закрыть панель"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {/* Размер шрифта */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Размер шрифта</h3>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => updateFontSize('small')}
                className={`${styles.button} ${settings.fontSize === 'small' ? styles.active : ''}`}
                aria-pressed={settings.fontSize === 'small'}
                type="button"
              >
                A
              </button>
              <button
                onClick={() => updateFontSize('medium')}
                className={`${styles.button} ${settings.fontSize === 'medium' ? styles.active : ''}`}
                aria-pressed={settings.fontSize === 'medium'}
                type="button"
              >
                A<sup>+</sup>
              </button>
              <button
                onClick={() => updateFontSize('large')}
                className={`${styles.button} ${settings.fontSize === 'large' ? styles.active : ''}`}
                aria-pressed={settings.fontSize === 'large'}
                type="button"
              >
                A<sup>++</sup>
              </button>
            </div>
          </div>

          {/* Цветовая схема */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Цветовая схема</h3>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => updateColorScheme('default')}
                className={`${styles.button} ${settings.colorScheme === 'default' ? styles.active : ''}`}
                aria-pressed={settings.colorScheme === 'default'}
                aria-label="Стандартная цветовая схема"
                type="button"
              >
                Ц
              </button>
              <button
                onClick={() => updateColorScheme('black-on-white')}
                className={`${styles.button} ${styles.blackOnWhite} ${
                  settings.colorScheme === 'black-on-white' ? styles.active : ''
                }`}
                aria-pressed={settings.colorScheme === 'black-on-white'}
                aria-label="Черным по белому"
                type="button"
              >
                Ч/Б
              </button>
              <button
                onClick={() => updateColorScheme('white-on-black')}
                className={`${styles.button} ${styles.whiteOnBlack} ${
                  settings.colorScheme === 'white-on-black' ? styles.active : ''
                }`}
                aria-pressed={settings.colorScheme === 'white-on-black'}
                aria-label="Белым по черному"
                type="button"
              >
                Б/Ч
              </button>
              <button
                onClick={() => updateColorScheme('blue-on-cyan')}
                className={`${styles.button} ${styles.blueOnCyan} ${
                  settings.colorScheme === 'blue-on-cyan' ? styles.active : ''
                }`}
                aria-pressed={settings.colorScheme === 'blue-on-cyan'}
                aria-label="Синим по голубому"
                type="button"
              >
                С/Г
              </button>
            </div>
          </div>

          {/* Межбуквенный интервал */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Межбуквенный интервал</h3>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => updateLetterSpacing('normal')}
                className={`${styles.button} ${settings.letterSpacing === 'normal' ? styles.active : ''}`}
                aria-pressed={settings.letterSpacing === 'normal'}
                type="button"
              >
                Обычный
              </button>
              <button
                onClick={() => updateLetterSpacing('medium')}
                className={`${styles.button} ${settings.letterSpacing === 'medium' ? styles.active : ''}`}
                aria-pressed={settings.letterSpacing === 'medium'}
                type="button"
              >
                Средний
              </button>
              <button
                onClick={() => updateLetterSpacing('large')}
                className={`${styles.button} ${settings.letterSpacing === 'large' ? styles.active : ''}`}
                aria-pressed={settings.letterSpacing === 'large'}
                type="button"
              >
                Большой
              </button>
            </div>
          </div>

          {/* Межстрочный интервал */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Межстрочный интервал</h3>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => updateLineSpacing('normal')}
                className={`${styles.button} ${settings.lineSpacing === 'normal' ? styles.active : ''}`}
                aria-pressed={settings.lineSpacing === 'normal'}
                type="button"
              >
                Обычный
              </button>
              <button
                onClick={() => updateLineSpacing('medium')}
                className={`${styles.button} ${settings.lineSpacing === 'medium' ? styles.active : ''}`}
                aria-pressed={settings.lineSpacing === 'medium'}
                type="button"
              >
                Средний
              </button>
              <button
                onClick={() => updateLineSpacing('large')}
                className={`${styles.button} ${settings.lineSpacing === 'large' ? styles.active : ''}`}
                aria-pressed={settings.lineSpacing === 'large'}
                type="button"
              >
                Большой
              </button>
            </div>
          </div>

          {/* Изображения */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Изображения</h3>
            <div className={styles.buttonGroup}>
              <button
                onClick={toggleImages}
                className={`${styles.button} ${styles.toggleButton} ${
                  settings.imagesEnabled ? styles.active : ''
                }`}
                aria-pressed={settings.imagesEnabled}
                type="button"
              >
                {settings.imagesEnabled ? 'Включены' : 'Выключены'}
              </button>
            </div>
          </div>

          {/* Сброс настроек */}
          <div className={styles.section}>
            <button onClick={resetSettings} className={`${styles.button} ${styles.resetButton}`} type="button">
              Сбросить настройки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
