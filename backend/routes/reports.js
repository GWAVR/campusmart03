/**
 * Reports Routes
 * 
 * Manages product safety/pricing reports from users.
 * 
 * GET    /api/reports              — List all product reports
 * POST   /api/reports              — Submit a new product report
 * DELETE /api/reports/:productId   — Dismiss/remove a report by product ID
 */

import { Router } from 'express';
import { getDB } from '../config/db.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/reports
 * Returns all product reports.
 */
router.get('/', async (req, res, next) => {
  try {
    const db = getDB();
    let reports = await db.collection('product_reports').find().toArray();

    // Map _id to id for frontend compatibility
    reports = reports.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

    res.json({ success: true, data: reports, count: reports.length });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/reports
 * Submit a new product report.
 * Body: { productId, reason, details, timestamp }
 */
router.post('/', async (req, res, next) => {
  try {
    const report = req.body;
    const db = getDB();

    if (!report.productId || !report.reason || !report.details) {
      throw new ApiError(400, 'Missing required fields: productId, reason, details');
    }

    // Default timestamp if not provided
    report.timestamp = report.timestamp || new Date().toLocaleDateString();

    // Use productId as the document ID (one report per product)
    await db.collection('product_reports').updateOne(
      { _id: report.productId },
      { $set: { ...report, _id: report.productId } },
      { upsert: true }
    );

    res.status(201).json({
      success: true,
      data: report,
      message: 'Report submitted successfully',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/reports/:productId
 * Dismiss/remove a product report.
 */
router.delete('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const db = getDB();

    await db.collection('product_reports').deleteOne({ _id: productId });

    res.json({ success: true, message: `Report for product ${productId} dismissed` });
  } catch (error) {
    next(error);
  }
});

export default router;
