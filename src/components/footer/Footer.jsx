import './Footer.css';

export default function Footer() {
  const phone = '972507487234'; // <-- תחליף למספר שלך (בלי +, בלי 0 בהתחלה)
  const text = encodeURIComponent('היי, אשמח לפרטים');

  const url = `https://wa.me/${phone}?text=${text}`;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__copy">
          © {new Date().getFullYear()} ביתא • כל הזכויות שמורות
        </div>
        <div className="footer__links">
          <a href="/policy">תקנון</a>
          <a href="/shipping-returns">מדיניות משלוחים</a>
          <a href={url}>צור קשר</a>
        </div>
      </div>
    </footer>
  );
}
