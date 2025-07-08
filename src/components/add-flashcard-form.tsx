'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AddFlashcardFormProps {
  setId: string;
  addCardToSet: (setId: string, front: string, back: string) => void;
}

export function AddFlashcardForm({ setId, addCardToSet }: AddFlashcardFormProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (front.trim() && back.trim()) {
      addCardToSet(setId, front.trim(), back.trim());
      toast({
        title: "Card Added!",
        description: "Your new flashcard has been saved to the set.",
      });
      setFront('');
      setBack('');
    }
  };

  return (
    <Card className="shadow-md">
      <form onSubmit={handleSubmit}>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="front">Front</Label>
            <Input
              id="front"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="e.g., 'useEffect'"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="back">Back</Label>
            <Textarea
              id="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="e.g., 'A Hook for side effects'"
              required
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Add Card
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
