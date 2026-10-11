

export default function OrderStatus({ orders, updateItemStatus, setView }) {
  // Helper to categorize and filter orders based on their items' status
  const newOrders = orders.filter(o => o.items.some(item => !item.status || item.status === 'New'));
  const preparingOrders = orders.filter(o => o.items.some(item => item.status === 'Preparing'));
  const readyOrders = orders.filter(o => o.items.every(item => item.status === 'Ready'));

  return (
    <div className="web-container" style={{ padding: '1.5rem', maxWidth: '480px', margin: '0 auto', background: '#0e0d0b', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #26221d', paddingBottom: '1rem' }}>
        <div>
          <button onClick={() => setView('menu')} style={{ background: 'transparent', border: 'none', color: '#8e8780', cursor: 'pointer', fontSize: '1rem', padding: 0, marginBottom: '0.2rem' }}>
            ‹ Back to App
          </button>
          <h2 style={{ color: '#ff9f0a', margin: 0, fontSize: '1.25rem' }}>Kitchen Display System</h2>
          <span style={{ color: '#8e8780', fontSize: '0.8rem' }}>Saffron & Silicon · Live Queue</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ background: '#1c1916', padding: '0.4rem 0.8rem', borderRadius: '12px', fontSize: '0.75rem', border: '1px solid #26221d', color: '#ff9f0a' }}>
            🕒 11:50:24 pm
          </span>
        </div>
      </div>

      {/* Status Summary Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{ background: '#161412', padding: '0.6rem', borderRadius: '10px', border: '1px solid #26221d' }}>
          <span style={{ fontSize: '0.65rem', color: '#8e8780', letterSpacing: '0.5px' }}>NEW</span>
          <div style={{ color: '#ff9f0a', fontWeight: 'bold', fontSize: '1.1rem' }}>{newOrders.length}</div>
        </div>
        <div style={{ background: '#161412', padding: '0.6rem', borderRadius: '10px', border: '1px solid #26221d' }}>
          <span style={{ fontSize: '0.65rem', color: '#8e8780', letterSpacing: '0.5px' }}>PREPARING</span>
          <div style={{ color: '#ff9f0a', fontWeight: 'bold', fontSize: '1.1rem' }}>{preparingOrders.length}</div>
        </div>
        <div style={{ background: '#161412', padding: '0.6rem', borderRadius: '10px', border: '1px solid #26221d' }}>
          <span style={{ fontSize: '0.65rem', color: '#22c55e', letterSpacing: '0.5px' }}>READY</span>
          <div style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.1rem' }}>{readyOrders.length}</div>
        </div>
      </div>

      {/* SECTIONS WRAPPER */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* 1. NEW ORDERS SECTION */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: '#ff9f0a', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>● NEW ORDERS</span>
            <span style={{ background: '#26221d', color: '#ff9f0a', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
              {newOrders.length}
            </span>
          </div>

          {newOrders.length === 0 ? (
            <div style={{ background: '#161412', padding: '1rem', borderRadius: '12px', color: '#8e8780', fontSize: '0.85rem', textAlign: 'center', border: '1px solid #26221d' }}>No new orders</div>
          ) : (
            newOrders.map((order, orderIdx) => (
              <div key={orderIdx} style={{ background: '#161412', border: '1px solid #ff9f0a', borderRadius: '16px', padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid #26221d', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>#{order.id || 1002}</span>
                    <span style={{ background: '#26221d', color: '#8e8780', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem' }}>{order.table}</span>
                  </div>
                  <span style={{ border: '1px solid #ff9f0a', color: '#ff9f0a', padding: '0.15rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem' }}>
                    ● New
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8e8780', marginBottom: '0.75rem' }}>
                  <span>🕒 Just now</span>
                  <span>₹{order.items.reduce((acc, curr) => acc + Number(curr.price) * (curr.quantity || 1), 0)}</span>
                </div>
                
                {/* Individual Item List with Dish-Level Status & Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                  {order.items.map((item, itemIdx) => {
                    const status = item.status || 'New';
                    return (
                      <div key={itemIdx} style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1c1916', padding: '0.5rem 0.6rem', borderRadius: '8px', border: '1px solid #26221d' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ color: '#ff9f0a', fontWeight: 'bold' }}>{item.quantity || 1}x</span>
                            <span>{item.name}</span>
                          </div>
                          <small style={{ color: '#8e8780' }}>({item.guest})</small>
                        </div>
                        
                        {/* Individual Dish Status Switchers */}
                        <div style={{ display: 'flex', gap: '0.2rem' }}>
                          <button 
                            onClick={() => updateItemStatus(orders.indexOf(order), itemIdx, 'New')}
                            style={{ background: status === 'New' ? '#ff9f0a' : '#26221d', color: status === 'New' ? '#000' : '#8e8780', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            New
                          </button>
                          <button 
                            onClick={() => updateItemStatus(orders.indexOf(order), itemIdx, 'Preparing')}
                            style={{ background: status === 'Preparing' ? '#ff9f0a' : '#26221d', color: status === 'Preparing' ? '#000' : '#8e8780', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            Prep
                          </button>
                          <button 
                            onClick={() => updateItemStatus(orders.indexOf(order), itemIdx, 'Ready')}
                            style={{ background: status === 'Ready' ? '#22c55e' : '#26221d', color: status === 'Ready' ? '#000' : '#8e8780', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            Ready
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 2. PREPARING SECTION */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: '#ff9f0a', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>● PREPARING</span>
            <span style={{ background: '#26221d', color: '#ff9f0a', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
              {preparingOrders.length}
            </span>
          </div>

          {preparingOrders.length === 0 ? (
            <div style={{ background: '#161412', padding: '1rem', borderRadius: '12px', color: '#8e8780', fontSize: '0.85rem', textAlign: 'center', border: '1px solid #26221d' }}>No orders in preparation</div>
          ) : (
            preparingOrders.map((order, orderIdx) => (
              <div key={orderIdx} style={{ background: '#161412', border: '1px solid #ff9f0a', borderRadius: '16px', padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid #26221d', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>#{order.id || 1001}</span>
                    <span style={{ background: '#26221d', color: '#8e8780', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem' }}>{order.table}</span>
                  </div>
                  <span style={{ border: '1px solid #ff9f0a', color: '#ff9f0a', padding: '0.15rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem' }}>
                    ● Preparing
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8e8780', marginBottom: '0.75rem' }}>
                  <span>🕒 In progress</span>
                  <span>₹{order.items.reduce((acc, curr) => acc + Number(curr.price) * (curr.quantity || 1), 0)}</span>
                </div>

                {/* Individual Item List with Dish-Level Status & Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                  {order.items.map((item, itemIdx) => {
                    const status = item.status || 'Preparing';
                    return (
                      <div key={itemIdx} style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1c1916', padding: '0.5rem 0.6rem', borderRadius: '8px', border: '1px solid #26221d' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ color: '#ff9f0a', fontWeight: 'bold' }}>{item.quantity || 1}x</span>
                            <span>{item.name}</span>
                          </div>
                          <small style={{ color: '#8e8780' }}>({item.guest})</small>
                        </div>
                        
                        {/* Individual Dish Status Switchers */}
                        <div style={{ display: 'flex', gap: '0.2rem' }}>
                          <button 
                            onClick={() => updateItemStatus(orders.indexOf(order), itemIdx, 'New')}
                            style={{ background: status === 'New' ? '#ff9f0a' : '#26221d', color: status === 'New' ? '#000' : '#8e8780', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            New
                          </button>
                          <button 
                            onClick={() => updateItemStatus(orders.indexOf(order), itemIdx, 'Preparing')}
                            style={{ background: status === 'Preparing' ? '#ff9f0a' : '#26221d', color: status === 'Preparing' ? '#000' : '#8e8780', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            Prep
                          </button>
                          <button 
                            onClick={() => updateItemStatus(orders.indexOf(order), itemIdx, 'Ready')}
                            style={{ background: status === 'Ready' ? '#22c55e' : '#26221d', color: status === 'Ready' ? '#000' : '#8e8780', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            Ready
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 3. READY TO SERVE SECTION */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>● READY TO SERVE</span>
            <span style={{ background: '#26221d', color: '#22c55e', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold' }}>
              {readyOrders.length}
            </span>
          </div>

          {readyOrders.length === 0 ? (
            <div style={{ background: '#161412', padding: '1rem', borderRadius: '12px', color: '#8e8780', fontSize: '0.85rem', textAlign: 'center', border: '1px solid #26221d' }}>No ready orders</div>
          ) : (
            readyOrders.map((order, orderIdx) => (
              <div key={orderIdx} style={{ background: '#161412', border: '1px solid #22c55e', borderRadius: '16px', padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid #26221d', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>#{order.id || 1003}</span>
                    <span style={{ background: '#26221d', color: '#8e8780', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem' }}>{order.table}</span>
                  </div>
                  <span style={{ border: '1px solid #22c55e', color: '#22c55e', padding: '0.15rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem' }}>
                    ● Ready
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8e8780', marginBottom: '0.75rem' }}>
                  <span>🕒 Completed</span>
                  <span>₹{order.items.reduce((acc, curr) => acc + Number(curr.price) * (curr.quantity || 1), 0)}</span>
                </div>

                {/* Individual Item List with Dish-Level Status & Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                  {order.items.map((item, itemIdx) => {
                    const status = item.status || 'Ready';
                    return (
                      <div key={itemIdx} style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1c1916', padding: '0.5rem 0.6rem', borderRadius: '8px', border: '1px solid #26221d' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{item.quantity || 1}x</span>
                            <span>{item.name}</span>
                          </div>
                          <small style={{ color: '#8e8780' }}>({item.guest})</small>
                        </div>
                        
                        {/* Individual Dish Status Switchers */}
                        <div style={{ display: 'flex', gap: '0.2rem' }}>
                          <button 
                            onClick={() => updateItemStatus(orders.indexOf(order), itemIdx, 'New')}
                            style={{ background: status === 'New' ? '#ff9f0a' : '#26221d', color: status === 'New' ? '#000' : '#8e8780', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            New
                          </button>
                          <button 
                            onClick={() => updateItemStatus(orders.indexOf(order), itemIdx, 'Preparing')}
                            style={{ background: status === 'Preparing' ? '#ff9f0a' : '#26221d', color: status === 'Preparing' ? '#000' : '#8e8780', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            Prep
                          </button>
                          <button 
                            onClick={() => updateItemStatus(orders.indexOf(order), itemIdx, 'Ready')}
                            style={{ background: status === 'Ready' ? '#22c55e' : '#26221d', color: status === 'Ready' ? '#000' : '#8e8780', border: 'none', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            Ready
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ textAlign: 'center', color: '#22c55e', fontSize: '0.85rem', fontWeight: 'bold', padding: '0.4rem' }}>
                  ✓ Ready to Serve
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}