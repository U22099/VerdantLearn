'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useStudySets } from '@/hooks/use-study-sets';
import { CreateSetDialog } from '@/components/create-set-dialog';
import { StudySetCard } from '@/components/study-set-card';
import { PlusCircle } from 'lucide-react';

export default function Home() {
  const { studySets, addSet } = useStudySets();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline text-primary">Your Study Sets</h1>
        <CreateSetDialog open={dialogOpen} onOpenChange={setDialogOpen} addSet={addSet}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Set
          </Button>
        </CreateSetDialog>
      </div>

      {studySets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studySets.map((set) => (
            <StudySetCard key={set.id} studySet={set} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-lg border-2 border-dashed">
          <h2 className="text-xl font-semibold text-muted-foreground">No study sets yet!</h2>
          <p className="text-muted-foreground mt-2">Click "Create Set" to get started.</p>
        </div>
      )}
    </div>
  );
}
