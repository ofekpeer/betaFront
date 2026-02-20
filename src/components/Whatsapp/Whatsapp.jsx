import "./Whatsapp.css";
export default function WhatsAppFloat() {
  const phone = "972507487234"; // <-- תחליף למספר שלך (בלי +, בלי 0 בהתחלה)
  const text = encodeURIComponent("היי, אשמח לפרטים");

  const url = `https://wa.me/${phone}?text=${text}`;

  return (
    <a
      className="wa-fab"
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="צ'אט בוואטסאפ"
      title="צ'אט בוואטסאפ"
    >
      {/* אייקון וואטסאפ (SVG) */}
      <img src="/icons/whatsapp.svg" alt="WhatsApp" className="wa-icon" />
    </a>
  );
}
