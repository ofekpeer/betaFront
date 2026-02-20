import './LoadingProducts.css';

export default function LoadingProducts() {
  return (
    <div className="spSkeletonGrid">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="spSkCard">
          <div className="spSkImg" />
          <div className="spSkLine" />
          <div className="spSkLine spSkLine--short" />
        </div>
      ))}
    </div>
  );
}
