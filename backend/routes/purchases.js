/**
 * Purchases Routes
 * 
 * Manages purchase/transaction records.
 * 
 * GET  /api/purchases    — List all purchase records
 * POST /api/purchases    — Create a new purchase record
 */

import { Router } from 'express';
import { getDB } from '../config/db.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/purchases
 * Returns all purchase records.
 */
router.get('/', async (req, res, next) => {
  try {
    const db = getDB();
    let purchases = await db.collection('purchases').find().toArray();

    // Map _id to id for frontend compatibility
    purchases = purchases.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

    res.json({ success: true, data: purchases, count: purchases.length });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/purchases
 * Creates a new purchase record.
 * Body: { id, productId, title, price, image, date, status }
 */
router.post('/', async (req, res, next) => {
  try {
    const record = req.body;
    const db = getDB();

    if (!record.id || !record.productId) {
      throw new ApiError(400, 'Missing required fields: id, productId');
    }

    // Set defaults if not provided
    record.status = record.status || 'Processing';
    record.date = record.date || new Date().toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

    // Use record.id as _id
    const doc = { _id: record.id, ...record };
    delete doc.id;

    await db.collection('purchases').updateOne(
      { _id: doc._id },
      { $set: doc },
      { upsert: true }
    );

    res.status(201).json({
      success: true,
      data: record,
      message: 'Purchase recorded successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
