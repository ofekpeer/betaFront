import './AboutUsPage.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/footer/Footer';
import { useEffect, useState } from 'react';

export default function AboutUsPage() {
  const [topCard, setTopCard] = useState(0); // לא -1

  useEffect(() => {
    const t = setInterval(() => {
      setTopCard((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(t);
  }, []);
  
  const cardStyle = (i) => ({
    opacity: topCard === i ? 1 : 0.35,      // 👈 רואים מאחור
    transition:  'opacity 0.3s ease-in-out',
    zIndex: topCard === i ? 10 : 1,
  });

  return (
    <div className="aboutV3 lp" dir="rtl">
      <NavBar />

      {/* HERO */}
      <section className="bHero">
        <div className="bHero__bg" />
        <div className="bHero__glow" />

        <div className="bHero__inner">
          <div className="bHero__copy">
            <div className="bKicker">
              <span className="bDot" />
              ביתא • עץ זית • אבן • עבודת יד
            </div>

            <h1 className="bH1">
              יוקרה שקטה
              <span className="bH1__sub">לבית שלך</span>
            </h1>

            <p className="bLead">
              אנחנו לא מנסים “לצעוק”. אנחנו בונים מוצר שמרגיש פרימיום: קצוות
              נקיים, צבע עמוק, וטקסטורה טבעית של עץ זית — כל יום מחדש.
            </p>

            <div className="bHero__row">
              <a className="btn btn--gold" href="/#products">
                לקולקציות
              </a>
              <a className="btn btn--ghost" href="/#about">
                מה מיוחד אצלנו?
              </a>
            </div>

            <div className="bMiniGrid">
              <div className="bMini">
                <div className="bMini__t">גימור</div>
                <div className="bMini__v">Smooth</div>
              </div>
              <div className="bMini">
                <div className="bMini__t">סגנון</div>
                <div className="bMini__v">Clean</div>
              </div>
              <div className="bMini">
                <div className="bMini__t">תחושה</div>
                <div className="bMini__v">Premium</div>
              </div>
            </div>
          </div>

          {/* Floating product stack (no images needed) */}
          <div className="bHero__art" aria-hidden="true">
            <div className="bStack">
              <div className="bCard3D bCard3D--1" style={cardStyle(0)} />
              <div className="bCard3D bCard3D--2" style={cardStyle(1)} />
              <div className="bCard3D bCard3D--3" style={cardStyle(2)} />

              <div className="bStamp">
                <div className="bStamp__top">BETA</div>
                <div className="bStamp__sub">HANDMADE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="bMain">
        {/* Brand promise */}
        <section className="bSection" id="about">
          <div className="bPromise">
            <div className="bPromise__left">
              <h2 className="bTitle">ההתחייבות שלנו</h2>
              <p className="bText">
                מוצר יפה זה טוב. מוצר שמרגיש פרימיום — זה מה שאנחנו בונים. לכן
                אנחנו עובדים בשכבות: חומר, צבע, ליטוש, הגנה.
              </p>

              <div className="bChecks">
                <div className="bCheck">✓ קצוות נקיים ודיוק בגימור</div>
                <div className="bCheck">✓ צבע עמוק בלי רעש</div>
                <div className="bCheck">✓ חומרים איכותיים + הגנה</div>
                <div className="bCheck">✓ אריזה שמרגישה מתנה</div>
              </div>
            </div>

            <div className="bPromise__right">
              <div className="bQuote">
                <div className="bQuote__mark">“</div>
                <div className="bQuote__text">
                  הפרטים הקטנים הם אלה שגורמים למוצר להיראות יקר.
                </div>
                <div className="bQuote__by">— ביתא</div>
              </div>
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="bSection">
          <div className="bHead">
            <h2 className="bTitle">מה ההבדל בפועל?</h2>
            <p className="bSub">שני כרטיסים שמסבירים למה זה נראה “פרימיום”.</p>
          </div>

          <div className="bBA">
            <div className="bBA__card">
              <div className="bBA__tag">לפני</div>
              <h3 className="bBA__t">רגיל</h3>
              <ul className="bBA__list">
                <li>גימור “בסדר” מרחוק</li>
                <li>קצוות לא תמיד חדים</li>
                <li>צבע שטוח/צועק</li>
              </ul>
            </div>

            <div className="bBA__card bBA__card--after">
              <div className="bBA__tag bBA__tag--after">אחרי</div>
              <h3 className="bBA__t">ביתא</h3>
              <ul className="bBA__list">
                <li>נראה יקר גם מקרוב</li>
                <li>קצוות נקיים + ליטוש</li>
                <li>עומק צבע מאוזן</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bSection">
          <div className="bHead">
            <h2 className="bTitle">תהליך קצר</h2>
            <p className="bSub">בלי חפירות — רק מה שחשוב.</p>
          </div>

          <div className="bProcess">
            <div className="bP">
              <div className="bP__n">01</div>
              <div className="bP__t">עץ זית</div>
              <div className="bP__d">בחירה והכנה של הטקסטורה.</div>
            </div>
            <div className="bP">
              <div className="bP__n">02</div>
              <div className="bP__t">שרף</div>
              <div className="bP__d">יציקה/מילוי בגוון נקי.</div>
            </div>
            <div className="bP">
              <div className="bP__n">03</div>
              <div className="bP__t">ליטוש</div>
              <div className="bP__d">מגע חלק + קצוות מדויקים.</div>
            </div>
            <div className="bP">
              <div className="bP__n">04</div>
              <div className="bP__t">הגנה</div>
              <div className="bP__d">שכבת הגנה לשימוש יומיומי.</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bSection">
          <div className="bCTA">
            <div className="bCTA__in">
              <h3 className="bCTA__t">רוצה לבחור את שלך?</h3>
              <p className="bCTA__p">
                בחר סגנון שמתאים לבית, ואנחנו נדאג לשאר.
              </p>
              <div className="bCTA__row">
                <a className="btn btn--gold" href="/#products">
                  לקולקציה
                </a>
                <a className="btn btn--dark" href="/#products">
                  קנייה עכשיו
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}
