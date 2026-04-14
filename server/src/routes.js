const express = require("express");
const { sendOrderSchema, sendCartOrderSchema } = require("./validators");
const {
  sendImageMessage,
  formatOrderCaption,
  formatCartCaption,
} = require("./whatsappService");

const router = express.Router();

/**
 * POST /api/send-order
 * Send a single product order via WhatsApp with product image
 */
router.post("/send-order", async (req, res) => {
  try {
    // Validate request body
    const { error, value } = sendOrderSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((d) => d.message);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }

    const { product_name, price, image_url, customer_phone, product_url, quantity } = value;

    // Format the caption
    const caption = formatOrderCaption({
      productName: product_name,
      price,
      quantity,
      productUrl: product_url,
    });

    // Send via WhatsApp Cloud API
    const result = await sendImageMessage({
      to: customer_phone,
      imageUrl: image_url,
      caption,
    });

    return res.status(200).json({
      success: true,
      message: "Order sent to WhatsApp successfully ✅",
      messageId: result?.messages?.[0]?.id,
    });
  } catch (err) {
    console.error("[/send-order Error]", err.message);

    // Distinguish between API errors and server errors
    const status = err.status || 500;
    const isApiError = err.code && err.apiResponse;

    return res.status(status).json({
      success: false,
      error: isApiError
        ? "WhatsApp API error: " + err.message
        : "Failed to send order. Please try again.",
      code: err.code || "INTERNAL_ERROR",
      // Include fallback info so frontend can use wa.me link
      fallback: true,
    });
  }
});

/**
 * POST /api/send-cart-order
 * Send a cart order (multiple items) via WhatsApp
 * Sends first item's image with full cart details as caption
 */
router.post("/send-cart-order", async (req, res) => {
  try {
    // Validate request body
    const { error, value } = sendCartOrderSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((d) => d.message);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }

    const { customer_phone, items, total_price } = value;

    // Format the cart caption
    const caption = formatCartCaption({
      items,
      totalPrice: total_price,
    });

    // Use the first item's image for the message
    const firstItemImage = items[0].image_url;

    // Send via WhatsApp Cloud API
    const result = await sendImageMessage({
      to: customer_phone,
      imageUrl: firstItemImage,
      caption,
    });

    return res.status(200).json({
      success: true,
      message: "Cart order sent to WhatsApp successfully ✅",
      messageId: result?.messages?.[0]?.id,
    });
  } catch (err) {
    console.error("[/send-cart-order Error]", err.message);

    const status = err.status || 500;
    const isApiError = err.code && err.apiResponse;

    return res.status(status).json({
      success: false,
      error: isApiError
        ? "WhatsApp API error: " + err.message
        : "Failed to send cart order. Please try again.",
      code: err.code || "INTERNAL_ERROR",
      fallback: true,
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get("/health", (req, res) => {
  const hasCredentials =
    !!process.env.WHATSAPP_PHONE_NUMBER_ID && !!process.env.WHATSAPP_ACCESS_TOKEN;

  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    whatsapp_configured: hasCredentials,
  });
});

module.exports = router;
