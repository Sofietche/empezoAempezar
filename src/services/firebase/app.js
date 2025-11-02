import { getApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/firebaseConfig';

const REQUIRED_KEYS = ['apiKey', 'projectId', 'appId'];

export const isFirebaseConfigured = () => {
  if (!firebaseConfig) {
    return false;
  }

  return REQUIRED_KEYS.every((key) => {
    const value = firebaseConfig[key];
    return typeof value === 'string' && value.trim() && !value.includes('YOUR_');
  });
};

const validateConfig = () => {
  if (!isFirebaseConfigured()) {
    const missing = REQUIRED_KEYS.filter((key) => {
      const value = firebaseConfig?.[key];
      return !value || value.includes('YOUR_');
    });

    throw new Error(
      `Configura Firebase completando los campos: ${missing.join(', ')} en src/config/firebaseConfig.js.`
    );
  }
};

export const getFirebaseApp = () => {
  validateConfig();

  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  return getApp();
};
