import { useContext } from 'react';
import { Store } from '../../Store';
import './MaybeYouLikeAlso.css';

export default function Footer({ recommendations }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
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

  return (
    <div className="cpSummary__rec">
      <div className="cpSummary__title">אולי תאהב גם</div>

      <div className="cpRecGrid">
        {recommendations.map((p) => (
          <div key={p.id} className="cpRec">
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
                  onClick={() => addRecToCart(p)}
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
