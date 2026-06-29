/**
 * CampusMart Express API Server
 * 
 * Entry point for the Node.js Express backend.
 * Mounts all route modules and starts listening on the configured port.
 */

// Load .env file for local development (Render sets env vars natively)
try {
  const dotenv = await import('dotenv');
  dotenv.config();
} catch {
  // dotenv not installed — that's fine in production
}
import express from 'express';
import cors from 'cors';

// Route modules
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import purchasesRouter from './routes/purchases.js';
import reportsRouter from './routes/reports.js';
import chatsRouter from './routes/chats.js';

// Middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS Configuration ─────────────────────────────────────────────
// In production, only allow requests from the deployed frontend.
// In development, allow localhost origins.
const allowedOrigins = [
  'http://localhost:5173',  // Vite dev server
  'http://localhost:3000',  // Alternate dev port
];

// Add the deployed frontend URL if set
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, health checks)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ─── Global Middleware ───────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger (dev only)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// ─── Health Check ────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CampusMart API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ─── API Routes ──────────────────────────────────────────────────────
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/purchases', purchasesRouter);
app.use('/api/reports', reportsRouter);
app.use('/api/chats', chatsRouter);

// ─── Error Handling ──────────────────────────────────────────────────
app.use('/api/*', notFoundHandler);  // Catch unknown /api/* routes
app.use(errorHandler);               // Global error handler

// ─── Start Server ────────────────────────────────────────────────────
// Bind to 0.0.0.0 so Render can route traffic to the container
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   🎓 CampusMart API Server              ║
  ║   Running on port ${PORT}                   ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}             ║
  ║   Health: /api/health                    ║
  ╚══════════════════════════════════════════╝
  `);
});

export default app;
