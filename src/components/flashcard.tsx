'use client';

import { useState } from 'react';
import type { Flashcard as FlashcardType } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Check, Loader2, Info } from 'lucide-react';
import { getMemoryAids } from '@/app/actions';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface FlashcardProps {
  card: FlashcardType;
  onMarkLearned: (isLearned: boolean) => void;
}

export function Flashcard({ card, onMarkLearned }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLearned, setIsLearned] = useState(card.isLearned);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleMarkLearned = () => {
    const newLearnedStatus = !isLearned;
    setIsLearned(newLearnedStatus);
    onMarkLearned(newLearnedStatus);
  };

  const handleGetSuggestions = async () => {
    setIsLoadingSuggestions(true);
    setSuggestions([]);
    try {
      const result = await getMemoryAids({
        frontContent: card.front,
        backContent: card.back,
      });
      setSuggestions(result.suggestions);
    } catch (error) {
      console.error('Failed to get suggestions:', error);
      setSuggestions(['Could not load suggestions.']);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div
        className="w-full h-[250px] md:h-[300px] perspective-[1000px]"
        onClick={handleFlip}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front of the card */}
          <Card className="absolute w-full h-full flex items-center justify-center p-6 text-center" style={{ backfaceVisibility: 'hidden' }}>
            <CardContent className="p-0">
              <h2 className="text-2xl md:text-3xl font-semibold font-headline">{card.front}</h2>
            </CardContent>
          </Card>
          
          {/* Back of the card */}
          <Card className="absolute w-full h-full flex items-center justify-center p-6 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <CardContent className="p-0">
              <p className="text-xl md:text-2xl">{card.back}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Button variant={isLearned ? 'secondary' : 'default'} onClick={handleMarkLearned}>
          <Check className="mr-2 h-4 w-4" />
          {isLearned ? 'Mark as Unlearned' : 'Mark as Learned'}
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" onClick={handleGetSuggestions}>
              {isLoadingSuggestions ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <BrainCircuit className="mr-2 h-4 w-4" />
              )}
              Get Smart Suggestion
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 max-h-[80vh] overflow-y-auto">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none font-headline text-primary">Memory Aids</h4>
                <p className="text-sm text-muted-foreground">
                  AI-powered suggestions to help you remember.
                </p>
              </div>
              <div className="grid gap-2">
                {isLoadingSuggestions && <div className="flex items-center gap-2 text-sm"><Loader2 className="h-4 w-4 animate-spin"/>Loading...</div>}
                {suggestions.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                ) : (
                  !isLoadingSuggestions && <div className="text-sm text-muted-foreground">Click the button to generate suggestions.</div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {isLearned && <Badge variant="outline" className="border-green-600 text-green-600">Learned</Badge>}
    </div>
  );
}
