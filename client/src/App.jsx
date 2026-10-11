import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AccessibilityToggle from './components/AccessibilityToggle';
import GuestSwitcher from './components/GuestSwitcher';
import CartSidebar from './components/CartSidebar';
import ChefDashboard from './components/ChefDashboard';
import { menuItems } from './components/menuData';
import { createId, getItemQuantity, normalizeGuestName } from './utils/orderHelpers';

const ORDERS_STORAGE_KEY = 'saffron_silicon_orders';
const ACCESSIBILITY_STORAGE_KEY = 'saffron_silicon_enhanced_colours';
const TABLE_NUMBER = 'Table T-04';
const MENU_CATEGORIES = ['Starters', 'Mains', 'Breads', 'Desserts', 'Beverages'];
const ORDER_STATUSES = ['New', 'Preparing', 'Ready'];

/** Read and lightly repair saved orders so older browser data remains usable. */
function parseSavedOrders(savedValue) {
  if (!savedValue) return [];

  try {
    const parsedOrders = JSON.parse(savedValue);
    if (!Array.isArray(parsedOrders)) return [];

    return parsedOrders
      .filter((order) => order && Array.isArray(order.items))
      .map((order) => ({
        ...order,
        id: order.id ?? createId('ORD'),
        items: order.items
          .filter(Boolean)
          .map((item) => ({
            ...item,
            lineId: item.lineId ?? createId('ITEM'),
            quantity: getItemQuantity(item.quantity),
            status: item.status || 'New',
          })),
      }));
  } catch (error) {
    console.error('Could not read saved orders from local storage:', error);
    return [];
  }
}

function loadSavedOrders() {
  try {
    return parseSavedOrders(window.localStorage.getItem(ORDERS_STORAGE_KEY));
  } catch (error) {
    console.error('Could not access saved orders:', error);
    return [];
  }
}

function loadEnhancedColourPreference() {
  try {
    return window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY) === 'true';
  } catch {
    // Accessibility settings should still work when browser storage is unavailable.
    return false;
  }
}

