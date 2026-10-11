

export default function MenuGrid({ menuItems, addToCart, activeGuest }) {
  return (
    <div>
      <h3 style={{ marginBottom: '1rem' }}>
        Ordering for: <span style={{ color: '#ff9f0a' }}>{activeGuest}</span>
      </h3>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <div style={{ height: '140px', background: '#26221d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8e8780', fontSize: '0.85rem' }}>
              [ 3D / AR View Ready ]
            </div>
            <h4 style={{ margin: '0.5rem 0 0.2rem 0' }}>{item.name}</h4>
            <small style={{ color: '#8e8780' }}>Prep time: {item.time}</small>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ color: '#ff9f0a', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{item.price}</span>
              <button className="btn-orange" onClick={() => addToCart(item)}>+ Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}