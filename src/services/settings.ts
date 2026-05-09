import { AppSettings } from '../types';
import { FirestoreRepository } from './FirestoreRepository';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export class SettingsService {
  private collectionName = 'settings';
  private docId = 'app-config';

  async getSettings(): Promise<AppSettings | null> {
    const docRef = doc(db, this.collectionName, this.docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as AppSettings;
    }
    return null;
  }

  async updateSettings(settings: AppSettings): Promise<void> {
    const docRef = doc(db, this.collectionName, this.docId);
    await setDoc(docRef, settings);
  }
}

export const settingsService = new SettingsService();
