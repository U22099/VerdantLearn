'use client';

import { useState, useEffect, useCallback } from 'react';
import type { StudySet, Flashcard } from '@/lib/types';

const LOCAL_STORAGE_KEY = 'verdantlearn-studysets';

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
    try {
      const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (item) {
        setStudySets(JSON.parse(item));
      } else {
        // First time user, set initial data
        const initialData = getInitialData();
        setStudySets(initialData);
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
      }
    } catch (error) {
      console.error('Failed to load from localStorage', error);
      setStudySets(getInitialData());
    } finally {
        setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(studySets));
      } catch (error) {
        console.error('Failed to save to localStorage', error);
      }
    }
  }, [studySets, isLoaded]);

  const addSet = useCallback((name: string) => {
    const newSet: StudySet = {
      id: Date.now().toString(),
      name,
      cards: [],
    };
    setStudySets((prevSets) => [...prevSets, newSet]);
    return newSet;
  }, []);

  const addCardToSet = useCallback((setId: string, front: string, back: string) => {
    setStudySets((prevSets) =>
      prevSets.map((set) => {
        if (set.id === setId) {
          const newCard: Flashcard = {
            id: `${setId}-${Date.now()}`,
            front,
            back,
            isLearned: false,
          };
          return { ...set, cards: [...set.cards, newCard] };
        }
        return set;
      })
    );
  }, []);

  const updateCardLearnedStatus = useCallback((setId: string, cardId: string, isLearned: boolean) => {
    setStudySets((prevSets) =>
      prevSets.map((set) => {
        if (set.id === setId) {
          return {
            ...set,
            cards: set.cards.map((card) =>
              card.id === cardId ? { ...card, isLearned } : card
            ),
          };
        }
        return set;
      })
    );
  }, []);
  
  const deleteSet = useCallback((setId: string) => {
    setStudySets(prevSets => prevSets.filter(set => set.id !== setId));
  }, []);

  const deleteCard = useCallback((setId: string, cardId: string) => {
    setStudySets(prevSets => prevSets.map(set => {
      if (set.id === setId) {
        return { ...set, cards: set.cards.filter(card => card.id !== cardId) };
      }
      return set;
    }));
  }, []);


  return { studySets, addSet, addCardToSet, updateCardLearnedStatus, isLoaded, deleteSet, deleteCard };
}
