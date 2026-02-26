import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CategoryPage.css';
import { getError } from '../../utils';
import Footer from '../../components/footer/Footer';

// English comments ✅
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQ':
      return { ...state, loading: true, error: '' };
    case 'FETCH_OK':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function CategoryPage() {
  const { _id } = useParams();
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    const fetchByCategory = async () => {
      dispatch({ type: 'FETCH_REQ' });

      try {
        const url_id = decodeURIComponent(_id || '').trim();
        const { data } = await axios.get(
          `/api/products/by-category/${encodeURIComponent(url_id)}`,
        );
         const res = await axios.get(
          `/api/category/${encodeURIComponent(url_id)}`,
        );
        setPageTitle(res.data.category.title);
        dispatch({ type: 'FETCH_OK', payload: data.products || [] });
      } catch (e) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(e) });
      }
    };

    fetchByCategory();
  }, [_id]);

  return (
    <div className="catPage lp" dir="rtl">
      <NavBar />

      <header className="catHeader">
        <div className="catHeader__inner">
          <div className="catCrumb">
            <a className="catCrumb__link" href="/">
              בית
            </a>
            <span className="catCrumb__sep">›</span>
            <span className="catCrumb__here">{pageTitle}</span>
          </div>

          <div className="catTop">
            <h1 className="catTitle">{pageTitle}</h1>
            <div className="catCount">
              {loading ? 'טוען...' : `${products.length} מוצרים`}
            </div>
          </div>

          <p className="catSub">
            מוצרים בקטגוריה "{pageTitle}" — עיצוב נקי, גימור יוקרתי, משלוח מהיר.
          </p>
        </div>
      </header>

      <main className="catMain">
        {loading && (
          <div className="catState">
            <div className="catSpinner" />
            <div className="catState__t">טוען מוצרים…</div>
          </div>
        )}

        {!loading && error && (
          <div className="catState catState--err">
            <div className="catState__t">שגיאה</div>
            <div className="catState__s">{error}</div>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="catState">
            <div className="catState__t">אין מוצרים בקטגוריה הזו</div>
            <div className="catState__s">בקרוב יתווספו מוצרים חדשים!</div>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <section className="catGrid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </section>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}
