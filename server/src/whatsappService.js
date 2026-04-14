/**
 * WhatsApp Cloud API Service
 * Handles sending messages via Meta's WhatsApp Business Cloud API
 */

const WHATSAPP_API_VERSION = "v19.0";

/**
 * Send an image message with caption via WhatsApp Cloud API
 */
async function sendImageMessage({ to, imageUrl, caption }) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    throw new Error(
      "WhatsApp API credentials are not configured. Set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN in .env"
    );
  }

  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    to: to,
    type: "image",
    image: {
      link: imageUrl,
      caption: caption,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data?.error?.message || data?.error?.error_data?.details || "Unknown WhatsApp API error";
    const errorCode = data?.error?.code || response.status;

    console.error("[WhatsApp API Error]", {
      status: response.status,
      code: errorCode,
      message: errorMessage,
      details: data?.error,
    });

    const error = new Error(errorMessage);
    error.code = errorCode;
    error.status = response.status;
    error.apiResponse = data;
    throw error;
  }

  console.log("[WhatsApp API Success]", {
    messageId: data?.messages?.[0]?.id,
    to: to,
  });

  return data;
}

/**
 * Format a single product order caption
 */
function formatOrderCaption({ productName, price, quantity, productUrl }) {
  const priceText = price != null ? `₹${Number(price).toLocaleString("en-IN")}` : "Contact for price";

  let caption = `Hello, I want to order this product:

🛍 Product: ${productName}
💰 Price: ${priceText}
🔢 Quantity: ${quantity}`;

  if (productUrl) {
    caption += `\n\n🔗 Product Link: ${productUrl}`;
  }

  return caption;
}

/**
 * Format a cart order caption (text-only, first item image sent separately)
 */
function formatCartCaption({ items, totalPrice }) {
  const itemsList = items
    .map(
      (item, i) =>
        `${i + 1}. ${item.product_name}\n   Qty: ${item.quantity}\n   Price: ${
          item.price != null ? `₹${Number(item.price).toLocaleString("en-IN")}` : "Contact for price"
        }`
    )
    .join("\n\n");

  return `Hello, I want to order the following products:

${itemsList}

───────────────
Total: ₹${Number(totalPrice).toLocaleString("en-IN")}

Please confirm availability and delivery.`;
}

module.exports = {
  sendImageMessage,
  formatOrderCaption,
  formatCartCaption,
};
