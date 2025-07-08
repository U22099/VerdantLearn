'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import type { StudySet } from '@/lib/types';
import { Layers } from 'lucide-react';

interface StudySetCardProps {
  studySet: StudySet;
}

export function StudySetCard({ studySet }: StudySetCardProps) {
  const learnedCount = studySet.cards.filter((card) => card.isLearned).length;
  const totalCount = studySet.cards.length;
  const progress = totalCount > 0 ? (learnedCount / totalCount) * 100 : 0;

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex-row items-start gap-4 space-y-0">
        <div className="flex-shrink-0">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
                <Layers className="h-6 w-6" />
            </div>
        </div>
        <div className="flex-1">
          <CardTitle className="font-headline text-xl leading-tight">
            <Link href={`/set/${studySet.id}`} className="hover:underline">
              {studySet.name}
            </Link>
          </CardTitle>
          <CardDescription>{totalCount} cards</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">Mastery</span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} aria-label={`${Math.round(progress)}% mastered`} />
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/set/${studySet.id}/study`}>Study</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
