/**
 * Purchases Routes
 * 
 * Manages purchase/transaction records.
 * 
 * GET  /api/purchases    — List all purchase records
 * POST /api/purchases    — Create a new purchase record
 */

import { Router } from 'express';
import { db, collection, doc, getDocs, setDoc } from '../config/firebase.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/purchases
 * Returns all purchase records.
 */
router.get('/', async (req, res, next) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'purchases'));
    const purchases = [];
    querySnapshot.forEach((docSnapshot) => {
      purchases.push({ id: docSnapshot.id, ...docSnapshot.data() });
    });

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

    if (!record.id || !record.productId) {
      throw new ApiError(400, 'Missing required fields: id, productId');
    }

    // Set defaults if not provided
    record.status = record.status || 'Processing';
    record.date = record.date || new Date().toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

    await setDoc(doc(db, 'purchases', record.id), record);

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
