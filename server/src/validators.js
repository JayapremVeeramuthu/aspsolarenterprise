const Joi = require("joi");

/**
 * Validation schema for /send-order endpoint
 */
const sendOrderSchema = Joi.object({
  product_name: Joi.string().trim().min(1).max(200).required().messages({
    "string.empty": "Product name is required",
    "string.max": "Product name must be under 200 characters",
    "any.required": "Product name is required",
  }),

  price: Joi.number().min(0).max(10000000).allow(null).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),

  image_url: Joi.string().uri().max(2048).required().messages({
    "string.uri": "Invalid image URL format",
    "string.max": "Image URL is too long",
    "any.required": "Product image URL is required",
  }),

  customer_phone: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be 10-15 digits (no spaces, dashes, or country code prefix)",
      "any.required": "Customer phone number is required",
    }),

  product_url: Joi.string().uri().max(2048).allow("", null).optional().messages({
    "string.uri": "Invalid product URL format",
  }),

  quantity: Joi.number().integer().min(1).max(999).default(1).messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be a whole number",
    "number.min": "Quantity must be at least 1",
    "number.max": "Quantity cannot exceed 999",
  }),
});

/**
 * Validation schema for /send-cart-order (multiple items)
 */
const sendCartOrderSchema = Joi.object({
  customer_phone: Joi.string()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be 10-15 digits (no spaces, dashes, or country code prefix)",
      "any.required": "Customer phone number is required",
    }),

  items: Joi.array()
    .items(
      Joi.object({
        product_name: Joi.string().trim().min(1).max(200).required(),
        price: Joi.number().min(0).allow(null).required(),
        image_url: Joi.string().uri().max(2048).required(),
        quantity: Joi.number().integer().min(1).max(999).default(1),
      })
    )
    .min(1)
    .max(50)
    .required()
    .messages({
      "array.min": "At least one item is required",
      "array.max": "Maximum 50 items per order",
      "any.required": "Cart items are required",
    }),

  total_price: Joi.number().min(0).required(),
});

module.exports = { sendOrderSchema, sendCartOrderSchema };
