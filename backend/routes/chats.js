/**
 * Chats Routes
 * 
 * Manages chat messages between buyers and sellers for product conversations.
 * 
 * GET  /api/chats/:productId    — Get chat messages for a product
 * POST /api/chats/:productId    — Save/update chat messages for a product
 */

import { Router } from 'express';
import { getDB } from '../config/db.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/chats/:productId
 * Returns all chat messages for a specific product conversation.
 */
router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const db = getDB();

    const chat = await db.collection('chats').findOne({ _id: productId });

    if (chat) {
      res.json({ success: true, data: chat.messages || [] });
    } else {
      // No chat thread exists yet for this product
      res.json({ success: true, data: [] });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/chats/:productId
 * Saves/overwrites chat messages for a specific product conversation.
 * Body: { messages: ChatMessage[] }
 */
router.post('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      throw new ApiError(400, 'messages must be an array of chat message objects');
    }

    const db = getDB();
    await db.collection('chats').updateOne(
      { _id: productId },
      { $set: { messages } },
      { upsert: true }
    );

    res.json({
      success: true,
      data: messages,
      message: 'Chat messages saved successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
