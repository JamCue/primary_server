// src/config/firebase.ts
import {cert, getApps, initializeApp} from 'firebase-admin/app';

export const connectFirebase = (): void => {
  if (getApps().length) {
    return;
  }

  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });

    console.log('✅ Firebase connected');
  } catch (error) {
    console.error('❌ Firebase connection failed');
    throw error;
  }
};
