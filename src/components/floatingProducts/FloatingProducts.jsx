import { useEffect, useState } from "react";
import "./FloatingProducts.css";
export default function FloatingProducts(){
      const [topCard, setTopCard] = useState(0); // לא -1
    
      useEffect(() => {
        const t = setInterval(() => {
          setTopCard((prev) => (prev + 1) % 3);
        }, 2500);
        return () => clearInterval(t);
      }, []);
      
      const cardStyle = (i) => ({
        opacity: topCard === i ? 1 : 0.35,      // 👈 רואים מאחור
        transition:  'opacity 0.3s ease-in-out',
        zIndex: topCard === i ? 10 : 1,
      });

    return (
         <div className="bHero__art" aria-hidden="true">
            <div className="bStack">
              <div className="bCard3D bCard3D--1" style={cardStyle(0)} />
              <div className="bCard3D bCard3D--2" style={cardStyle(1)} />
              <div className="bCard3D bCard3D--3" style={cardStyle(2)} />

              <div className="bStamp">
                <div className="bStamp__top">BETA</div>
                <div className="bStamp__sub">HANDMADE</div>
              </div>
            </div>
          </div>
    )
}