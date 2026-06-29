/**
 * Users Routes
 * 
 * Manages user saved items and student verification.
 * 
 * GET  /api/users/:email/saved    — Get saved product IDs for a user
 * PUT  /api/users/:email/saved    — Update saved product IDs for a user
 * POST /api/users/verify          — Mock student email verification
 */

import { Router } from 'express';
import { getDB } from '../config/db.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/users/:email/saved
 * Returns the list of saved product IDs for a user identified by email.
 */
router.get('/:email/saved', async (req, res, next) => {
  try {
    const { email } = req.params;
    const db = getDB();

    if (!email) {
      throw new ApiError(400, 'Email parameter is required');
    }

    const user = await db.collection('users').findOne({ _id: email });

    if (user) {
      res.json({ success: true, data: user.savedProductIds || [] });
    } else {
      // User document doesn't exist yet — return empty
      res.json({ success: true, data: [] });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/users/:email/saved
 * Updates the list of saved product IDs for a user.
 * Body: { savedProductIds: string[] }
 */
router.put('/:email/saved', async (req, res, next) => {
  try {
    const { email } = req.params;
    const { savedProductIds } = req.body;
    const db = getDB();

    if (!email) {
      throw new ApiError(400, 'Email parameter is required');
    }

    if (!Array.isArray(savedProductIds)) {
      throw new ApiError(400, 'savedProductIds must be an array of strings');
    }

    await db.collection('users').updateOne(
      { _id: email },
      { $set: { savedProductIds } },
      { upsert: true }
    );

    res.json({ success: true, data: savedProductIds, message: 'Saved items updated' });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/users/verify
 * Mock student email verification.
 * Body: { name: string, email: string, university: string }
 * 
 * In a real application, this would send a verification email
 * and check against a university email domain whitelist.
 */
router.post('/verify', async (req, res, next) => {
  try {
    const { name, email, university } = req.body;

    if (!name || !email) {
      throw new ApiError(400, 'Name and email are required for verification');
    }

    // Mock verification: check if email ends with .edu
    const isEduEmail = email.toLowerCase().endsWith('.edu');

    // Check for admin email
    const isAdmin = email.toLowerCase() === 'admin@university.edu';

    res.json({
      success: true,
      data: {
        name,
        email,
        university: university || 'University of Tech',
        isVerified: isEduEmail,
        isAdmin,
      },
      message: isEduEmail
        ? 'Student email verified successfully'
        : 'Email is not a recognized .edu address — limited access granted',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
