/**
 * MongoDB Connection Configuration
 * 
 * Connects to MongoDB Atlas using the native mongodb driver.
 * Exports the database instance for use across route modules.
 */

import { MongoClient } from 'mongodb';

let client;
let db;

/**
 * Connect to MongoDB and return the database instance.
 * Reuses the existing connection if already connected.
 * Reads env vars at call time (not import time) so dotenv/Render vars are available.
 */
export async function connectDB() {
  if (db) return db;

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/campusmart';
  const DB_NAME = process.env.MONGODB_DB_NAME || 'campusmart';

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log('✅ Connected to MongoDB Atlas');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

/**
 * Get the database instance (must call connectDB first).
 */
export function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
}

/**
 * Close the MongoDB connection gracefully.
 */
export async function closeDB() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

export default getDB;
