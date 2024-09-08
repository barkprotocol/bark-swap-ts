import { type ClassValue, clsx } from "clsx";
import { Token } from "./interfaces/tokensList";
import { add } from "date-fns";
import { twMerge } from "tailwind-merge";

const relativeTimeConversionTable = {
  m: "minutes",
  h: "hours",
  d: "days",
  M: "months",
} as const;

/**
 * Merges class names using clsx and tailwind-merge.
 * @param inputs - The class names to merge.
 * @returns The merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retrieves the logo URI for a given token.
 * @param token - The token symbol or address.
 * @param tokenList - The list of available tokens.
 * @returns The logo URI of the token, or undefined if not found.
 */
export function getTokenIcon(token: string, tokenList: Token[]): string | undefined {
  const selectedToken = tokenList.find(
    (t) => t.symbol === token || t.address === token
  );
  return selectedToken?.logoURI;
}

/**
 * Retrieves the symbol for a given token.
 * @param token - The token address or symbol.
 * @param tokenList - The list of available tokens.
 * @returns The symbol of the token, or undefined if not found.
 */
export function getSymbol(token: string, tokenList: Token[]): string | undefined {
  const foundToken = tokenList.find(
    (t) => t.address === token || t.symbol === token
  );
  return foundToken?.symbol;
}

/**
 * Retrieves the number of decimals for a given token.
 * @param token - The token address or symbol.
 * @param tokenList - The list of available tokens.
 * @returns The number of decimals, or undefined if not found.
 */
export function getDecimals(token: string, tokenList: Token[]): number | undefined {
  const foundToken = tokenList.find(
    (t) => t.address === token || t.symbol === token
  );
  return foundToken?.decimals;
}

/**
 * Converts a raw token amount to a UI-friendly amount.
 * @param amount - The raw amount of tokens.
 * @param decimals - The number of decimal places the token uses.
 * @returns The UI-friendly amount.
 */
export function getUiAmount(amount: number, decimals: number): number {
  return amount / Math.pow(10, decimals);
}

/**
 * Converts a UI-friendly amount to a raw token amount.
 * @param uiAmount - The UI-friendly amount of tokens.
 * @param decimals - The number of decimal places the token uses.
 * @returns The raw amount of tokens.
 */
export function getSolAmount(uiAmount: number, decimals: number): number {
  return Math.round(uiAmount * Math.pow(10, decimals));
}

/**
 * Converts a relative time string to a UTC timestamp.
 * @param relativeTime - The relative time string (e.g., "5|d").
 * @returns The UTC timestamp in seconds, or null if the format is invalid.
 * @throws Error if the relative time format is invalid.
 */
export function convertRelativeTimeToUTCTimestamp(relativeTime: string | null): number | null {
  if (!relativeTime) return null;

  const [amountStr, unit] = relativeTime.split("|");
  const amount = parseInt(amountStr, 10);

  if (isNaN(amount) || !(unit in relativeTimeConversionTable)) {
    throw new Error("Invalid relative time format.");
  }

  const addedDate = add(new Date(), {
    [relativeTimeConversionTable[unit]]: amount,
  });

  return Math.round(addedDate.getTime() / 1000);
}
