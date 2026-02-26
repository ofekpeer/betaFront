import { useContext, useRef } from 'react';
import { Store } from '../../Store';
import './MaybeYouLikeAlso.css';
import { useNavigate } from 'react-router-dom';

export default function Footer({ recommendations }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const addToCartBtn = useRef();
  const navigate = useNavigate();

  const addRecToCart = (p) => {
    ctxDispatch({
      type: 'ADD TO CART',
      payload: {
        ...p,
        size: p.options.size[0],
        style: p.options.style[0],
      },
    });
  };

  const handelGoToProduct = ( p) => {
    navigate('/product/' + p.name);
  };

  return (
    <div className="cpSummary__rec">
      <div className="cpSummary__title">אולי תאהב גם</div>

      <div className="cpRecGrid">
        {recommendations.map((p) => (
          <div
            onClick={() => handelGoToProduct(p)}
            key={p._id}
            className="cpRec"
          >
            <div className="cpRec__imgWrap">
              <img className="cpRec__img" src={p.mainImage} alt={p.name} />
              <div className="cpRec__chip">{p.badges[0]}</div>
            </div>

            <div className="cpRec__body">
              <div className="cpRec__title">{p.name}</div>
              <div className="cpRec__row">
                <div className="cpRec__price">₪{p.price}</div>
                <button
                  className="cpMiniBtn"
                  onClick={(e) => {
                    e.stopPropagation(); // מונע את הקליק על ההורה
                    addRecToCart(p);
                  }}
                  type="button"
                >
                  + הוסף
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
