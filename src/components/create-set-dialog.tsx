'use client';

import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { StudySet } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CreateSetDialogProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addSet: (name: string) => StudySet;
}

export function CreateSetDialog({ children, open, onOpenChange, addSet }: CreateSetDialogProps) {
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addSet(name.trim());
      toast({
        title: "Set created!",
        description: `Your new set "${name.trim()}" has been created.`,
      });
      setName('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-headline">Create a new study set</DialogTitle>
            <DialogDescription>
              Give your new set a name to get started. You can add flashcards later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 'Spanish Vocabulary'"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Set</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
