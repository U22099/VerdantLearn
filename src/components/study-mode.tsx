'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { StudySet } from '@/lib/types';
import { Flashcard } from '@/components/flashcard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';

interface StudyModeProps {
  studySet: StudySet;
  updateCardLearnedStatus: (setId: string, cardId: string, isLearned: boolean) => void;
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;
    const newArray = [...array];
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    }
  
    return newArray;
};

export function StudyMode({ studySet, updateCardLearnedStatus }: StudyModeProps) {
  const [shuffledCards, setShuffledCards] = useState(() => shuffleArray(studySet.cards));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleShuffle = useCallback(() => {
    setShuffledCards(shuffleArray(studySet.cards));
    setCurrentIndex(0);
  }, [studySet.cards]);

  useEffect(() => {
    handleShuffle();
  }, [studySet.id, handleShuffle]);
  

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledCards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length);
  };
  
  const currentCard = useMemo(() => shuffledCards[currentIndex], [shuffledCards, currentIndex]);

  if (!currentCard) {
    return <div>Loading cards...</div>;
  }

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-6">
      <div className="w-full">
        <Flashcard
          key={currentCard.id}
          card={currentCard}
          onMarkLearned={(isLearned) => updateCardLearnedStatus(studySet.id, currentCard.id, isLearned)}
        />
      </div>
      
      <div className="flex items-center justify-between w-full">
        <Button variant="outline" onClick={handlePrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Prev
        </Button>
        <div className="text-sm text-muted-foreground font-medium">
            Card {currentIndex + 1} of {shuffledCards.length}
        </div>
        <Button variant="outline" onClick={handleNext}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Button variant="secondary" onClick={handleShuffle}>
        <Shuffle className="mr-2 h-4 w-4" />
        Shuffle Deck
      </Button>
    </div>
  );
}
