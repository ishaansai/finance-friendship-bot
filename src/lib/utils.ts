
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date object to a readable string format
 * @param date The date to format
 * @param includeTime Whether to include the time in the format
 * @returns Formatted date string
 */
export function formatDate(date: Date, includeTime: boolean = false): string {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  if (includeTime) {
    return date.toLocaleDateString('en-US', {
      ...dateOptions,
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  
  return date.toLocaleDateString('en-US', dateOptions);
}

/**
 * Generate a unique ID for elements
 * @returns A unique string ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
