/**
 * Firebase Configuration for Express Backend
 * 
 * Uses the existing Firebase client SDK credentials from firebase-applet-config.json.
 * For production deployments, migrate to firebase-admin with a service account key.
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
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Firebase config from the project root
const configPath = resolve(__dirname, '../../firebase-applet-config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig, 'server-app');

// Initialize Firestore with custom database ID if available
const db = config.firestoreDatabaseId
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

export { db, collection, doc, getDocs, setDoc, deleteDoc, getDoc };
export default db;
