import { useContext, useEffect, useRef, useState } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';

export default function NavBar() {
  const [options, setOptions] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const {
    cart: { items },
  } = state;
  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0);

  useEffect(() => {
    const handleClick = (e) => {
      if (!options) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOptions(false);
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [options]);

  return (
    <header className="lp-header">
      <div className="lp-header__inner">
        {/* Brand */}
        <div className="lp-brand">
          <img
            onClick={() => navigate('/')}
            className="lp-brand__mark"
            src="/image.png"
            alt="Logo"
          />
          <div className="lp-brand__text">
            <div className="lp-brand__name">מזוזות בשיר</div>
            <div className="lp-brand__tag">בעבודת יד • עץ זית • שרף</div>
          </div>
        </div>

        {/* Desktop / Mobile Actions */}
        <div className="ooo">
          <div className="lp-actions">
            <a className="lp-nav__link lp-nav__link--cta" href="#products">
              לרכישה
            </a>
            <button
              onClick={() => navigate('/search')}
              className="lp-iconBtn"
              aria-label="חיפוש"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm11 3-6-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              onClick={() => navigate('/cart')}
              className="lp-iconBtn"
              aria-label="עגלה"
            >
              <span className="cart-count">{cartItemsCount}</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6h15l-2 9H7L6 6Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6 5 3H2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {/* Menu button */}
            <button
              ref={buttonRef}
              className="lp-iconBtn"
              aria-label="תפריט"
              aria-expanded={options}
              onClick={() => setOptions((v) => !v)}
            >
              <img
                src="/menuIcon.svg"
                alt=""
                style={{ width: 20, height: 20, display: 'block' }}
              />
            </button>
          </div>
        </div>

        <div
          ref={menuRef}
          className={`menuOverlay ${options ? 'isOpen' : ''}`}
          onClick={() => setOptions(false)}
          aria-hidden="true"
        />

        <div className={`mobileMenu ${options ? 'isOpen' : ''}`} role="menu">
          <a
            className="mobileMenu__link"
            href="/#products"
            onClick={() => setOptions(false)}
          >
            קולקציה
          </a>
          <a
            className="mobileMenu__link"
            href="/about"
            onClick={() => setOptions(false)}
          >
            אודות
          </a>
          <a
            className="mobileMenu__link"
            href="/#about"
            onClick={() => setOptions(false)}
          >
            שאלות
          </a>

          <div className="mobileMenu__divider" />

          <a
            className="mobileMenu__cta"
            href="/"
            onClick={() => setOptions(false)}
          >
            לרכישה
          </a>
        </div>
      </div>
    </header>
  );
}
