import "./Footer.css";

export default function Footer() {
  return (
     <footer className="footer">
        <div className="footer__inner">
          <div className="footer__copy">
            © {new Date().getFullYear()} מזוזות בשיר • כל הזכויות שמורות
          </div>
          <div className="footer__links">
            <a href="#">תקנון</a>
            <a href="#">מדיניות משלוחים</a>
            <a href="#">צור קשר</a>
          </div>
        </div>
      </footer>
  );
}