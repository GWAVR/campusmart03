/**
 * CampusMart Express API Server
 * 
 * Entry point for the Node.js Express backend.
 * Mounts all route modules and starts listening on the configured port.
 */

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

// ─── Global Middleware ───────────────────────────────────────────────
app.use(cors());
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
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   🎓 CampusMart API Server              ║
  ║   Running on http://localhost:${PORT}      ║
  ║   Health: http://localhost:${PORT}/api/health ║
  ╚══════════════════════════════════════════╝
  `);
});

export default app;
