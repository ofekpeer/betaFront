// src/pages/ShippingReturnsPage/ShippingReturnsPage.jsx
import './ShippingReturnsPage.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/footer/Footer';

export default function ShippingReturnsPage() {
  return (
    <div className="sr lp" dir="rtl">
      <NavBar />

      {/* HERO */}
      <header className="srHero">
        <div className="srHero__glow" />
        <div className="srHero__inner">
          <div className="srHero__kicker">
            <span className="srHero__dot" />
            ביתא • מדיניות משלוחים והחזרות
          </div>

          <h1 className="srHero__title">
            משלוחים והחזרות
            <span className="srHero__sub">ברור, קצר, ושקוף</span>
          </h1>

          <p className="srHero__lead">
            כאן תמצא את כל מה שצריך לדעת על זמני משלוח, עלויות, החזרות וביטולים.
            אם משהו לא ברור — דבר איתנו ונעזור מיד.
          </p>

          <div className="srHero__meta">
            <div className="srPill">עודכן לאחרונה: 28/02/2026</div>
            <div className="srPill">שירות לקוחות: betaelegant@gmail.com</div>
          </div>
        </div>
      </header>

      <main className="srMain">
        {/* Quick nav */}
        <aside className="srSide" aria-label="ניווט מדיניות">
          <div className="srSide__card">
            <div className="srSide__title">ניווט מהיר</div>
            <nav className="srNav">
              <a className="srNav__link" href="#shipping">
                משלוחים
              </a>
              <a className="srNav__link" href="#deliveryTime">
                זמני אספקה
              </a>
              <a className="srNav__link" href="#returns">
                החזרות וביטולים
              </a>
              <a className="srNav__link" href="#exceptions">
                חריגים
              </a>
              <a className="srNav__link" href="#contact">
                יצירת קשר
              </a>
            </nav>

            <div className="srSide__note">
              💡 טיפ: ניתן להדפיס את מדיניות המשלוחים וההחזרות דרך הדפדפן.
            </div>
          </div>
        </aside>

        {/* Content */}
        <section className="srContent" aria-label="תוכן מדיניות">
          <div className="srCard" id="shipping">
            <div className="srCard__head">
              <h2 className="srCard__title">משלוחים</h2>
              <div className="srCard__badge">🚚</div>
            </div>

            <div className="srGrid2">
              <div className="srInfo">
                <div className="srInfo__t">אפשרויות משלוח</div>
                <ul className="srList">
                  <li>שליח עד הבית / נקודת איסוף (לפי זמינות)</li>
                  <li>איסוף עצמי — בתיאום מראש</li>
                </ul>
              </div>

              <div className="srInfo">
                <div className="srInfo__t">עלויות משלוח</div>
                <ul className="srList">
                  <li>
                    עלות משלוח מוצגת בקופה לפני תשלום (משתנה לפי אזור/סוג משלוח)
                  </li>
                  <li>
                    סף למשלוח חינם: <b>250₪</b>
                  </li>
                </ul>
              </div>
            </div>

            <div className="srCallout">
              <div className="srCallout__icon">📍</div>
              <div>
                <div className="srCallout__t">כתובת מדויקת = הגעה מהירה</div>
                <div className="srCallout__p">
                  האחריות להזנת כתובת נכונה חלה על הלקוח. כתובת שגויה/אי־איסוף
                  עלולים לגרור חיוב נוסף.
                </div>
              </div>
            </div>
          </div>

          <div className="srCard" id="deliveryTime">
            <div className="srCard__head">
              <h2 className="srCard__title">זמני אספקה</h2>
              <div className="srCard__badge">⏱️</div>
            </div>

            <ol className="srList srList--ol">
              <li>
                זמן אספקה משוער: <b>2–5 ימי עסקים</b> מרגע אישור הזמנה.
              </li>
              <li>ימי עסקים אינם כוללים שישי, שבת, ערבי חג וחגים.</li>
              <li>
                בתקופות עומס/חגים/מצב בטחוני ייתכנו עיכובים שאינם בשליטתנו —
                נעדכן ככל האפשר.
              </li>
              <li>
                הזמנה הכוללת מוצר בהתאמה אישית עשויה לקחת יותר זמן (מופיע בעמוד
                המוצר/בשיחה איתנו).
              </li>
            </ol>

            <div className="srMiniNote">
              * זמני אספקה הם הערכה בלבד ועשויים להשתנות בהתאם לחברת השילוח
              וליעד.
            </div>
          </div>

          <div className="srCard" id="returns">
            <div className="srCard__head">
              <h2 className="srCard__title">החזרות וביטולים</h2>
              <div className="srCard__badge">↩️</div>
            </div>

            <div className="srSteps">
              <div className="srStep">
                <div className="srStep__n">01</div>
                <div className="srStep__t">פנייה אלינו</div>
                <div className="srStep__d">
                  פנו לשירות הלקוחות בתוך <b>14 ימים</b> מקבלת המוצר:
                  <b> betaelegant@gmail.com</b> / <b>0507487234</b>
                </div>
              </div>

              <div className="srStep">
                <div className="srStep__n">02</div>
                <div className="srStep__t">החזרת המוצר</div>
                <div className="srStep__d">
                  המוצר צריך להיות חדש, ללא שימוש, ובאריזתו המקורית (ככל שניתן),
                  בצירוף הוכחת רכישה.
                </div>
              </div>

              <div className="srStep">
                <div className="srStep__n">03</div>
                <div className="srStep__t">החזר כספי</div>
                <div className="srStep__d">
                  החזר כספי (אם זכאי) יתבצע לאמצעי התשלום שבו בוצעה העסקה, לפי
                  דין ותנאי העסק, בניכוי דמי משלוח/ביטול ככל שחלים.
                </div>
              </div>
            </div>

            <div className="srCallout srCallout--warm">
              <div className="srCallout__icon">🧾</div>
              <div>
                <div className="srCallout__t">דמי החזרה</div>
                <div className="srCallout__p">
                  עלות החזרת המוצר: <b>על חשבון הלקוח</b>. במקרה של תקלה/מוצר
                  פגום — נטפל בזה ונכוון אותך בצורה הכי נוחה.
                </div>
              </div>
            </div>
          </div>

          <div className="srCard" id="exceptions">
            <div className="srCard__head">
              <h2 className="srCard__title">חריגים חשובים</h2>
              <div className="srCard__badge">⚠️</div>
            </div>

            <ul className="srList">
              <li>
                מוצרים בהתאמה אישית/לפי בקשה מיוחדת — לרוב אינם ניתנים להחזרה
                (אלא אם הדין מחייב אחרת).
              </li>
              <li>מוצרים שנעשה בהם שימוש / נפגמו אצל הלקוח — לא יזוכו.</li>
              <li>
                מוצרים בעבודת יד וחומרים טבעיים עשויים לכלול הבדלי גוון/טקסטורה
                — זה לא נחשב פגם.
              </li>
            </ul>
          </div>

          <div className="srCard" id="contact">
            <div className="srCard__head">
              <h2 className="srCard__title">יצירת קשר</h2>
              <div className="srCard__badge">💬</div>
            </div>

            <div className="srContact">
              <div className="srRow">
                <span>אימייל:</span>
                <b>betaelegant@gmail.com</b>
              </div>
              <div className="srRow">
                <span>וואטסאפ:</span>
                <b>[0507487234]</b>
              </div>
              <div className="srRow">
                <span>שעות מענה:</span>
                <b>[א׳–ה׳ 09:00–21:00]</b>
              </div>

              <a className="srBtn" href="/">
                לדף הבית
              </a>
            </div>
          </div>

          <div className="srFoot">
            <div className="srFoot__line" />
            <div className="srFoot__text">
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
