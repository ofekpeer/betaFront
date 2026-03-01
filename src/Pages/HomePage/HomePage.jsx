import './HomePage.css';
import NavBar from '../../components/NavBar/NavBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { getError } from '../../utils';
import LoadingProducts from '../../components/LoadingProducts/LoadingProducts';
import Laoding from '../../components/Loading/Loading';
import Footer from '../../components/footer/Footer';
import Category from '../../components/category/Category';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET REQUEST':
      return { ...state, loading: true };
    case 'GET SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'GET FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const navigate = useNavigate();

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      console.log(window.innerHeight);
      dispatch({ type: 'GET REQUEST' });
      try {
        const res = await axios.get('/api/products');
        dispatch({ type: 'GET SUCCESS', payload: res.data.products });
      } catch (error) {
        dispatch({ type: 'GET FAIL', payload: getError(error) });
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

  return pageLoading ? (
    <Laoding></Laoding>
  ) : (
    <div className="lp">
      {/* Top bar */}
      <NavBar />

      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__inner">
          <div className="hero__content">
            <p className="hero__eyebrow ">קולקציית פרימיום</p>
            <h1 className="hero__title ">
              מזוזות בעיצוב
              <span className="hero__titleAccent "> עץ זית</span> ושרף
            </h1>
            <p className="hero__sub ">
              עבודת יד, גימור יוקרתי, שילוב עץ טבעי עם צבעי שרף עמוקים. מתנה
              מושלמת לבית חדש.
            </p>

            <div className="hero__ctaRow">
              <a className="btn btn--gold" href="#products">
                לכל הקולקציה
              </a>
              <a className="btn btn--ghost" href="/about">
                למה אנחנו?
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        {/* category */}
        <section className="section" id="categorys">
          <Category></Category>
        </section>

        {/* Products */}
        <section className="section" id="products">
          <div className="section__head">
            <h2 className="section__title">מוצרים מובילים</h2>
            <p className="section__sub">בחרו את הסגנון שמתאים לבית שלכם</p>
          </div>

          {loading ? (
            <LoadingProducts></LoadingProducts>
          ) : (
            <div className="grid">
              {products.map((p, i) => (
                <ProductCard key={i} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* Feature strip */}
        <section className="strip" id="about">
          <div className="strip__inner">
            <div className="stripItem">
              <div className="stripItem__icon">
                <img src="/icons/price.svg" alt="Gift Box" />
              </div>
              <div className="stripItem__title">איכות פרימיום</div>
              <div className="stripItem__text">
                חומרים חזקים וגימור מדויק לאורך זמן
              </div>
            </div>
            <div className="stripItem">
              <div className="stripItem__icon">
                <img src="/icons/gift.svg" alt="Gift Box" />
              </div>
              <div className="stripItem__title">אריזת מתנה</div>
              <div className="stripItem__text">
                אפשרות לצירוף כיתוב וברכה אישית
              </div>
            </div>
            <div className="stripItem">
              <div className="stripItem__icon">
                <img src="/icons/box.svg" alt="Gift Box" />
              </div>
              <div className="stripItem__title">החזרות קלות</div>
              <div className="stripItem__text">אם לא מתאים — מחזירים בקלות</div>
            </div>
          </div>
        </section>

        {/* FAQ (lite) */}
        <section className="section" id="faq">
          <div className="section__head">
            <h2 className="section__title">שאלות נפוצות</h2>
            <p className="section__sub">כמה תשובות קצרות כדי שתהיו סגורים</p>
          </div>

          <div className="faq">
            <details className="faqItem">
              <summary>איך ניתן לעקוב אחרי המשלוח?</summary>
              <p>
                ניתן לשלוח הודעה במייל/בוואטצפ ולקבל עידכון מידי על מצב המשלוח{' '}
                <br/>
                מייל: betaelegant@gmai.com <br/> טלפון: 0507487234
              </p>
            </details>

            <details className="faqItem">
              <summary>כמה זמן לוקח משלוח?</summary>
              <p>2-5 ימי עסקים</p>
            </details>

            <details className="faqItem">
              <summary>אפשר התאמה אישית?</summary>
              <p>כן—צבע/גימור/חריטה לפי בקשה (בהתאם לזמינות).</p>
            </details>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
