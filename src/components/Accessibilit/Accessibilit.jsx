import { useEffect, useMemo, useState } from 'react';

const LS_KEY = 'a11y_settings_v1';

const defaultSettings = {
  fontScale: 1, // 1 = 100%
  highContrast: false,
  reduceMotion: false,
  focusRing: true,
};

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const root = useMemo(() => document.documentElement, []);

  // Apply settings to <html> as CSS vars + classes
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(settings));
    } catch {}

    root.style.setProperty('--a11y-font-scale', String(settings.fontScale));
    root.classList.toggle('a11y-contrast', settings.highContrast);
    root.classList.toggle('a11y-reduce-motion', settings.reduceMotion);
    root.classList.toggle('a11y-focus-ring', settings.focusRing);

    // If reduce motion enabled, also inform the browser
    // (Some browsers read prefers-reduced-motion only from OS, but this still helps by CSS class)
  }, [settings, root]);

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const incFont = () =>
    setSettings((s) => ({
      ...s,
      fontScale: Math.min(1.25, +(s.fontScale + 0.05).toFixed(2)),
    }));
  const decFont = () =>
    setSettings((s) => ({
      ...s,
      fontScale: Math.max(0.9, +(s.fontScale - 0.05).toFixed(2)),
    }));

  const reset = () => setSettings(defaultSettings);

  return (
    <>
      {/* Skip link (put it once globally) */}
      <a className="a11y-skip" href="#mainContent">
        דלג לתוכן
      </a>

      {/* Floating button */}
      <button
        type="button"
        className="a11y-fab"
        aria-label="נגישות"
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((v) => !v)}
      >
        <img src="/icons/accessible.svg" alt="אייקון נגישות" />
      </button>

      {/* Overlay */}
      <div
        className={`a11y-overlay ${open ? 'isOpen' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        id="a11y-panel"
        className={`a11y-panel ${open ? 'isOpen' : ''}`}
        aria-label="הגדרות נגישות"
      >
        <div className="a11y-head">
          <div className="a11y-title">נגישות</div>
          <button
            className="a11y-x"
            onClick={() => setOpen(false)}
            aria-label="סגור"
          >
            ✕
          </button>
        </div>

        <div className="a11y-row">
          <span>גודל טקסט</span>
          <div className="a11y-controls">
            <button
              className="a11y-btn"
              onClick={decFont}
              aria-label="הקטן טקסט"
            >
              A-
            </button>
            <button
              className="a11y-btn"
              onClick={incFont}
              aria-label="הגדל טקסט"
            >
              A+
            </button>
          </div>
        </div>

        <label className="a11y-toggle">
          <input
            type="checkbox"
            checked={settings.highContrast}
            onChange={(e) =>
              setSettings((s) => ({ ...s, highContrast: e.target.checked }))
            }
          />
          <span>ניגודיות גבוהה</span>
        </label>

        <label className="a11y-toggle">
          <input
            type="checkbox"
            checked={settings.reduceMotion}
            onChange={(e) =>
              setSettings((s) => ({ ...s, reduceMotion: e.target.checked }))
            }
          />
          <span>הפחתת אנימציות</span>
        </label>

        <label className="a11y-toggle">
          <input
            type="checkbox"
            checked={settings.focusRing}
            onChange={(e) =>
              setSettings((s) => ({ ...s, focusRing: e.target.checked }))
            }
          />
          <span>הדגשת פוקוס</span>
        </label>

        <button className="a11y-reset" onClick={reset}>
          איפוס
        </button>
      </aside>
    </>
  );
}
