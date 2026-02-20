import { useEffect, useMemo, useState } from 'react';
import './searchPage.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/footer/Footer';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import LoadingProducts from '../../components/LoadingProducts/LoadingProducts';
/** Debounce קטן בלי ספריות */
function useDebouncedValue(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function SearchPage() {
  // ---- UI state
  const [q, setQ] = useState('');
  const dq = useDebouncedValue(q, 250);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sort, setSort] = useState('relevance'); // relevance | price_asc | price_desc | newest

  // ---- data state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  // ---- fetch (דמו: מושך את כל המוצרים ואז מסנן בצד לקוח)
  // אם יש לך endpoint חיפוש — תחליף את fetch ל- `/api/products/search?q=...`
  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setError('');

      try {
        const res = await axios.get('/api/products');
        console.log('Products response:', res);
        if (res.status !== 200) throw new Error('Failed to fetch products');
        const data = res.data;

        // אצלך נראה שזה data.products
        const list = data.products ? data.products : [];
        if (!alive) return;
        setProducts(list);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Something went wrong');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, []);

  // ---- normalize helpers
  const safeMin = useMemo(() => {
    const n = Number(String(minPrice || 0).replace(/[^\d.]/g, ''));
    return Number.isFinite(n) ? n : null;
  }, [minPrice]);

  const safeMax = useMemo(() => {
    const n = Number(String(maxPrice || 999).replace(/[^\d.]/g, ''));
    return Number.isFinite(n) ? n : null;
  }, [maxPrice]);

  const normalizedQuery = useMemo(() => dq.trim().toLowerCase(), [dq]);

  // ---- filter + sort
  const filtered = useMemo(() => {
    const list = products ? products : [];

    const byQuery = (p) => {
      if (!normalizedQuery) return true;
      const title = String(p?.name || '').toLowerCase();
      const desc = String(p?.description || '').toLowerCase();
      const tags = Array.isArray(p?.tags) ? p.tags.join(' ').toLowerCase() : '';
      return (
        title.includes(normalizedQuery) ||
        desc.includes(normalizedQuery) ||
        tags.includes(normalizedQuery)
      );
    };

    const byPrice = (p) => {
      const price = Number(p?.price);
      if (!Number.isFinite(price)) return false;
      if (safeMin !== null && price < safeMin) return false;
      if (safeMax !== null && price > safeMax) return false;
      return true;
    };

    const byStock = (p) => {
      if (!onlyInStock) return true;
      return p?.inStock !== false; // default true
    };

    let out = list.filter((p) => byQuery(p) && byPrice(p) && byStock(p));
    

    // sort
    out = [...out].sort((a, b) => {
      const ap = Number(a?.price) || 0;
      const bp = Number(b?.price) || 0;

      if (sort === 'price_asc') return ap - bp;
      if (sort === 'price_desc') return bp - ap;

      if (sort === 'newest') {
        // אם יש לך createdAt — נהדר. אחרת זה ישאיר בערך כמו המקור
        const ad = new Date(a?.createdAt || 0).getTime();
        const bd = new Date(b?.createdAt || 0).getTime();
        return bd - ad;
      }

      // relevance (דמו פשוט): אם שאילתה קיימת — מוצרים שהכותרת מכילה ראשונים
      if (normalizedQuery) {
        const at = String(a?.name || a?.title || '')
          .toLowerCase()
          .includes(normalizedQuery);
        const bt = String(b?.name || b?.title || '')
          .toLowerCase()
          .includes(normalizedQuery);
        if (at && !bt) return -1;
        if (!at && bt) return 1;
      }
      return 0;
    });

    return  out
  }, [products, normalizedQuery, safeMin, safeMax, onlyInStock, sort]);

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setOnlyInStock(false);
    setSort('relevance');
  };

  return (
    <div className="sp">
      <NavBar></NavBar>
      <div className="sp__inner">
        <header className="spHead">
          <div>
            <h1 className="spHead__title">חיפוש מוצרים</h1>
            <p className="spHead__sub">
              מצא את הדגם שמתאים לבית — מהר ובסטייל.
            </p>
          </div>

          <a className="spBack" href="/#products">
            ← חזרה לקולקציה
          </a>
        </header>

        {/* Controls */}
        <section className="spControls" aria-label="Search controls">
          <div className="spSearch">
            <span className="spSearch__icon" aria-hidden="true">
              🔎
            </span>
            <input
              className="spInput spInput--search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="חפש לפי שם / סגנון / חומר…"
              aria-label="Search"
            />
            {q && (
              <button
                className="spIconBtn"
                type="button"
                onClick={() => setQ('')}
                aria-label="נקה חיפוש"
              >
                ✕
              </button>
            )}
          </div>

          <div className="spFilters">
            <div className="spField">
              <div className="spLabel">מחיר מינ׳</div>
              <input
                className="spInput"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="₪0"
                type="number"
              />
            </div>

            <div className="spField">
              <div className="spLabel">מחיר מקס׳</div>
              <input
                className="spInput"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="₪999"
                type="number"
              />
            </div>

            <label className="spCheck">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
              />
              <span>רק במלאי</span>
            </label>

            <div className="spField spField--sort">
              <div className="spLabel">מיון</div>
              <select
                className="spSelect"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="relevance">רלוונטיות</option>
                <option value="newest">חדש</option>
                <option value="price_asc">מחיר: נמוך→גבוה</option>
                <option value="price_desc">מחיר: גבוה→נמוך</option>
              </select>
            </div>

            <button
              className="spBtn spBtn--ghost"
              type="button"
              onClick={clearFilters}
            >
              איפוס פילטרים
            </button>
          </div>

          <div className="spMeta">
            <div className="spCount">
              {loading ? 'טוען…' : `נמצאו ${filtered.length} תוצאות`}
            </div>

            {normalizedQuery && (
              <div className="spQueryPill">
                חיפוש: <b>{dq.trim()}</b>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="spResults" aria-label="Search results">
          {error && <div className="spMsg spMsg--err">⚠️ {error}</div>}

          {loading ? (
            <LoadingProducts></LoadingProducts>
          ) : filtered.length === 0 ? (
            <div className="spEmpty">
              <div className="spEmpty__icon">✨</div>
              <div className="spEmpty__title">לא מצאנו תוצאות</div>
              <div className="spEmpty__text">
                נסה מילות חיפוש אחרות, או בטל פילטרים (מחיר/מלאי).
              </div>
              <div className="spEmpty__actions">
                <button
                  className="spBtn spBtn--gold"
                  onClick={clearFilters}
                  type="button"
                >
                  איפוס פילטרים
                </button>
                <a className="spBtn spBtn--dark" href="/#products">
                  חזרה לקולקציה
                </a>
              </div>
            </div>
          ) : (
            <div className="spGrid">
              {filtered.map((p) => {
                return <ProductCard key={p._id} product={p} />;
              })}
            </div>
          )}
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}
