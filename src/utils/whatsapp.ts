const WHATSAPP_PHONE = "919003028001";

/**
 * Opens WhatsApp with a pre-filled message
 */
export function sendToWhatsApp(message: string) {
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/**
 * Generate a WhatsApp message for a single product order
 */
export function generateSingleProductMessage(
  productName: string,
  price: number | null,
  quantity: number = 1,
  pageUrl?: string
): string {
  const priceText = price ? `₹${price.toLocaleString()}` : "Contact for price";
  const link = pageUrl || window.location.href;

  return `Hello, I want to order this product:

🛍 Product: ${productName}
💰 Price: ${priceText}
🔢 Quantity: ${quantity}

🔗 Product Link: ${link}`;
}

/**
 * Generate a WhatsApp message for cart (multiple products)
 */
export function generateCartMessage(
  items: { name: string; quantity: number; price: number | null }[],
  totalPrice: number
): string {
  const itemsList = items
    .map(
      (item, i) => `${i + 1}. ${item.name}
🔢 Qty: ${item.quantity}
💰 Price: ${item.price ? `₹${item.price.toLocaleString()}` : "Contact for price"}`
    )
    .join("\n\n");

  return `Hello, I want to order the following products:

${itemsList}

---
Total: ₹${totalPrice.toLocaleString()}`;
}
