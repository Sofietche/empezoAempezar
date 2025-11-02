import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { getFirebaseApp } from '../firebase/app';

const sanitizeCard = (doc) => {
  const data = doc.data();
  const text = data?.text?.trim();

  if (!text) {
    return null;
  }

  return {
    id: doc.id,
    text,
    type: data?.type === 'reto' ? 'reto' : 'pregunta'
  };
};

export const fetchDeckFromFirebase = async () => {
  const app = getFirebaseApp();
  const db = getFirestore(app);

  const cardsRef = collection(db, 'deck');
  const snapshot = await getDocs(query(cardsRef, orderBy('order', 'asc'))).catch(async (error) => {
    if (error.code === 'failed-precondition') {
      // Firestore rules might forbid ordering when index missing. Retry without ordering.
      const fallbackSnapshot = await getDocs(cardsRef);
      return fallbackSnapshot;
    }
    throw error;
  });

  const cards = snapshot.docs
    .map(sanitizeCard)
    .filter(Boolean);

  return cards;
};
