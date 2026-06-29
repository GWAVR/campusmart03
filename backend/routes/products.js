/**
 * Products Routes
 * 
 * CRUD operations for product listings in CampusMart.
 * 
 * GET    /api/products          — List all products (with optional ?category= and ?search= filters)
 * GET    /api/products/:id      — Get a single product by ID
 * POST   /api/products          — Create a new product listing
 * PUT    /api/products/:id      — Update an existing product
 * DELETE /api/products/:id      — Remove a product listing
 */

import { Router } from 'express';
import { getDB } from '../config/db.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/products
 * Returns all products, optionally filtered by category and/or search query.
 */
router.get('/', async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const db = getDB();

    let products = await db.collection('products').find().toArray();

    // Map _id to id for frontend compatibility
    products = products.map(({ _id, ...rest }) => ({ id: _id, ...rest }));

    // Apply category filter
    if (category && category.trim() !== '') {
      products = products.filter(
        (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply search filter (searches title and description)
    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase();
      products = products.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(searchLower)) ||
          (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }

    res.json({ success: true, data: products, count: products.length });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/products/:id
 * Returns a single product by its ID.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();

    const product = await db.collection('products').findOne({ _id: id });

    if (!product) {
      throw new ApiError(404, `Product not found: ${id}`);
    }

    const { _id, ...rest } = product;
    res.json({ success: true, data: { id: _id, ...rest } });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/products
 * Creates a new product listing. Expects full product object in request body.
 */
router.post('/', async (req, res, next) => {
  try {
    const product = req.body;
    const db = getDB();

    if (!product.id || !product.title || !product.price || !product.category) {
      throw new ApiError(400, 'Missing required fields: id, title, price, category');
    }

    // Use product.id as _id for consistent document IDs
    const doc = { _id: product.id, ...product };
    delete doc.id;

    await db.collection('products').updateOne(
      { _id: doc._id },
      { $set: doc },
      { upsert: true }
    );

    res.status(201).json({ success: true, data: product, message: 'Product created successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/products/:id
 * Updates an existing product. Merges provided fields with existing data.
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const db = getDB();

    // Verify the product exists
    const existing = await db.collection('products').findOne({ _id: id });
    if (!existing) {
      throw new ApiError(404, `Product not found: ${id}`);
    }

    // Merge updates
    const updatedProduct = { ...existing, ...updates, _id: id };
    await db.collection('products').updateOne(
      { _id: id },
      { $set: updatedProduct }
    );

    const { _id, ...rest } = updatedProduct;
    res.json({ success: true, data: { id: _id, ...rest }, message: 'Product updated successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/products/:id
 * Removes a product listing from the database.
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const db = getDB();

    // Verify the product exists
    const existing = await db.collection('products').findOne({ _id: id });
    if (!existing) {
      throw new ApiError(404, `Product not found: ${id}`);
    }

    await db.collection('products').deleteOne({ _id: id });

    res.json({ success: true, message: `Product ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
});

export default router;
