'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStudySets } from '@/hooks/use-study-sets';
import { Button } from '@/components/ui/button';
import { AddFlashcardForm } from '@/components/add-flashcard-form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Brain, Trash2, XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const setId = params.setId as string;
  const { studySets, isLoaded, addCardToSet, deleteCard, deleteSet } = useStudySets();

  const studySet = studySets.find((set) => set.id === setId);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!studySet) {
    return <div>Set not found. <Link href="/" className="underline">Go home</Link></div>;
  }
  
  const handleDeleteSet = () => {
    deleteSet(studySet.id);
    router.push('/');
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to sets
          </Link>
          <h1 className="text-4xl font-bold font-headline text-primary">{studySet.name}</h1>
        </div>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Set
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the study set "{studySet.name}" and all of its cards. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteSet}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button asChild size="lg" disabled={studySet.cards.length === 0}>
            <Link href={`/set/${studySet.id}/study`}>
              <Brain className="mr-2 h-5 w-5" />
              Start Studying
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold font-headline mb-4">Add a New Card</h2>
          <AddFlashcardForm setId={studySet.id} addCardToSet={addCardToSet} />
        </div>
        <div className="md:col-span-2">
           <h2 className="text-2xl font-bold font-headline mb-4">Cards in this Set</h2>
          <Card className="shadow-md">
            {studySet.cards.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Front</TableHead>
                    <TableHead>Back</TableHead>
                    <TableHead className="text-right w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studySet.cards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">{card.front}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{card.back}</TableCell>
                      <TableCell className="text-right">
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                               <Button variant="ghost" size="icon">
                                 <XCircle className="h-4 w-4 text-destructive" />
                               </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete this card?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this flashcard.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteCard(studySet.id, card.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No cards added yet. Use the form to add your first flashcard.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// Dummy Card component to resolve compilation error
const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={`bg-card rounded-xl border ${className}`}>{children}</div>
);
