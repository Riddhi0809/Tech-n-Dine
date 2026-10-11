import { getItemTotal, normalizeGuestName } from '../utils/orderHelpers';

export default function CartSidebar({
  cart,
  activeGuest,
  removeFromCart,
  updateItemQuantity,
  payForGuest,
  payForAll,
  placeOrderToKitchen,
}) {
  // Show personal total, including quantities.
  const personalItems = cart.filter(
    (item) => normalizeGuestName(item.guest) === 'you'
  );
  const personalTotal = personalItems.reduce(
    (total, item) => total + getItemTotal(item),
    0
  );

  // Calculate the active guest's total, including quantities.
const activeGuestItems = cart.filter(
  (item) =>
    normalizeGuestName(item.guest) ===
    normalizeGuestName(activeGuest)
);

const activeGuestTotal = activeGuestItems.reduce(
  (total, item) => total + getItemTotal(item),
  0
);
  // Add all visible items to calculate the table total.
  const grandTotal = cart.reduce(
    (total, item) => total + getItemTotal(item),
    0
  );

  const handlePayForGuest = () => {
    if (personalItems.length === 0) {
      window.alert(`${activeGuest} has no items in the table summary to pay for.`);
      return;
    }

    window.alert(
      `Processing individual payment for ${activeGuest}. Total: ₹${personalTotal}`
    );
    payForGuest(activeGuest);
  };

  const handlePayForAll = () => {
    if (cart.length === 0) {
      window.alert('The table summary is empty!');
      return;
    }

    window.alert(
      `${activeGuest} is sponsoring the entire table bill! Total: ₹${grandTotal}`
    );
    payForAll();
  };

  return (
    <aside className="cart-sidebar">
      <h3>Table Cart Summary</h3>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="cart-empty">No items added to table yet.</p>
        ) : (
          cart.map((item, index) => (
            <div
              className="cart-item"
              key={item.lineId ?? `${item.id}-${item.guest}-${index}`}
            >
              <div className="cart-item-header">
                <div className="cart-item-details">
                  <strong>{item.name}</strong>
                  <div className="cart-item-price">₹{getItemTotal(item)}</div>
                </div>
                <button
                  className="remove-cart-item"
                  onClick={() => removeFromCart(item)}
                  title="Remove item"
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
              <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                <button
                  onClick={() => updateItemQuantity(item, -1)}
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  −
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  onClick={() => updateItemQuantity(item, 1)}
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
              </div>
              <small className="cart-item-guest">Ordered by: {item.guest}</small>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <div className="cart-total-row cart-personal-total">
          <span>{activeGuest}:</span>
          <span>₹{activeGuestTotal}</span>
        </div>
        <div className="cart-total-row cart-grand-total">
          <span>Table Total:</span>
          <span>₹{grandTotal}</span>
        </div>

        <button className="btn-orange" onClick={placeOrderToKitchen}>
          Place Order to Kitchen
        </button>

        <div className="payment-actions">
          <button className="btn-orange" onClick={handlePayForGuest}>
            Pay for Me (₹{personalTotal})
          </button>
          <button className="btn-sponsored" onClick={handlePayForAll}>
            Pay for All (₹{grandTotal})
          </button>
        </div>
      </div>
    </aside>
  );
}
