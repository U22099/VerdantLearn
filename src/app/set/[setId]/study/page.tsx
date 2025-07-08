'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useStudySets } from '@/hooks/use-study-sets';
import { StudyMode } from '@/components/study-mode';
import { ArrowLeft, BookCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

export default function StudyPage() {
  const params = useParams();
  const setId = params.setId as string;
  const { studySets, isLoaded, updateCardLearnedStatus } = useStudySets();

  const studySet = studySets.find((set) => set.id === setId);

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="w-[400px] h-[250px] rounded-lg" />
        <div className="flex gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
  }

  if (!studySet) {
    notFound();
  }

  if (studySet.cards.length === 0) {
    return (
        <div className="text-center py-20">
            <BookCheck className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 text-2xl font-bold font-headline">No cards in this set!</h2>
            <p className="mt-2 text-muted-foreground">Add some cards to start studying.</p>
            <Button asChild className="mt-6">
                <Link href={`/set/${studySet.id}`}>Go to Set</Link>
            </Button>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Link href={`/set/${setId}`} className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Back to set: {studySet.name}
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <StudyMode studySet={studySet} updateCardLearnedStatus={updateCardLearnedStatus} />
      </div>
    </div>
  );
}