export default function App() {
  const [view, setView] = useState('landing'); 
  const [activeGuest, setActiveGuest] = useState('You');
  const [activeCategory, setActiveCategory] = useState('Starters');
  const [cart, setCart] = useState([]);
  
  // Saved orders are shared between tabs in this browser, not across devices.
  const [orderedItems, setOrderedItems] = useState(loadSavedOrders);
  const [selectedDish, setSelectedDish] = useState(null);
  const [enhancedColourDistinction, setEnhancedColourDistinction] = useState(
    loadEnhancedColourPreference
  );

  // Save order changes. Storage can fail in private or restricted browser modes.
  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orderedItems));
    } catch (error) {
      console.error('Could not save orders to local storage:', error);
    }
  }, [orderedItems]);

  // Close the ingredient dialog with Escape, as users expect from a dialog.
  useEffect(() => {
    if (!selectedDish) return undefined;

    const handleDialogKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedDish(null);
    };

    window.addEventListener('keydown', handleDialogKeyDown);
    return () => window.removeEventListener('keydown', handleDialogKeyDown);
  }, [selectedDish]);

  // Remember the user's accessibility preference without loading another library.
  useEffect(() => {
    try {
      window.localStorage.setItem(
        ACCESSIBILITY_STORAGE_KEY,
        String(enhancedColourDistinction)
      );
    } catch {
      // The toggle remains functional for this visit if storage is unavailable.
    }
  }, [enhancedColourDistinction]);

  // Listen for order changes made in another tab of the same browser.
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key !== ORDERS_STORAGE_KEY) return;

      // A null value means another tab removed the saved value.
      setOrderedItems(parseSavedOrders(event.newValue));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addToCart = (menuItem) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find((item) => (
        item.id === menuItem.id
        && normalizeGuestName(item.guest) === normalizeGuestName(activeGuest)
      ));

      if (!existingItem) {
        return [
          ...previousCart,
          {
            ...menuItem,
            lineId: createId('ITEM'),
            guest: activeGuest,
            quantity: 1,
          },
        ];
      }

      return previousCart.map((item) => (
        item.lineId === existingItem.lineId
          ? { ...item, quantity: getItemQuantity(item.quantity) + 1 }
          : item
      ));
    });
  };

  const placeOrderToKitchen = () => {
    if (cart.length === 0) {
      window.alert('Cart is empty!');
      return;
    }

    const newOrder = {
      id: createId('ORD'),
      table: TABLE_NUMBER,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: cart.map((item) => ({ ...item, status: 'New' })),
    };

    setOrderedItems((previousOrders) => [...previousOrders, newOrder]);
    setCart([]);
    window.alert('Order successfully sent to kitchen!');
  };

  // This sidebar currently shows both submitted orders and items not yet submitted.
  const allTableItems = [
    ...orderedItems.flatMap((order) => order.items),
    ...cart,
  ];

  const removeFromCart = (itemToRemove) => {
    const lineId = itemToRemove.lineId;

    setCart((previousCart) =>
      previousCart.filter((item) => item.lineId !== lineId)
    );
    setOrderedItems((previousOrders) => previousOrders
      .map((order) => ({
        ...order,
        items: order.items.filter((item) => item.lineId !== lineId),
      }))
      .filter((order) => order.items.length > 0));
  };

  const updateItemQuantity = (itemToUpdate, quantityChange) => {
    const updateItems = (items) => items
      .map((item) => {
        if (item.lineId !== itemToUpdate.lineId) return item;

        return {
          ...item,
          quantity: getItemQuantity(item.quantity) + quantityChange,
        };
      })
      .filter((item) => Number(item.quantity) > 0);

    setCart(updateItems);
    setOrderedItems((previousOrders) => previousOrders
      .map((order) => ({ ...order, items: updateItems(order.items) }))
      .filter((order) => order.items.length > 0));
  };

  const payForGuest = (guest) => {
    const guestKey = normalizeGuestName(guest);
    const belongsToAnotherGuest = (item) =>
      normalizeGuestName(item.guest) !== guestKey;

    setCart((previousCart) => previousCart.filter(belongsToAnotherGuest));
    setOrderedItems((previousOrders) => previousOrders
      .map((order) => ({
        ...order,
        items: order.items.filter(belongsToAnotherGuest),
      }))
      .filter((order) => order.items.length > 0));
  };

  const payForAll = () => {
    setCart([]);
    setOrderedItems([]);
  };

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  const updateItemStatus = (orderIndex, itemIndex, newStatus) => {
    if (!ORDER_STATUSES.includes(newStatus)) return;

    setOrderedItems((previousOrders) => previousOrders.map((order, currentOrderIndex) => {
      if (currentOrderIndex !== orderIndex) return order;

      return {
        ...order,
        items: order.items.map((item, currentItemIndex) => (
          currentItemIndex === itemIndex
            ? { ...item, status: newStatus }
            : item
        )),
      };
    }));
  };

  // 1. LANDING PAGE
  if (view === 'landing') {
    return (
      <div className={`landing-container app-shell${enhancedColourDistinction ? ' enhanced-colors' : ''}`} style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#ff9f0a', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Saffron & Silicon</h1>
        <p style={{ color: '#8e8780', marginBottom: '1.5rem' }}>Immersive AR Dining & Smart Table Ordering Experience</p>
        <div className="landing-accessibility-setting">
          <AccessibilityToggle
            enabled={enhancedColourDistinction}
            onChange={setEnhancedColourDistinction}
          />
        </div>
        
        <div className="menu-card" style={{ padding: '2rem', textAlign: 'left', marginBottom: '1.5rem' }}>
          <h3>Scan Table QR Code (Guest View)</h3>
          <button className="btn-orange" style={{ width: '100%', marginTop: '1rem', cursor: 'pointer' }} onClick={() => setView('menu')}>
            Simulate Scan: Enter Table T-04
          </button>

          <button className="btn-orange" style={{ width: '100%', marginTop: '0.5rem', background: '#26221d', color: '#ff9f0a', border: '1px solid #ff9f0a', cursor: 'pointer' }} onClick={() => setView('chef')}>
            Switch to Chef Portal (Kitchen View) 👨‍🍳
          </button>
        </div>
      </div>
    );
  }

  // 2. CHEF PORTAL VIEW
  if (view === 'chef') {
    return (
      <ChefDashboard
        orders={orderedItems}
        updateItemStatus={updateItemStatus}
        setView={setView}
        enhancedColourDistinction={enhancedColourDistinction}
        setEnhancedColourDistinction={setEnhancedColourDistinction}
      />
    );
  }

  // 3. CUSTOMER ORDER STATUS VIEW
  if (view === 'status') {
    return (
      <div className={`web-container order-status-view app-shell${enhancedColourDistinction ? ' enhanced-colors' : ''}`} style={{ padding: '1.5rem', maxWidth: '480px', margin: '0 auto', background: '#0e0d0b', minHeight: '100vh', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #26221d', paddingBottom: '1rem' }}>
          <div>
            <button onClick={() => setView('menu')} style={{ background: 'transparent', border: 'none', color: '#8e8780', cursor: 'pointer', fontSize: '1rem', padding: 0 }}>
              ‹ Back to Menu
            </button>
            <h2 style={{ color: '#ff9f0a', margin: '0.2rem 0 0 0', fontSize: '1.25rem' }}>Live Order Status</h2>
            <span style={{ color: '#8e8780', fontSize: '0.8rem' }}>Table T-04 · Saffron & Silicon</span>
          </div>
          <AccessibilityToggle
            enabled={enhancedColourDistinction}
            onChange={setEnhancedColourDistinction}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {orderedItems.length === 0 ? (
            <p style={{ color: '#8e8780', textAlign: 'center', marginTop: '2rem' }}>No active kitchen orders placed yet.</p>
          ) : (
            orderedItems.flatMap(order => order.items).map((item, index) => (
              <div key={item.lineId ?? `${item.id}-${item.guest}-${index}`} className="order-status-card" style={{ background: '#161412', padding: '1rem', borderRadius: '12px', border: '1px solid #26221d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.2rem 0' }}>{item.name}</h4>
                  <small style={{ color: '#8e8780' }}>Ordered by: {item.guest} · ₹{item.price}</small>
                </div>
                <span className="order-status-indicator" aria-label={`Order status: ${item.status || 'New'}`} style={{ 
                  background: item.status === 'Ready' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 159, 10, 0.1)', 
                  color: item.status === 'Ready' ? '#22c55e' : '#ff9f0a', 
                  border: `1px solid ${item.status === 'Ready' ? '#22c55e' : '#ff9f0a'}`,
                  padding: '0.3rem 0.7rem', 
                  borderRadius: '20px', 
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}>
                  {item.status === 'Ready' ? '✓ ' : '• '}{item.status || 'New'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // 4. MAIN CUSTOMER WEB APP VIEW
  return (
    <div className={`web-container app-shell${enhancedColourDistinction ? ' enhanced-colors' : ''}`}>
      <Navbar
        enhancedColourDistinction={enhancedColourDistinction}
        setEnhancedColourDistinction={setEnhancedColourDistinction}
      />
      <div style={{ background: '#161412', padding: '0.5rem 2rem', borderBottom: '1px solid #26221d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-sponsored" style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', cursor: 'pointer', background: '#26221d', color: '#ff9f0a', border: '1px solid #ff9f0a' }} onClick={() => setView('landing')}>
          ← Back to Home / Switch Role
        </button>
        <button className="btn-sponsored" style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', cursor: 'pointer' }} onClick={() => setView('status')}>
          View My Order Status 📋
        </button>
      </div>

      <div className="dashboard-layout">
        <div className="menu-content-area">
          <GuestSwitcher activeGuest={activeGuest} setActiveGuest={setActiveGuest} />
          
          <div role="group" aria-label="Filter menu by category" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className="category-button"
                aria-pressed={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? '#ff9f0a' : '#161412',
                  color: activeCategory === cat ? '#000' : '#8e8780',
                  border: `1px solid ${activeCategory === cat ? '#ff9f0a' : '#26221d'}`,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {activeCategory === cat ? '✓ ' : ''}{cat}
              </button>
            ))}
          </div>

          <div>
            <h3 style={{ marginBottom: '1rem' }}>
              {activeCategory} · Ordering for: <span style={{ color: '#ff9f0a' }}>{activeGuest}</span>
            </h3>
            <div className="menu-grid">
              {filteredItems.map((item, itemIndex) => (
                <div key={item.id} className="menu-card">
                  <button
                    type="button"
                    className="dish-image-button"
                    onClick={() => setSelectedDish(item)}
                    aria-label={`View ingredients and allergen information for ${item.name}`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      width="400"
                      height="140"
                      loading={itemIndex === 0 ? 'eager' : 'lazy'}
                      fetchPriority={itemIndex === 0 ? 'high' : 'auto'}
                      decoding="async"
                    />
                  </button>
                  <h4 style={{ margin: '0.5rem 0 0.2rem 0' }}>{item.name}</h4>
                  <small style={{ color: '#8e8780' }}>Prep time: {item.time} · Use the image button for ingredient details</small>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <span style={{ color: '#ff9f0a', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{item.price}</span>
                    <button className="btn-orange" onClick={() => addToCart(item)} aria-label={`Add ${item.name} to the table cart`}>+ Add</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CartSidebar
          cart={allTableItems}
          activeGuest={activeGuest}
          removeFromCart={removeFromCart}
          updateItemQuantity={updateItemQuantity}
          payForGuest={payForGuest}
          payForAll={payForAll}
          placeOrderToKitchen={placeOrderToKitchen}
        />
      </div>
      
      {/* Ingredient Modal */}
      {selectedDish && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div role="dialog" aria-modal="true" aria-labelledby="ingredient-modal-title" className="ingredient-modal" style={{ background: '#161412', border: '1px solid #26221d', padding: '2rem', borderRadius: '20px', width: '400px', maxWidth: '90%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 id="ingredient-modal-title" style={{ margin: 0 }}>{selectedDish.name}</h3>
              <button autoFocus aria-label="Close ingredient details" onClick={() => setSelectedDish(null)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>
            <p style={{ color: '#8e8780', fontSize: '0.9rem', marginBottom: '1rem' }}>Ingredients & allergen notes. Confirm allergy information with restaurant staff before ordering.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '250px', overflowY: 'auto' }}>
              {selectedDish.ingredients.map((ing) => (
                <div key={ing.name} className="ingredient-row" style={{ background: '#1c1916', padding: '0.75rem 1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', border: '1px solid #26221d' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                    <span style={{ fontSize: '0.95rem' }}>{ing.name}</span>
                  </div>
                  <div className="ingredient-indicators">
                    <span className={`ingredient-flag ${ing.safe ? 'no-alert-listed' : 'review-ingredient'}`}>
                      {ing.safe ? '✓ No alert listed' : '⚠ Review'}
                    </span>
                    {ing.alert && (
                      <span className="ingredient-alert">Allergen: {ing.alert}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-orange" style={{ width: '100%', marginTop: '1.5rem', cursor: 'pointer' }} onClick={() => setSelectedDish(null)}>
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}