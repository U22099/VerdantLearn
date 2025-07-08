'use server';

import { suggestMemoryAids, type SuggestMemoryAidsInput } from '@/ai/flows/suggest-memory-aids';

export async function getMemoryAids(input: SuggestMemoryAidsInput) {
  try {
    const output = await suggestMemoryAids(input);
    return output;
  } catch (error) {
    console.error("Error in getMemoryAids server action:", error);
    // It's better to throw the error and let the client handle it
    // This allows for more specific error handling on the frontend.
    throw new Error("Failed to get memory aid suggestions.");
  }
}
