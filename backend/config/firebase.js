/**
 * Firebase Configuration for Express Backend
 * 
 * Loads Firebase credentials from environment variables (for production on Render)
 * with a fallback to firebase-applet-config.json for local development.
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Load Firebase Config ────────────────────────────────────────────
// Priority: Environment variables > firebase-applet-config.json file

let firebaseConfig;

if (process.env.FIREBASE_API_KEY) {
  // Production: load from environment variables (Render dashboard)
  console.log('🔑 Loading Firebase config from environment variables');
  firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
} else {
  // Development: load from local config file
  const configPath = resolve(__dirname, '../../firebase-applet-config.json');
  if (!existsSync(configPath)) {
    throw new Error(
      'Firebase config not found. Set FIREBASE_API_KEY env var or provide firebase-applet-config.json'
    );
  }
  console.log('📄 Loading Firebase config from firebase-applet-config.json');
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));
  firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  };
}

// Initialize Firebase App
const app = initializeApp(firebaseConfig, 'server-app');

// Initialize Firestore with custom database ID if available
const firestoreDatabaseId = process.env.FIREBASE_FIRESTORE_DATABASE_ID;
let db;

if (firestoreDatabaseId) {
  db = getFirestore(app, firestoreDatabaseId);
} else {
  // Fallback: check the local config file for the database ID
  try {
    const configPath = resolve(__dirname, '../../firebase-applet-config.json');
    if (existsSync(configPath)) {
      const config = JSON.parse(readFileSync(configPath, 'utf-8'));
      if (config.firestoreDatabaseId) {
        db = getFirestore(app, config.firestoreDatabaseId);
      } else {
        db = getFirestore(app);
      }
    } else {
      db = getFirestore(app);
    }
  } catch {
    db = getFirestore(app);
  }
}

export { db, collection, doc, getDocs, setDoc, deleteDoc, getDoc };
export default db;
