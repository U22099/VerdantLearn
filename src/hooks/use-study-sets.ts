'use client';

import { useState, useEffect, useCallback } from 'react';
import type { StudySet, Flashcard } from '@/lib/types';
import { getAllSets, getSet, putSet, deleteSetFromDB } from '@/lib/idb';

const getInitialData = (): StudySet[] => {
  return [
    {
      id: '1',
      name: 'Spanish Vocabulary',
      cards: [
        { id: '1-1', front: 'Hola', back: 'Hello', isLearned: true },
        { id: '1-2', front: 'Adiós', back: 'Goodbye', isLearned: false },
        { id: '1-3', front: 'Gracias', back: 'Thank you', isLearned: true },
      ],
    },
    {
      id: '2',
      name: 'React Hooks',
      cards: [
        { id: '2-1', front: 'useState', back: 'A Hook that lets you add React state to function components.', isLearned: true },
        { id: '2-2', front: 'useEffect', back: 'A Hook that lets you perform side effects in function components.', isLearned: true },
        { id: '2-3', front: 'useContext', back: 'Accepts a context object and returns the current context value.', isLearned: false },
        { id: '2-4', front: 'useReducer', back: 'An alternative to useState. Accepts a reducer of type (state, action) => newState.', isLearned: false },
      ],
    },
  ];
};

export function useStudySets() {
  const [studySets, setStudySets] = useState<StudySet[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        setStudySets(getInitialData()); // Fallback for SSR or no IDB support
        setIsLoaded(true);
        return;
      }
      try {
        let sets = await getAllSets();
        if (sets.length === 0) {
          const initialData = getInitialData();
          for (const set of initialData) {
            await putSet(set);
          }
          sets = initialData;
        }
        setStudySets(sets);
      } catch (error) {
        console.error('Failed to load from IndexedDB', error);
        setStudySets(getInitialData());
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  const addSet = useCallback(async (name: string) => {
    const newSet: StudySet = {
      id: Date.now().toString(),
      name,
      cards: [],
    };
    await putSet(newSet);
    setStudySets((prevSets) => [...prevSets, newSet]);
    return newSet;
  }, []);

  const addCardToSet = useCallback(async (setId: string, front: string, back: string) => {
    const set = await getSet(setId);
    if (!set) return;

    const newCard: Flashcard = {
      id: `${setId}-${Date.now()}`,
      front,
      back,
      isLearned: false,
    };
    
    const updatedSet = { ...set, cards: [...set.cards, newCard] };
    await putSet(updatedSet);

    setStudySets((prevSets) =>
      prevSets.map((s) => (s.id === setId ? updatedSet : s))
    );
  }, []);

  const updateCardLearnedStatus = useCallback(async (setId: string, cardId: string, isLearned: boolean) => {
    const set = await getSet(setId);
    if (!set) return;

    const updatedCards = set.cards.map((card) =>
        card.id === cardId ? { ...card, isLearned } : card
    );
    const updatedSet = { ...set, cards: updatedCards };
    await putSet(updatedSet);

    setStudySets((prevSets) =>
      prevSets.map((s) => (s.id === setId ? updatedSet : s))
    );
  }, []);
  
  const deleteSet = useCallback(async (setId: string) => {
    await deleteSetFromDB(setId);
    setStudySets(prevSets => prevSets.filter(set => set.id !== setId));
  }, []);

  const deleteCard = useCallback(async (setId: string, cardId: string) => {
    const set = await getSet(setId);
    if (!set) return;

    const updatedCards = set.cards.filter(card => card.id !== cardId);
    const updatedSet = { ...set, cards: updatedCards };
    await putSet(updatedSet);
    
    setStudySets(prevSets => prevSets.map(s => s.id === setId ? updatedSet : s));
  }, []);


  return { studySets, addSet, addCardToSet, updateCardLearnedStatus, isLoaded, deleteSet, deleteCard };
}
