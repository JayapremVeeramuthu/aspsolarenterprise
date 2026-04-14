require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Security Middleware ────────────────────────
app.use(helmet());

// ─── CORS Configuration ────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:8080")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// ─── Rate Limiting ──────────────────────────────
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10), // 15 minutes default
  max: parseInt(process.env.RATE_LIMIT_MAX || "20", 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests. Please wait before trying again.",
    code: "RATE_LIMIT_EXCEEDED",
  },
});

app.use("/api/", limiter);

// ─── Body Parsing ───────────────────────────────
app.use(express.json({ limit: "1mb" }));

// ─── API Routes ─────────────────────────────────
app.use("/api", routes);

// ─── 404 Handler ────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// ─── Global Error Handler ───────────────────────
app.use((err, req, res, _next) => {
  console.error("[Server Error]", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      error: "CORS: Origin not allowed",
    });
  }

  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// ─── Start Server ───────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║  ASP Solar - WhatsApp Order API                  ║
║  Running on http://localhost:${PORT}               ║
║  Environment: ${process.env.NODE_ENV || "development"}                    ║
╚══════════════════════════════════════════════════╝
  `);

  // Verify configuration
  if (!process.env.WHATSAPP_PHONE_NUMBER_ID || !process.env.WHATSAPP_ACCESS_TOKEN) {
    console.warn(
      "⚠️  WhatsApp API credentials not configured. Copy .env.example to .env and add your credentials."
    );
  } else {
    console.log("✅ WhatsApp API credentials loaded");
  }
});

module.exports = app;
