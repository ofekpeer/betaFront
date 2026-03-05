// src/pages/CheckoutPage/CheckoutPage.jsx
import { useContext, useEffect, useMemo, useState } from 'react';
import './CheckoutPage.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/footer/Footer';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';

const clampQty = (n) => Math.max(1, Math.min(99, n));

export default function CheckoutPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { items, couponCN },
  } = state;

  // ===== form state =====
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [gmail, setGmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const [deliveryMethod, setDeliveryMethod] = useState('courier'); // courier | pickup
  const [paymentMethod, setPaymentMethod] = useState('card'); // card | bit | cash
  const [note, setNote] = useState('');

  // ===== pricing =====
  const FREE_SHIP_FROM = 250;
  const SHIPPING_COURIER = 30;
  const SHIPPING_PICKUP = 0;

  const navigate = useNavigate();
  useEffect(() => {
    console.log(couponCN.discount);
    if (!state.cart.items || state.cart.items.length === 0) {
      navigate('/cart');
    }
  }, [state.cart.items, navigate]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + Number(it.price) * it.quantity, 0);
  }, [items]);

  const discount = useMemo(() => {
    // קופון דמה: GOLD10 נותן 10% על subtotal
    if (couponCN) return (subtotal * (couponCN.discount / 100)).toFixed(2);
    return 0;
  }, [couponCN, subtotal]);

  const shipping = useMemo(() => {
    if (items.length === 0) return 0;
    if (deliveryMethod === 'pickup') return SHIPPING_PICKUP;
    return subtotal >= FREE_SHIP_FROM ? 0 : SHIPPING_COURIER;
  }, [items.length, deliveryMethod, subtotal]);

  const total = useMemo(
    () => Math.max(0, subtotal - discount + shipping).toFixed(2),
    [subtotal, discount, shipping],
  );

  // ===== actions =====
  const inc = (i) => {
    const item = items.find(
      (it) => it._id === i._id && it.size === i.size && it.style === i.style,
    );
    if (!item) return;
    ctxDispatch({ type: 'ADD TO CART', payload: { ...item, quantity: 1 } });
  };

  const dec = (i) => {
    const item = items.find(
      (it) => it._id === i._id && it.size === i.size && it.style === i.style,
    );
    if (!item) return;
    ctxDispatch({ type: 'ADD TO CART', payload: { ...item, quantity: -1 } });
  };

  const remove = (i) => {
    ctxDispatch({ type: 'REMOVE FROM CART', payload: i });
  };

  const validate = () => {
    if (items.length === 0) return 'העגלה ריקה.';
    if (!fullName.trim()) return 'חסר שם מלא.';
    if (!phone.trim()) return 'חסר טלפון.';
    if (!gmail.trim()) return 'חסר אימייל.';
    if (deliveryMethod === 'courier') {
      if (!city.trim()) return 'חסר עיר.';
      if (!address.trim()) return 'חסרה כתובת.';
    }
    return null;
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    window.location.href =
      'https://icom.yaad.net/p/?Masof=5603960631&Amount=50&ClientName=Ofek&Info=Order123&PassP=ofekpeerPpi30672&action=pay';
  };

  return (
    <div className="ck lp" dir="rtl">
      <NavBar />

      <header className="ckHero">
        <div className="ckHero__glow" />
        <div className="ckHero__inner">
          <div className="ckHero__kicker">
            <span className="ckDot" />
            ביתא • Checkout
          </div>

          <h1 className="ckHero__title">
            סיום הזמנה
            <span className="ckHero__sub">עוד רגע וזה אצלך</span>
          </h1>

          <div className="ckSteps" aria-label="Steps">
            <div className="ckStep isActive">
              <span className="ckStep__n">1</span> עגלה
            </div>
            <div className="ckStep isActive">
              <span className="ckStep__n">2</span> פרטים
            </div>
            <div className="ckStep">
              <span className="ckStep__n">3</span> תשלום
            </div>
          </div>
        </div>
      </header>

      <main className="ckMain">
        {/* LEFT: form */}
        <section className="ckCol" aria-label="Checkout form">
          <form className="ckCard" onSubmit={onSubmit}>
            <div className="ckCard__head">
              <h2 className="ckCard__title">פרטי לקוח</h2>
              <div className="ckBadge">🧾</div>
            </div>

            <div className="ckGrid2">
              <label className="ckField">
                <span className="ckLabel">שם מלא</span>
                <input
                  className="ckInput"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ישראל ישראלי"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="ckField">
                <span className="ckLabel">טלפון</span>
                <input
                  className="ckInput"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05X-XXXXXXX"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                />
              </label>

              <label className="ckField ckField--full">
                <span className="ckLabel">אימייל</span>
                <input
                  className="ckInput"
                  value={gmail}
                  onChange={(e) => setGmail(e.target.value)}
                  placeholder="name@email.com"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <div className="ckDivider" />

            <div className="ckCard__head">
              <h2 className="ckCard__title">משלוח</h2>
              <div className="ckBadge">🚚</div>
            </div>

            <div
              className="ckChoices"
              role="radiogroup"
              aria-label="Delivery method"
            >
              <button
                type="button"
                className={`ckChoice ${deliveryMethod === 'courier' ? 'isActive' : ''}`}
                onClick={() => setDeliveryMethod('courier')}
              >
                <div className="ckChoice__t">שליח עד הבית</div>
                <div className="ckChoice__d">נוח ומהיר (לפי אזור)</div>
              </button>

              <button
                type="button"
                className={`ckChoice ${deliveryMethod === 'pickup' ? 'isActive' : ''}`}
                onClick={() => setDeliveryMethod('pickup')}
              >
                <div className="ckChoice__t">איסוף עצמי</div>
                <div className="ckChoice__d">בתיאום מראש • ללא עלות משלוח</div>
              </button>
            </div>

            {deliveryMethod === 'courier' && (
              <div className="ckGrid2">
                <label className="ckField">
                  <span className="ckLabel">עיר</span>
                  <input
                    className="ckInput"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="תל אביב"
                    autoComplete="address-level2"
                    required
                  />
                </label>

                <label className="ckField">
                  <span className="ckLabel">מיקוד (אופציונלי)</span>
                  <input
                    className="ckInput"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="1234567"
                    inputMode="numeric"
                    autoComplete="postal-code"
                  />
                </label>

                <label className="ckField ckField--full">
                  <span className="ckLabel">כתובת</span>
                  <input
                    className="ckInput"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="רחוב • מספר • דירה"
                    autoComplete="street-address"
                    required
                  />
                </label>
              </div>
            )}

            <div className="ckDivider" />

            <div className="ckCard__head">
              <h2 className="ckCard__title">תשלום</h2>
              <div className="ckBadge">💳</div>
            </div>

            <div
              className="ckChoices"
              role="radiogroup"
              aria-label="Payment method"
            >
              <button
                type="button"
                className={`ckChoice ${paymentMethod === 'card' ? 'isActive' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="ckChoice__t">כרטיס אשראי</div>
                <div className="ckChoice__d">מאובטח (לא זמין כעת)</div>
              </button>

              <button
                type="button"
                className={`ckChoice ${paymentMethod === 'bit' ? 'isActive' : ''}`}
                onClick={() => setPaymentMethod('bit')}
              >
                <div className="ckChoice__t">Bit / PayBox</div>
                <div className="ckChoice__d">מהיר</div>
              </button>

              <button
                type="button"
                className={`ckChoice ${paymentMethod === 'cash' ? 'isActive' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <div className="ckChoice__t">להזמנה בוואטצפ</div>
                <div className="ckChoice__d">נוח</div>
              </button>
            </div>

            <label className="ckField">
              <span className="ckLabel">הערה להזמנה (אופציונלי)</span>
              <textarea
                className="ckTextarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="לדוגמה: להשאיר ליד הדלת / להתקשר לפני הגעה..."
                rows={3}
              />
            </label>

            <div className="ckActions">
              <button className="ckBtn ckBtn--gold" type="submit">
                ✅מעבר לתשלום
              </button>
              <a className="ckBtn ckBtn--dark" href="/cart">
                ← חזרה לעגלה
              </a>
            </div>

            <div className="ckLock">
              🔒 התשלום והמחירים נסגרים בשרת לפני חיוב — אין משמעות לשינויים
              בלוקל סטורג.
            </div>
          </form>
        </section>

        {/* RIGHT: summary */}
        <aside className="ckAside" aria-label="Order summary">
          <div className="ckCard ckCard--sticky">
            <div className="ckCard__head">
              <h2 className="ckCard__title">סיכום הזמנה</h2>
              <div className="ckBadge">🛒</div>
            </div>

            {items.length === 0 ? (
              <div className="ckEmpty">
                <div className="ckEmpty__icon">🛍️</div>
                <div className="ckEmpty__t">העגלה ריקה</div>
                <div className="ckEmpty__p">חזור לקולקציה ובחר משהו שווה.</div>
                <a className="ckBtn ckBtn--gold ckBtn--full" href="/#products">
                  לקולקציות
                </a>
              </div>
            ) : (
              <>
                <div className="ckItems">
                  {items.map((it) => (
                    <article
                      key={`${it._id}-${it.size}-${it.style}`}
                      className="ckItem"
                    >
                      <a
                        className="ckItem__imgWrap"
                        href={`/product/${it.name}`}
                        aria-label="למוצר"
                      >
                        <img
                          className="ckItem__img"
                          src={it.mainImage}
                          alt={it.name}
                        />
                      </a>

                      <div className="ckItem__mid">
                        <div className="ckItem__top">
                          <div className="ckItem__title">{it.name}</div>
                          <button
                            className="ckX"
                            type="button"
                            onClick={() => remove(it)}
                            aria-label="הסר"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="ckItem__sub">
                          {it.size} / {it.style}
                        </div>

                        <div className="ckItem__row">
                          <div className="ckQty">
                            <button
                              type="button"
                              className="ckQty__btn"
                              onClick={() => dec(it)}
                              aria-label="הפחת"
                            >
                              −
                            </button>
                            <div className="ckQty__n">
                              {clampQty(it.quantity)}
                            </div>
                            <button
                              type="button"
                              className="ckQty__btn"
                              onClick={() => inc(it)}
                              aria-label="הוסף"
                            >
                              +
                            </button>
                          </div>

                          <div className="ckItem__price">
                            ₪{(Number(it.price) * it.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="ckSum">
                  <div className="ckRow">
                    <span>סכום ביניים</span>
                    <b>₪{subtotal.toFixed(2)}</b>
                  </div>

                  <div className="ckRow">
                    <span>משלוח</span>
                    <b>{shipping === 0 ? 'חינם' : `₪${shipping}`}</b>
                  </div>

                  <div className="ckRow green">
                    <span>הנחה</span>
                    <b>{couponCN.discount ? `₪${discount}` : `₪0`}</b>
                  </div>

                  <div className="ckHr" />

                  <div className="ckTotal">
                    <span>סה״כ</span>
                    <b>₪{total}</b>
                  </div>

                  {deliveryMethod === 'courier' &&
                    subtotal < FREE_SHIP_FROM && (
                      <div className="ckTip">
                        💡 חסר לך{' '}
                        <b>₪{(FREE_SHIP_FROM - subtotal).toFixed(2)}</b> למשלוח
                        חינם.
                      </div>
                    )}
                </div>
              </>
            )}
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
