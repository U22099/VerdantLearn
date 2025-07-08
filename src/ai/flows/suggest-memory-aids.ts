// use server'
'use server';

/**
 * @fileOverview Provides AI-powered suggestions for memory aids based on flashcard content.
 *
 * - suggestMemoryAids - A function that suggests memory aids for given flashcard content.
 * - SuggestMemoryAidsInput - The input type for the suggestMemoryAids function.
 * - SuggestMemoryAidsOutput - The return type for the suggestMemoryAids function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMemoryAidsInputSchema = z.object({
  frontContent: z
    .string()
    .describe('The content on the front of the flashcard.'),
  backContent: z.string().describe('The content on the back of the flashcard.'),
});
export type SuggestMemoryAidsInput = z.infer<typeof SuggestMemoryAidsInputSchema>;

const SuggestMemoryAidsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested memory aids or related content.'),
});
export type SuggestMemoryAidsOutput = z.infer<typeof SuggestMemoryAidsOutputSchema>;

export async function suggestMemoryAids(input: SuggestMemoryAidsInput): Promise<SuggestMemoryAidsOutput> {
  return suggestMemoryAidsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMemoryAidsPrompt',
  input: {schema: SuggestMemoryAidsInputSchema},
  output: {schema: SuggestMemoryAidsOutputSchema},
  prompt: `You are an AI assistant designed to help users study more effectively by suggesting memory aids and related content for their flashcards.

  Analyze the content of the flashcard and provide a list of suggestions for memory aids, such as mnemonics, analogies, or related concepts.

  Front Content: {{{frontContent}}}
  Back Content: {{{backContent}}}
  Suggestions:`, // Ensure the suggestions are returned as an array for easy processing.
});

const suggestMemoryAidsFlow = ai.defineFlow(
  {
    name: 'suggestMemoryAidsFlow',
    inputSchema: SuggestMemoryAidsInputSchema,
    outputSchema: SuggestMemoryAidsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
