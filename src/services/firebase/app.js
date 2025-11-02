import { getApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/firebaseConfig';

const validateConfig = () => {
  if (!firebaseConfig) {
    throw new Error('Firebase config is undefined. Revisa src/config/firebaseConfig.js.');
  }

  const requiredKeys = ['apiKey', 'projectId', 'appId'];
  const missing = requiredKeys.filter((key) => {
    const value = firebaseConfig[key];
    return !value || value.includes('YOUR_');
  });

  if (missing.length) {
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
