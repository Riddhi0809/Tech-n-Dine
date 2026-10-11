/** Normalise guest names so values such as "You" and " you " match. */
export function normalizeGuestName(name) {
  return String(name ?? '').trim().toLowerCase();
}

/** Return a usable quantity for older or incomplete saved items. */
export function getItemQuantity(quantity) {
  const parsedQuantity = Number(quantity);
  return Number.isInteger(parsedQuantity) && parsedQuantity > 0
    ? parsedQuantity
    : 1;
}

/** Calculate the total price for one cart/order line. */
export function getItemTotal(item) {
  const price = Number(item?.price) || 0;
  return price * getItemQuantity(item?.quantity);
}

/** Create a reasonably unique ID without adding another package. */
export function createId(prefix) {
  const randomId = globalThis.crypto?.randomUUID?.()
    ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  return `${prefix}-${randomId}`;
}
