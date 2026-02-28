// src/pages/PolicyPage/PolicyPage.jsx
import './PolicyPage.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/footer/Footer';

export default function PolicyPage() {
  return (
    <div className="policy lp" dir="rtl">
      <NavBar />

      {/* HERO */}
      <header className="policyHero">
        <div className="policyHero__glow" />
        <div className="policyHero__inner">
          <div className="policyHero__kicker">
            <span className="policyHero__dot" />
            ביתא • תקנון האתר
          </div>

          <h1 className="policyHero__title">
            תקנון האתר
            <span className="policyHero__sub">תנאי שימוש • רכישה • פרטיות</span>
          </h1>

          <p className="policyHero__lead">
            כאן תמצא את כל המידע על רכישה, משלוחים, החזרות ושימוש באתר. אנחנו
            משתדלים לשמור על זה קצר, ברור ושקוף.
          </p>

          <div className="policyHero__meta">
            <div className="policyPill">עודכן לאחרונה: 28/02/2026</div>
            <div className="policyPill">
              שירות לקוחות: betaelegant@gmail.com
            </div>
            <div className="policyPill">טלפון: 0507487234</div>
          </div>
        </div>
      </header>

      <main className="policyMain">
        {/* Quick nav */}
        <aside className="policySide" aria-label="ניווט תקנון">
          <div className="policySide__card">
            <div className="policySide__title">ניווט מהיר</div>
            <nav className="policyNav">
              <a className="policyNav__link" href="#general">
                כללי
              </a>
              <a className="policyNav__link" href="#purchase">
                רכישה ותשלום
              </a>
              <a className="policyNav__link" href="#shipping">
                משלוחים
              </a>
              <a className="policyNav__link" href="#returns">
                ביטול והחזרות
              </a>
              <a className="policyNav__link" href="#privacy">
                פרטיות
              </a>
              <a className="policyNav__link" href="#contact">
                יצירת קשר
              </a>
            </nav>
            <div className="policySide__note">
              💡 טיפ: אפשר להדפיס את הדף הזה דרך הדפדפן.
            </div>
          </div>
        </aside>

        {/* Content */}
        <section className="policyContent" aria-label="תוכן תקנון">
          <div className="policyCard" id="general">
            <div className="policyCard__head">
              <h2 className="policyCard__title">1) כללי</h2>
              <div className="policyCard__badge">חשוב</div>
            </div>
            <ol className="policyList">
              <li>
                אתר “ביתא” (להלן: “האתר”) מופעל על ידי <b>ביתא</b> (להלן:
                “העסק”).
              </li>
              <li>
                שימוש באתר, גלישה ו/או רכישה מהווים הסכמה לתקנון זה במלואו.
              </li>
              <li>
                התקנון מנוסח בלשון זכר מטעמי נוחות בלבד ומתייחס לכל המינים.
              </li>
              <li>
                העסק רשאי לעדכן תקנון זה מעת לעת. התקנון המחייב הוא התקנון
                המופיע באתר במועד השימוש.
              </li>
            </ol>
          </div>

          <div className="policyCard" id="purchase">
            <div className="policyCard__head">
              <h2 className="policyCard__title">2) רכישה ותשלום</h2>
            </div>
            <ol className="policyList">
              <li>המחירים באתר מוצגים בש״ח וכוללים מע״מ בהתאם לסטטוס</li>
              <li>
                התשלום מתבצע באמצעי התשלום המוצעים באתר, וכפוף לאישור חברת
                האשראי/ספק הסליקה.
              </li>
              <li>
                ייתכנו טעויות בתיאור/מחיר/זמינות. במקרה כזה, הנתונים המחייבים הם
                אלו שאושרו על ידי העסק במעמד עיבוד ההזמנה.
              </li>
              <li>
                קופונים והטבות תקפים לפי תנאיהם (תוקף, מינימום הזמנה, כפל מבצעים
                וכו׳) ויאושרו סופית בעת עיבוד ההזמנה.
              </li>
            </ol>

            <div className="policyCallout">
              <div className="policyCallout__icon">🔒</div>
              <div>
                <div className="policyCallout__t">אבטחת תשלום</div>
                <div className="policyCallout__p">
                  פרטי תשלום מעובדים אצל ספק הסליקה. העסק אינו שומר פרטי כרטיס
                  מלאים.
                </div>
              </div>
            </div>
          </div>

          <div className="policyCard" id="shipping">
            <div className="policyCard__head">
              <h2 className="policyCard__title">3) משלוחים ואספקה</h2>
            </div>
            <ol className="policyList">
              <li>
                זמני אספקה: <b>5-2 ימי עסקים</b> אלא אם צוין אחרת בעמוד
                המוצר/במעמד ההזמנה.
              </li>
              <li>ימי עסקים אינם כוללים שישי, שבת, ערבי חג וחגים.</li>
              <li>
                עלויות משלוח יוצגו במעמד התשלום, אלא אם צוין “משלוח חינם”.
              </li>
              <li>
                ייתכנו עיכובים שאינם בשליטת העסק (חברת שילוח/עומסים/כוח עליון).
              </li>
              <li>
                האחריות להזנת כתובת נכונה חלה על הלקוח. כתובת שגויה/אי־איסוף
                עלולים לגרור חיוב נוסף.
              </li>
            </ol>
          </div>

          <div className="policyCard" id="returns">
            <div className="policyCard__head">
              <h2 className="policyCard__title">4) ביטול עסקה והחזרות</h2>
            </div>
            <ol className="policyList">
              <li>
                ניתן לבטל עסקה בהתאם לחוק הגנת הצרכן והתקנות הרלוונטיות, ובכפוף
                להחזרת המוצר כשהוא חדש, ללא שימוש, ובאריזתו המקורית (ככל שניתן).
              </li>
              <li>
                לא ניתן להחזיר/לבטל מוצרים שיוצרו בהתאמה אישית או לפי בקשת
                הלקוח, אלא אם הדין מחייב אחרת.
              </li>
              <li>
                יש לפנות לשירות הלקוחות בתוך <b>14 ימים</b> ממועד קבלת המוצר:{' '}
                <b>[אימייל/וואטסאפ]</b>.
              </li>
              <li>
                החזר כספי (אם זכאי) יתבצע לאמצעי התשלום בו בוצעה העסקה, בניכוי
                דמי ביטול/משלוח לפי דין ותנאי העסק, ככל שחלים.
              </li>
              <li>
                עלות החזרת המוצר:{' '}
                <b>[על חשבון הלקוח / על חשבון העסק במקרה תקלה]</b>.
              </li>
            </ol>

            <div className="policyCallout policyCallout--warm">
              <div className="policyCallout__icon">📦</div>
              <div>
                <div className="policyCallout__t">מוצרים בעבודת יד</div>
                <div className="policyCallout__p">
                  ייתכנו הבדלים קטנים בגוון/טקסטורה — זו בדיוק הייחודיות של מוצר
                  בעבודת יד וחומרים טבעיים.
                </div>
              </div>
            </div>
          </div>

          <div className="policyCard" id="privacy">
            <div className="policyCard__head">
              <h2 className="policyCard__title">5) פרטיות ואחסון מידע</h2>
            </div>
            <ol className="policyList">
              <li>
                העסק מכבד את פרטיות המשתמשים. מידע שנמסר בעת רכישה/פנייה ישמש
                לצורך טיפול בהזמנות, שירות לקוחות ושיפור חוויית המשתמש.
              </li>
              <li>
                האתר עשוי להשתמש בעוגיות (Cookies) ואחסון מקומי בדפדפן לצורך
                תפעול האתר ושיפור חוויית שימוש.
              </li>
              <li>
                ניתן לפנות להסרת פרטים/עדכון פרטים בכתובת:{' '}
                <b>betaelegant@gmail.com</b>.
              </li>
            </ol>
          </div>

          <div className="policyCard" id="contact">
            <div className="policyCard__head">
              <h2 className="policyCard__title">6) יצירת קשר</h2>
            </div>
            <div className="policyContact">
              <div className="policyContact__row">
                <span>שם העסק:</span>
                <b>ביתא</b>
              </div>
              <div className="policyContact__row">
                <span>אימייל:</span>
                <b>betaelegant@gmail.com</b>
              </div>
              <div className="policyContact__row">
                <span>וואטסאפ/טלפון:</span>
                <b>[0507487234]</b>
              </div>
              <div className="policyContact__row">
                <span>כתובת:</span>
                <b>[משה לוי 3 רמלה]</b>
              </div>

              <a className="policyBtn" href="/">
                חזרה לדף הבית{' '}
              </a>
            </div>
          </div>

          <div className="policyFoot">
            <div className="policyFoot__line" />
            <div className="policyFoot__text">
              המדיניות כפופה לדין הישראלי ולחוק הגנת הצרכן. במקרה של סתירה —
              הדין גובר.
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
