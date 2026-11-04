export default function ShopLoading() {
  return (
    <div className="store-collection" aria-busy="true" aria-label="Loading products">
      <div className="store-head"><span className="skel" style={{ width: 240, height: 40 }} /></div>
      <div className="store-grid">
        {Array.from({ length: 8 }, (_, i) => <span key={i} className="skel" style={{ aspectRatio: '1 / 1.3' }} />)}
      </div>
    </div>
  );
}
