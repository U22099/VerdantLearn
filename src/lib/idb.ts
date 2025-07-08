import type { StudySet } from '@/lib/types';

const DB_NAME = 'VerdantLearnDB';
const STORE_NAME = 'studySets';
const DB_VERSION = 1;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject('IndexedDB not supported');
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.error("IndexedDB error:", request.error);
      reject('IndexedDB error');
    };
  });
}

function promisifyRequest<T>(request: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getAllSets(): Promise<StudySet[]> {
  const db = await getDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  return promisifyRequest(store.getAll() as IDBRequest<StudySet[]>);
}

export async function getSet(id: string): Promise<StudySet | undefined> {
    const db = await getDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    return promisifyRequest(store.get(id) as IDBRequest<StudySet | undefined>);
}

export async function putSet(set: StudySet): Promise<IDBValidKey> {
  const db = await getDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  return promisifyRequest(store.put(set));
}

export async function deleteSetFromDB(id: string): Promise<void> {
    const db = await getDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    return promisifyRequest(store.delete(id) as IDBRequest<void>);
}
