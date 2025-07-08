export interface Flashcard {
  id: string;
  front: string;
  back: string;
  isLearned: boolean;
}

export interface StudySet {
  id: string;
  name: string;
  cards: Flashcard[];
}
