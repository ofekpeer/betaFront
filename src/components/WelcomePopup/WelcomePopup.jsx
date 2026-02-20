import { useEffect, useMemo, useRef, useState } from 'react';
import './WelcomePopup.css';
import axios from 'axios';

function pad2(n) {
  return String(n).padStart(2, '0');
}

export default function WelcomePopup({
  storageKey = 'beita_welcome_popup_v2',
  // כמה זמן יש למבצע (בדקות) מרגע פתיחה ראשונה (באותו סשן)
  minutes = 10,
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [valid, setValid] = useState(true);
  const [err, setErr] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  // פותחים רק פעם אחת לכל session
  useEffect(() => {
    try {
      const isOpened = sessionStorage.getItem(storageKey);
      setOpen(!isOpened);
    } catch {
      setOpen(true);
    }
  }, [storageKey]);

  // ספירה לאחור (רק כשהפופאפ פתוח)
  useEffect(() => {
    if (!open) return;

    // פעם ראשונה שפותחים בסשן — אפשר גם לשמור deadline בסשן כדי לא לאפס אם סוגרים/פותחים
    // נשמור deadline קבוע
    let deadline = null;
    try {
      const raw = sessionStorage.getItem(`${storageKey}_deadline`);
      deadline = raw ? Number(raw) : null;
    } catch {}

    if (!deadline || !Number.isFinite(deadline)) {
      deadline = Date.now() + minutes * 60 * 1000;
      try {
        sessionStorage.setItem(`${storageKey}_deadline`, String(deadline));
      } catch {}
    }

    const tick = () => {
      const left = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) {
        // אפשר לסגור אוטומטית או להשאיר
         setOpen(false);
      }
    };

    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [open, minutes, storageKey]);

  // ESC + נעילת גלילה
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close(false);
    };
    document.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const close = (markOpened = true) => {
    setOpen(false);
    if (markOpened) {
      try {
        sessionStorage.setItem(storageKey, '1');
      } catch {}
    }
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', {
        name: name,
        email: email,
        registerDate: Date.now().toString(),
      });
      console.log(res);
      if (res.status === 200) {
        setValid(true);
        sessionStorage.setItem('register', res.data);
        close(true);
      }
    } catch (err) {
      setErr(err.response.data.message);
      const timer = setValid(false);
      setTimeout(() => {
        setValid(true);
      }, 2000);
      return () => clearTimeout(timer);
    } 
  };

  if (!open) return null;

  return (
    <div
      className="wpOverlay"
      role="dialog"
      aria-modal="true"
      aria-label="פופאפ הנחה"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close(true);
      }}
    >
      <div className="wpCard" onMouseDown={(e) => e.stopPropagation()}>
        <button
          className="wpClose"
          aria-label="סגור"
          onClick={() => close(true)}
        >
          ✕
        </button>

        {/* Border dashed like the example */}
        <div className="wpInner">
          <div className="wpTop">
            <div className="wpTitle">
              רגע! קבלו <span className="wpHighlight">10% הנחה</span> כבר עכשיו
            </div>
            <div className="wpSub">
              רוצים לקבל קופון הנחה? השאירו את המייל שלכם למטה — ההצעה תיעלם
              בעוד…
            </div>
          </div>

          <div className="wpTimer" aria-label="טיימר">
            <div className="wpTimeBox">
              <div className="wpTimeNum">{pad2(mins)}</div>
              <div className="wpTimeLabel">דקות</div>
            </div>

            <div className="wpColon">:</div>

            <div className="wpTimeBox">
              <div className="wpTimeNum">{pad2(secs)}</div>
              <div className="wpTimeLabel">שניות</div>
            </div>
          </div>

          <form className="wpForm" onSubmit={onSubmit}>
            <input
              className="wpInput"
              type=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="מייל"
              required
            />
            <input
              className="wpInput"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="שם"
              required
            />

            <button className="wpBtn wpBtn--cta" type="submit">
              אני רוצה להשתמש בקופון
            </button>
            {!valid ? (
              <div className="err">
                {' '}
                <p>{err}</p>
              </div>
            ) : (
              ''
            )}

            <div className="wpFine">(בקנייה מעל 99 ש״ח)</div>
          </form>
        </div>
      </div>
    </div>
  );
}
