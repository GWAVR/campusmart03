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
import { db, collection, doc, getDocs, setDoc, deleteDoc, getDoc } from '../config/firebase.js';
import { ApiError } from '../middleware/errorHandler.js';

const router = Router();

/**
 * GET /api/products
 * Returns all products, optionally filtered by category and/or search query.
 */
router.get('/', async (req, res, next) => {
  try {
    const { category, search } = req.query;

    const querySnapshot = await getDocs(collection(db, 'products'));
    let products = [];
    querySnapshot.forEach((docSnapshot) => {
      products.push({ id: docSnapshot.id, ...docSnapshot.data() });
    });

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
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new ApiError(404, `Product not found: ${id}`);
    }

    res.json({ success: true, data: { id: docSnap.id, ...docSnap.data() } });
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

    if (!product.id || !product.title || !product.price || !product.category) {
      throw new ApiError(400, 'Missing required fields: id, title, price, category');
    }

    await setDoc(doc(db, 'products', product.id), product);

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

    // Verify the product exists
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new ApiError(404, `Product not found: ${id}`);
    }

    // Merge updates
    const updatedProduct = { ...docSnap.data(), ...updates, id };
    await setDoc(docRef, updatedProduct);

    res.json({ success: true, data: updatedProduct, message: 'Product updated successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/products/:id
 * Removes a product listing from Firestore.
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verify the product exists
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new ApiError(404, `Product not found: ${id}`);
    }

    await deleteDoc(docRef);

    res.json({ success: true, message: `Product ${id} deleted successfully` });
  } catch (error) {
    next(error);
  }
});

export default router;
