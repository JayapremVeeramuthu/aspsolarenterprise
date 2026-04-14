require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ──────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── ENV Checks ──────────────────────────────────
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const API_URL = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;

// ─── Shared Request Logic ────────────────────────
/**
 * Sends the payload to Meta's WhatsApp API
 */
async function sendToWhatsApp(payload) {
  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
    throw new Error("Missing WhatsApp API configuration in backend .env");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error?.message || data.error?.error_user_msg || "Facebook API Error"
    );
  }

  return data;
}

// ─── Root Route ─────────────────────────────────
app.get("/", (req, res) => {
  res.send("Backend running");
});

// ─── POST /api/send-order ───────────────────────
app.post("/api/send-order", async (req, res) => {
  try {
    const { product_name, price, image_url, product_url, customer_phone, quantity } = req.body;

    const priceText = price ? `₹${price.toLocaleString()}` : "Contact for price";
    const qty = quantity || 1;

    // Build the Meta Cloud API Payload
    const payload = {
      messaging_product: "whatsapp",
      to: customer_phone,
      type: "image",
      image: {
        link: image_url,
        caption: `Hello, I want to order this product:\n\n🛍 Product: ${product_name}\n💰 Price: ${priceText}\n🔢 Quantity: ${qty}\n\n🔗 Product Link: ${product_url || "N/A"}`
      }
    };

    console.log(`Sending single order to ${customer_phone}...`);
    
    // Call Meta API
    const apiResult = await sendToWhatsApp(payload);
    
    console.log("✅ Meta API Success:", apiResult);
    res.json({
      success: true,
      message: "Order placed successfully",
      messageId: apiResult.messages?.[0]?.id,
    });
  } catch (error) {
    console.error("❌ Send Order Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ─── POST /api/send-cart-order ──────────────────
app.post("/api/send-cart-order", async (req, res) => {
  try {
    const { customer_phone, items, total_price } = req.body;

    if (!items || items.length === 0) {
      throw new Error("Cart is empty");
    }

    const itemsList = items
      .map(
        (item, i) =>
          `${i + 1}. ${item.product_name}\n   Qty: ${item.quantity}\n   Price: ${item.price ? `₹${item.price.toLocaleString()}` : "Contact for price"}`
      )
      .join("\n\n");

    const caption = `Hello, I want to order the following products:\n\n${itemsList}\n\n---\nTotal: ₹${total_price.toLocaleString()}\n\nPlease confirm availability and delivery.`;

    // Use the first item's image for the message
    const mainImage = items[0].image_url;

    const payload = {
      messaging_product: "whatsapp",
      to: customer_phone,
      type: "image",
      image: {
        link: mainImage,
        caption: caption
      }
    };

    console.log(`Sending cart order to ${customer_phone}...`);

    // Call Meta API
    const apiResult = await sendToWhatsApp(payload);

    console.log("✅ Meta Cart API Success:", apiResult);
    res.json({
      success: true,
      message: "Cart order placed successfully",
      messageId: apiResult.messages?.[0]?.id,
    });
  } catch (error) {
    console.error("❌ Send Cart Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ─── Start Server ───────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║  ASP Solar — WhatsApp API Backend         ║
║  Running on http://localhost:${PORT}        ║
║  API Configuration loaded from .env       ║
╚═══════════════════════════════════════════╝
  `);
});
