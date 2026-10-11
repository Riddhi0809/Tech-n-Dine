
import AccessibilityToggle from './AccessibilityToggle';

export default function ChefDashboard({
  orders,
  updateItemStatus,
  setView,
  enhancedColourDistinction,
  setEnhancedColourDistinction,
}) {
  // Categorize orders based on item status
  const newOrders = orders.filter(o => o.items.some(item => !item.status || item.status === 'New'));
  const preparingOrders = orders.filter(o => o.items.some(item => item.status === 'Preparing'));
  const readyOrders = orders.filter(o => o.items.every(item => item.status === 'Ready'));

  return (
    <div className={`web-container chef-dashboard app-shell${enhancedColourDistinction ? ' enhanced-colors' : ''}`} style={{ padding: '1.5rem', maxWidth: '480px', margin: '0 auto', background: '#0e0d0b', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* Header & Back Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #26221d', paddingBottom: '1rem' }}>
        <div>
          <button onClick={() => setView('landing')} style={{ background: 'transparent', border: 'none', color: '#8e8780', cursor: 'pointer', fontSize: '1rem', padding: 0, marginBottom: '0.2rem' }}>
            ‹ Back to App
          </button>
          <h2 style={{ color: '#ff9f0a', margin: 0, fontSize: '1.25rem' }}>Kitchen Display System</h2>
          <span style={{ color: '#8e8780', fontSize: '0.8rem' }}>Saffron & Silicon · Chef Portal</span>
        </div>
        <AccessibilityToggle
          enabled={enhancedColourDistinction}
          onChange={setEnhancedColourDistinction}
        />
      </div>
  
      {/* Queue Summary Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ background: '#161412', padding: '0.6rem', borderRadius: '10px', border: '1px solid #26221d' }}>
          <span style={{ fontSize: '0.65rem', color: '#8e8780' }}>NEW</span>
          <div style={{ color: '#ff9f0a', fontWeight: 'bold', fontSize: '1.1rem' }}>{newOrders.length}</div>
        </div>
        <div style={{ background: '#161412', padding: '0.6rem', borderRadius: '10px', border: '1px solid #26221d' }}>
          <span style={{ fontSize: '0.65rem', color: '#8e8780' }}>PREPARING</span>
          <div style={{ color: '#ff9f0a', fontWeight: 'bold', fontSize: '1.1rem' }}>{preparingOrders.length}</div>
        </div>
        <div style={{ background: '#161412', padding: '0.6rem', borderRadius: '10px', border: '1px solid #26221d' }}>
          <span style={{ fontSize: '0.65rem', color: '#22c55e' }}>READY</span>
          <div style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.1rem' }}>{readyOrders.length}</div>
        </div>
      </div>

      {/* Orders List Queue */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {orders.length === 0 ? (
          <p style={{ color: '#8e8780', textAlign: 'center', marginTop: '2rem' }}>No active orders placed by tables yet.</p>
        ) : (
          orders.map((order, orderIdx) => (
            <div key={order.id ?? orderIdx} className="chef-order-card" style={{ background: '#161412', border: '1px solid #ff9f0a', borderRadius: '16px', padding: '1rem' }}>
              
              {/* Order Card Header with Table & Timestamp */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid #26221d', paddingBottom: '0.5rem' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>#{String(order.id || 1001).slice(-6).toUpperCase()} ({order.table || 'Table T-04'})</span>
                <span style={{ fontSize: '0.75rem', color: '#8e8780' }}>🕒 {order.timestamp || 'Just now'}</span>
              </div>

              {/* Items in the Order */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '0.5rem' }}>
                {order.items.map((item, itemIdx) => {
                  const status = item.status || 'New';
                  return (
                    <div key={item.lineId ?? `${order.id}-${item.id}-${item.guest}-${itemIdx}`} style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1c1916', padding: '0.5rem 0.6rem', borderRadius: '8px', border: '1px solid #26221d' }}>
                      <div>
                        <span style={{ color: '#ff9f0a', fontWeight: 'bold' }}>{item.quantity || 1}x </span>
                        <span>{item.name}</span>
                        <small style={{ color: '#8e8780', display: 'block' }}>Guest: {item.guest}</small>
                      </div>
                      
                      {/* Status Toggle Buttons */}
                      <div style={{ display: 'flex', gap: '0.2rem' }}>
                        {['New', 'Preparing', 'Ready'].map((statusOption) => (
                          <button 
                            key={statusOption}
                            type="button"
                            className="chef-status-button"
                            aria-pressed={status === statusOption}
                            onClick={() => updateItemStatus(orderIdx, itemIdx, statusOption)}
                            style={{ 
                              background: status === statusOption ? (statusOption === 'Ready' ? '#22c55e' : '#ff9f0a') : '#26221d', 
                              color: status === statusOption ? '#000' : '#8e8780', 
                              border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' 
                            }}
                          >
                            {status === statusOption ? '✓ ' : ''}{statusOption}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}