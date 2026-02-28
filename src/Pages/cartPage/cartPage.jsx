import { useContext, useEffect, useMemo, useState } from 'react';
import './cartPage.css';
import { Store } from '../../Store';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import MaybeYouLikeAlso from '../../components/MaybeYouLikeAlso/MaybeYouLikeAlso';
import Laoding from '../../components/Loading/Loading';
import Footer from '../../components/footer/Footer';

export default function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { items, couponCN },
  } = state;

  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data.products);
        setRecommendations(res.data.products.slice(0, 3)); // דוגמה: בוחר את 4 המוצרים הראשונים כהמלצות
      } catch (error) {}
    };
    getProducts();
    const timeout = () =>
      setTimeout(() => {
        setPageLoading(false);
      }, 1000);
    timeout();
    return clearTimeout(timeout);
  }, []);

  const [coupon, setCoupon] = useState({ name: '', discount: 0 });
  const [couponMsg, setCouponMsg] = useState(null); // {type:'ok'|'err', text:''}

  // “אולי תאהב גם”

  const FREE_SHIP_FROM = 450; // סף משלוח חינם לדוגמה
  const shippingBase = 29;

  const subtotal = useMemo(
    () => items?.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items],
  );

  const discount = useMemo(() => {
    // קופון דמה: GOLD10 נותן 10% על subtotal
    if (couponCN )
      return Math.round(subtotal * (couponCN.discount/100));
    return 0;
  }, [couponCN, subtotal]);

  const shipping = useMemo(() => {
    if (items?.length === 0) return 0;
    return subtotal - discount >= FREE_SHIP_FROM ? 0 : shippingBase;
  }, [items?.length, subtotal, discount]);

  const total = useMemo(
    () => Math.max(0, subtotal - discount + shipping),
    [subtotal, discount, shipping],
  );

  const missingForFreeShip = useMemo(() => {
    const effective = subtotal - discount;
    return Math.max(0, FREE_SHIP_FROM - effective)?.toFixed(2);
  }, [subtotal, discount]);

  const clampQty = (n) => Math.max(1, Math.min(99, n));

  const inc = (i) => {
    const item = items.find(
      (it) => it._id === i._id && it.style === i.style && it.size === i.size,
    );

    ctxDispatch({
      type: 'ADD TO CART',
      payload: {
        ...item,
        quantity: 1,
      },
    });
  };

  const dec = (i) =>
    ctxDispatch({
      type: 'ADD TO CART',
      payload: {
        ...items.find(
          (it) =>
            it._id === i._id && it.style === i.style && it.size === i.size,
        ),
        quantity: Number(-1),
      },
    });

  const remove = (id) =>
    ctxDispatch({
      type: 'REMOVE FROM CART',
      payload: id,
    });

  const applyCoupon = async () => {
    const code = coupon?.name.trim().toUpperCase();
    if (!code) {
      setCouponMsg({ type: 'err', text: 'רשום קוד קופון כדי להפעיל.' });
      return;
    }
    try {
      const res = await axios.post('/api/coupon/checkCoupon', coupon);
      console.log(res.data);
      if (res.data) {
        console.log(res.data)
        ctxDispatch({
          type: 'ADD COUPON',
          payload: res.data,
        });
        setCouponMsg({ type: 'ok', text: `קופון הופעל חסכת ${res.data.discount}% ✅` });
      } else {
        setCouponMsg({ type: 'err', text: 'הקופון לא תקף / לא קיים.' });
      }
    } catch {
      setCouponMsg({ type: 'err', text: 'הקופון לא תקף / לא קיים.' });
    }
  };

  const goCheckout = () => {
    alert(`Checkout (דמו) ✅\nסכום לתשלום: ₪${total}`);
  };

  return pageLoading ? (
    <Laoding></Laoding>
  ) : (
    <div className="cp">
      <NavBar />
      <div className="cp__inner">
        <header className="cpHead">
          <div>
            <h1 className="cpHead__title">העגלה שלך</h1>
            <p className="cpHead__sub">
              {items?.length
                ? `יש לך ${items?.length} פריטים בעגלה.`
                : 'העגלה ריקה כרגע — בוא נמצא לך משהו יוקרתי 😄'}
            </p>
          </div>

          <a className="cpContinue" href="/#products">
            ← המשך לקנות
          </a>
        </header>

        {/* Progress / Free shipping */}
        {items?.length > 0 && (
          <section className="cpProgress" aria-label="Free shipping progress">
            {Number(missingForFreeShip) === 0 ? (
              <div className="cpProgress__text">🚚 זכית במשלוח חינם!</div>
            ) : (
              <div className="cpProgress__text">
                חסר לך <b>₪{missingForFreeShip}</b> למשלוח חינם
              </div>
            )}

            <div className="cpProgress__bar" aria-hidden="true">
              <div
                className="cpProgress__fill"
                style={{
                  width: `${Math.min(100, Math.round(((subtotal - discount) / FREE_SHIP_FROM) * 100))}%`,
                }}
              />
            </div>
          </section>
        )}

        <div className="cpGrid">
          {/* Items */}
          <section className="cpItems" aria-label="Cart items">
            {items?.length === 0 ? (
              <div className="cpEmpty">
                <div className="cpEmpty__icon">🛍️</div>
                <div className="cpEmpty__title">העגלה ריקה</div>
                <div className="cpEmpty__text">
                  בוא תראה את הקולקציה — יש דגמים שממש יושבים יפה בכניסה לבית.
                </div>
                <a className="cpBtn cpBtn--gold" href="/#products">
                  לקולקציה
                </a>
              </div>
            ) : (
              <>
                {items?.map((it) => (
                  <article key={it._id + it.size + it.style} className="cpItem">
                    <a
                      className="cpItem__imgWrap"
                      href={`/product/${it.name}`}
                      aria-label="למוצר"
                    >
                      <img
                        className="cpItem__img"
                        src={it.mainImage}
                        alt={it.name}
                      />
                    </a>

                    <div className="cpItem__mid">
                      <div className="cpItem__top">
                        <div>
                          <div className="cpItem__title">{it.name}</div>
                          <div className="cpItem__variant">
                            {it.size} / {it.style}
                          </div>
                        </div>

                        <button
                          className="cpIconBtn"
                          onClick={() => remove(it)}
                          aria-label="הסר פריט"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="cpItem__bottom">
                        <div
                          className="cpQty"
                          role="group"
                          aria-label="Quantity"
                        >
                          <button
                            className="cpQty__btn"
                            type="button"
                            onClick={() => dec(it)}
                            aria-label="הפחת כמות"
                          >
                            −
                          </button>
                          <input
                            className="cpQty__input"
                            value={it.quantity}
                            onChange={(e) => {
                              const n = Number(
                                String(e.target.value).replace(/[^\d]/g, ''),
                              );
                              ctxDispatch((prev) =>
                                prev.map((x) =>
                                  x._id === it._id &&
                                  x.style === it.style &&
                                  x.size === it.size
                                    ? {
                                        ...x,
                                        quantity: clampQty(
                                          Number.isFinite(n) ? n : 1,
                                        ),
                                      }
                                    : x,
                                ),
                              );
                            }}
                            inputMode="numeric"
                            aria-label="כמות"
                          />
                          <button
                            className="cpQty__btn"
                            type="button"
                            onClick={() => inc(it)}
                            aria-label="הוסף כמות"
                          >
                            +
                          </button>
                        </div>

                        <div className="cpPrice">
                          <div className="cpPrice__now">
                            ₪{(it.price * it.quantity).toFixed(2)}
                          </div>
                          {it.compareAt > it.price && (
                            <div className="cpPrice__old">
                              ₪{(it.compareAt * it.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>

                      {!it.inStock && (
                        <div className="cpWarn">⚠️ פריט זה אינו במלאי כרגע</div>
                      )}
                    </div>
                  </article>
                ))}

                {/* Coupon */}
                <div className="cpCoupon">
                  <div className="cpCoupon__title">קופון</div>
                  <div className="cpCoupon__row">
                    <input
                      className="cpInput"
                      value={coupon.name}
                      onChange={(e) => setCoupon({ name: e.target.value })}
                      placeholder="לדוגמה: BETA10"
                      aria-label="קוד קופון"
                    />
                    <button
                      className="cpBtn cpBtn--ghost"
                      type="button"
                      onClick={applyCoupon}
                    >
                      הפעל
                    </button>
                  </div>

                  {couponMsg && (
                    <div
                      className={`cpMsg ${couponMsg.type === 'ok' ? 'isOk' : 'isErr'}`}
                    >
                      {couponMsg.text}
                    </div>
                  )}
                </div>
              </>
            )}
          </section>

          {/* Summary */}
          <aside className="cpSummary" aria-label="Order summary">
            <div className="cpSummary__card">
              <div className="cpSummary__title">סיכום הזמנה</div>

              <div className="cpSumRow">
                <span>סכום ביניים</span>
                <b>₪{subtotal.toFixed(2)}</b>
              </div>

              <div className="cpSumRow">
                <span>הנחה</span>
                <b className={discount ? 'cpDiscount' : ''}>
                  − ₪{discount.toFixed(2)}
                </b>
              </div>

              <div className="cpSumRow">
                <span>משלוח</span>
                <b>{shipping === 0 ? 'חינם' : `₪${shipping}`}</b>
              </div>

              <div className="cpSumDivider" />

              <div className="cpSumTotal">
                <span>סה״כ לתשלום</span>
                <b>₪{total.toFixed(2)}</b>
              </div>

              <button
                className="cpBtn cpBtn--gold cpBtn--full bold"
                type="button"
                onClick={goCheckout}
                disabled={items?.length === 0}
              >
                מעבר לתשלום
              </button>

              <a className="cpBtn cpBtn--dark cpBtn--full" href="/#products">
                להוסיף עוד פריטים
              </a>

              <div className="cpNote">
                🔒 תשלום מאובטח • 🚚 משלוח מהיר • ✨ עבודת יד
              </div>
            </div>

            {/* Upsell */}
            <MaybeYouLikeAlso
              recommendations={recommendations}
            ></MaybeYouLikeAlso>
          </aside>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
