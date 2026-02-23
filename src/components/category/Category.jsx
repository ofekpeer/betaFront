import './Category.css';
import { useNavigate } from 'react-router-dom';

export default function Category() {
  const navigate = useNavigate();

  return (
    <section className="section" id="category">
      <div className="section__head">
        <h2 className="section__title">קטגוריות</h2>
        <p className="section__sub">בחרו את הסגנון שמתאים לבית שלכם</p>
      </div>

      <div className="catGrid">
        {[
          {
            key: 'olive',
            title: 'מזוזות',
            sub: 'קלאסי וחם',
            img: './mezozacategory.png',
            tone: 'gold',
            query: 'עץ זית',
          },
          {
            key: 'resin',
            title: 'ברכות',
            sub: 'מודרני ובולט',
            img: './braca.png',
            tone: 'navy',
            query: 'שרף',
          },
          {
            key: 'gift',
            title: 'טליות',
            img: './talit.jpg',
            sub: 'לכניסה חדשה',
            tone: 'paper',
            query: 'מתנה',
          },
        ].map((c) => (
          <button
            style={{
              backgroundImage: `url(${c.img})`,
              backgroundSize: 'cover',
            }}
            key={c.key}
            type="button"
            className={`catCard catCard--${c.tone}`}
            onClick={() =>
              navigate(`/search?category=${encodeURIComponent(c.query)}`)
            }
          >
            <div>
              <div className="catCard__top">
                <div>
                  <div className="catCard__title">{c.title}</div>
                  <div className="catCard__sub">{c.sub}</div>
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
