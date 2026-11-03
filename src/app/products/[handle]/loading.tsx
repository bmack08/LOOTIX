// Skeleton matching the PDP layout so nothing jumps when it loads.
export default function ProductLoading() {
  return (
    <div className="pdp-page" aria-busy="true" aria-label="Loading product">
      <div className="pdp-crumbs"><span className="skel" style={{ width: 220, height: 12 }} /></div>
      <section className="pdp-grid">
        <div className="pdp-gallery"><div className="pdp-main skel" /></div>
        <div className="pdp-panel flex flex-col gap-4">
          <span className="skel" style={{ width: 140, height: 12 }} />
          <span className="skel" style={{ width: '80%', height: 34 }} />
          <span className="skel" style={{ width: 70, height: 20 }} />
          <span className="skel" style={{ width: '100%', height: 44 }} />
          <span className="skel" style={{ width: '100%', height: 44 }} />
          <span className="skel" style={{ width: '100%', height: 52 }} />
        </div>
      </section>
    </div>
  );
}
