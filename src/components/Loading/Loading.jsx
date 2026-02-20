import './Loading.css';

export default function Laoding() {
  return (
    <div className="body">
      <main >
        <div className="preloader">
          <div className="preloader__square"></div>
          <div className="preloader__square"></div>
          <div className="preloader__square"></div>
          <div className="preloader__square"></div>
        </div>
        <div className="status">
          Loading<span className="status__dot">.</span>
          <span className="status__dot">.</span>
          <span className="status__dot">.</span>
        </div>
      </main>
    </div>
  );
}
