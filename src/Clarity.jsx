import { useEffect } from 'react';

export default function Clarity() {
  useEffect(() => {
    const projectId = 'vezaok77zg'; // <-- תחליף למה שקיבלת ב-Clarity

    // לא לטעון פעמיים
    if (window.clarity) return;

    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', projectId);
  }, []);

  return null;
}
