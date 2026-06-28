/**
 * Chats Routes
 * 
 * Manages chat messages between buyers and sellers for product conversations.
 * 
 * GET  /api/chats/:productId    — Get chat messages for a product
 * POST /api/chats/:productId    — Save/update chat messages for a product
 */

import { Router } from 'express';
import { db, doc, setDoc, getDoc } from '../config/firebase.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/chats/:productId
 * Returns all chat messages for a specific product conversation.
 */
router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    const docRef = doc(db, 'chats', productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      res.json({ success: true, data: data.messages || [] });
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

    const docRef = doc(db, 'chats', productId);
    await setDoc(docRef, { messages });

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
