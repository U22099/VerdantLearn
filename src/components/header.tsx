import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-headline text-foreground">
            VerdantLearn
          </span>
        </Link>
      </div>
    </header>
  );
}
