import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';

const clampQty = (qty, min = 1, max = 999) => Math.max(min, Math.min(max, qty));

export default function ProductCard({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const addToCartBtn = useRef();

  const handelAddToCart = () => {
    ctxDispatch({
      type: 'ADD TO CART',
      payload: {
        ...product,
        size: product.options.size[0],
        style: product.options.style[0],
      },
    });
  };

  const handelGoToProduct = (e) => {
    if (e.target === addToCartBtn.current) return;
    else navigate('/product/' + product.name);
  };

  const beautifulName =
    product.name.length > 20 ? product.name.slice(0, 20) + '...' : product.name;
  const navigate = useNavigate();

  return (
    <article onClick={(e) => handelGoToProduct(e)} className="card">
      <div className="card__imgWrap">
        <img
          className="card__img"
          src={product.mainImage}
          alt={product.name}
          loading="lazy"
        />
        <div className="chip">{product.inStock ? 'במלאי' : 'לא במלאי'}</div>
      </div>

      <div onClick={(e) => handelGoToProduct(e)} className="card__body">
        <h3 className="card__title">{beautifulName}</h3>
        <div className="priceRow">
          <span className="old">{product.compareAt}₪</span>
          <span className="price">{product.price}₪</span>
        </div>

        <button
          ref={addToCartBtn}
          onClick={() => {
            handelAddToCart();
          }}
          className="btn btn--dark btn--full"
        >
          הוסף לעגלה
        </button>
      </div>
    </article>
  );
}
