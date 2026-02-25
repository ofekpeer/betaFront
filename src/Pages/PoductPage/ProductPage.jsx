import { useContext, useEffect, useMemo, useState } from 'react';
import './ProductPage.css';
import NavBar from '../../components/NavBar/NavBar';
import { useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import Laoding from '../../components/Loading/Loading';
import Footer from '../../components/footer/Footer';
import FloatingProducts from '../../components/floatingProducts/FloatingProducts';

export default function ProductPage() {
  const { name } = useParams();
  const [product, setProduct] = useState({}); // תחליף ל-1 כדי לקבל את המוצר הראשון, או קבל את ה-ID מה-URL עם useParams

  const [activeImage, setActiveImage] = useState(''); // תחליף ל-product.mainImage אחרי שתקבל את המוצר
  const [size, setSize] = useState('');
  const [style, setStyle] = useState('');
  const [qty, setQty] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { items },
  } = state;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProduct(res.data.products.find((p) => p.name === name)); // מצא את המוצר עם ה-ID המתאים
        console.log('Products response:', name);
        setActiveImage(
          res.data.products.find((p) => p.name === name)?.mainImage || '',
        );
        setSize(
          res.data.products.find((p) => p.name === name)?.options.size[0],
        );
        setStyle(
          res.data.products.find((p) => p.name === name)?.options.style[0],
        );
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    getProducts();
    const timeout = () =>
      setTimeout(() => {
        setPageLoading(false);
      }, 1000);
    timeout();
    return clearTimeout(timeout);
  }, []);

  const discountPct = useMemo(() => {
    if (!product?.compareAt || product?.compareAt <= product.price) return 0;
    return Math.round(
      ((product?.compareAt - product.price) / product?.compareAt) * 100,
    );
  }, [product?.compareAt, product?.price]);

  const waText = encodeURIComponent(
    `היי, אני רוצה להזמין:\n${product?.name}\nגודל: ${size}\nסגנון: ${style}\nכמות: ${qty}`,
  );

  // תחליף למספר שלך:
  const waPhone = '972501234567';
  const waLink = `https://wa.me/${waPhone}?text=${waText}`;

  const onAddToCart = () => {
    // פה תחבר ל-state/Redux/Context/DB שלך
    console.log('Adding to cart:', qty, product.quantity);
    ctxDispatch({
      type: 'ADD TO CART',
      payload: {
        ...product,
        size,
        style,
        quantity: clampQty(product.quantity ? product.quantity + qty : qty),
      },
    });
  };

  const clampQty = (n) => Math.max(1, Math.min(99, n));

  return pageLoading ? (
    <Laoding></Laoding>
  ) : (
    <>
      <div className="pp">
        <NavBar />
        <div className="pp__inner">
          {/* Breadcrumb */}
          <nav className="pp__crumb" aria-label="Breadcrumb">
            <a href="/" className="pp__crumbLink">
              דף הבית
            </a>
            <span className="pp__crumbSep">/</span>
            <a href="/#products" className="pp__crumbLink">
              מוצרים
            </a>
            <span className="pp__crumbSep">/</span>
            <span className="pp__crumbNow">{product?.name}</span>
          </nav>

          <div className="pp__grid">
            {/* Gallery */}
            <section className="ppGallery" aria-label="Product images">
              <div className="ppGallery__main">
                {discountPct > 0 && (
                  <div className="ppChip">-{discountPct}%</div>
                )}
                {!product?.inStock && (
                  <div className="ppChip ppChip--dark">אזל מהמלאי</div>
                )}

                <img
                  src={activeImage}
                  alt={product?.name}
                  className="ppGallery__img"
                  loading="eager"
                />
              </div>

              <div className="ppGallery__thumbs" role="list">
                {product?.images?.map((src) => {
                  const isActive = src === activeImage;
                  return (
                    <button
                      key={src}
                      type="button"
                      className={`ppThumb ${isActive ? 'isActive' : ''}`}
                      onClick={() => setActiveImage(src)}
                      aria-label="בחר תמונה"
                      aria-current={isActive ? 'true' : 'false'}
                    >
                      <img src={src} alt="" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              {/* Trust badges */}
              <div className="ppTrust">
                <div className="ppTrust__item">✅ תשלום מאובטח</div>
                <div className="ppTrust__item">🚚 משלוח מהיר</div>
                <div className="ppTrust__item">✨ עבודת יד</div>
              </div>
            </section>

            {/* Info */}
            <aside className="ppInfo" aria-label="Product info">
              <h1 className="ppInfo__title">{product?.name}</h1>
              <p className="ppInfo__sub">{product?.subtitle}</p>

              <div className="ppPrice">
                <div className="ppPrice__now">₪{product?.price}</div>
                {product?.compareAt && product?.compareAt > product?.price && (
                  <div className="ppPrice__old">₪{product.compareAt}</div>
                )}
                {product?.inStock ? (
                  <span className="ppStock ppStock--ok">במלאי</span>
                ) : (
                  <span className="ppStock ppStock--no">אזל מהמלאי</span>
                )}
              </div>

              <div className="ppBadges">
                {product?.badges?.map((b) => (
                  <span key={b} className="ppBadge">
                    {b}
                  </span>
                ))}
              </div>

              {/* Options */}
              <div className="ppOptions">
                <div className="ppField">
                  <div className="ppField__label">גודל</div>
                  <div className="ppPills">
                    {product?.options?.size?.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`ppPill ${s === size ? 'isActive' : ''}`}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ppField">
                  <div className="ppField__label">סגנון</div>
                  <div className="ppPills">
                    {product?.options?.style?.map((st) => (
                      <button
                        key={st}
                        type="button"
                        className={`ppPill ${st === style ? 'isActive' : ''}`}
                        onClick={() => setStyle(st)}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ppField ppField--qty">
                  <div className="ppField__label__center">כמות</div>
                  <div className="ppQty" role="group" aria-label="Quantity">
                    <button
                      className="ppQty__btn"
                      type="button"
                      onClick={() => setQty((q) => clampQty(q - 1))}
                      aria-label="הפחת כמות"
                    >
                      −
                    </button>
                    <input
                      className="ppQty__input"
                      value={qty}
                      onChange={(e) => {
                        const n = Number(
                          String(e.target.value).replace(/[^\d]/g, ''),
                        );
                        setQty(clampQty(Number.isFinite(n) ? n : 1));
                      }}
                      inputMode="numeric"
                      aria-label="כמות"
                    />
                    <button
                      className="ppQty__btn"
                      type="button"
                      onClick={() => setQty((q) => clampQty(q + 1))}
                      aria-label="הוסף כמות"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="ppCtas">
                <button
                  className="ppBtn ppBtn--gold"
                  type="button"
                  onClick={onAddToCart}
                  disabled={!product?.inStock}
                >
                  🛒 הוסף לעגלה
                </button>

                <a
                  className="ppBtn ppBtn--dark"
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  💬 להזמנה בוואטסאפ
                </a>
              </div>

              {/* Mini spec */}
              <div className="ppSpecs">
                {product?.details?.map((row) => (
                  <div key={row.k} className="ppSpecRow">
                    <div className="ppSpecRow__k">{row.k}</div>
                    <div className="ppSpecRow__v">{row.v}</div>
                  </div>
                ))}
              </div>
            </aside>

            <section>
              <FloatingProducts></FloatingProducts>
            </section>
          </div>

          {/* Tabs-ish content */}
          <section className="ppMore">
            <div className="ppCard">
              <h2 className="ppCard__title">תיאור</h2>
              <p className="ppText">{product?.description}</p>
            </div>

            <div className="ppCard">
              <h2 className="ppCard__title">שאלות נפוצות</h2>
              <div className="ppFaq">
                {product?.faq?.map((f) => (
                  <details key={f.q} className="ppFaq__item">
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="ppCard ppCard--note">
              <h2 className="ppCard__title">שימו לב</h2>
              <p className="ppText">
                ייתכנו הבדלים קלים בגוון ובעורקים של העץ/השרף — זה חלק מהייחוד
                של מוצר בעבודת יד.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
