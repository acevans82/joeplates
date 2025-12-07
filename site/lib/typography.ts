/**
 * Typography utilities for preventing widows (orphaned words) in text.
 * 
 * A "widow" in typography is a single word that appears alone on the last line
 * of a paragraph, which looks awkward. We prevent this by replacing the last
 * space(s) with non-breaking spaces.
 */

const NON_BREAKING_SPACE = '\u00A0';

/**
 * Prevents widow words by replacing the last N spaces with non-breaking spaces.
 * 
 * @param text - The text to process
 * @param minProtectedWords - Minimum number of words to keep together at the end (default: 2)
 * @returns The text with non-breaking spaces preventing widows
 */
export function preventWidows(text: string, minProtectedWords: number = 2): string {
  if (!text || typeof text !== 'string') {
    return text;
  }

  // Don't process very short text
  const words = text.trim().split(/\s+/);
  if (words.length <= minProtectedWords) {
    return text;
  }

  // Find positions of all spaces
  const spacePositions: number[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      spacePositions.push(i);
    }
  }

  if (spacePositions.length < minProtectedWords) {
    return text;
  }

  // Replace the last (minProtectedWords - 1) spaces with non-breaking spaces
  const spacesToReplace = Math.min(minProtectedWords - 1, spacePositions.length);
  const positionsToReplace = spacePositions.slice(-spacesToReplace);

  let result = text;
  // Replace from end to start to preserve positions
  for (let i = positionsToReplace.length - 1; i >= 0; i--) {
    const pos = positionsToReplace[i];
    result = result.slice(0, pos) + NON_BREAKING_SPACE + result.slice(pos + 1);
  }

  return result;
}

/**
 * Prevents widows keeping 3 words together - useful for shorter text blocks
 * like subtitles where you want more protection.
 */
export function preventWidowsStrict(text: string): string {
  return preventWidows(text, 3);
}


