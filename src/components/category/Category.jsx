import axios from 'axios';
import './Category.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Category() {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);

  const cssOptions = [ 'navy', 'navy', 'navy'];
  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const res = await axios.get('/api/category');
        setCategorys(res.data.category);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCategory();
  }, []);

  return (
    <section className="section" id="category">
      <div className="section__head">
        <h2 className="section__title">קטגוריות</h2>
        <p className="section__sub">בחרו את הסגנון שמתאים לבית שלכם</p>
      </div>

      <div
        className="catGrid"
      >
        {categorys.map((c, i) => (
          <button
            style={{
              backgroundImage: `url(${c.image})`,
              backgroundSize: 'cover',
            }}
            key={c._id}
            type="button"
            className={`catCard catCard--${cssOptions[i]}`}
            onClick={() => navigate(`/category/${encodeURIComponent(c._id)}`)}
          >
            <div>
              <div className="catCard__top">
                <div>
                  <div className="catCard__title">{c.title}</div>
                </div>

                <span className="catCard__pill">לצפייה</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
