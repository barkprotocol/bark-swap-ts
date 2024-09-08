/**
 * Represents information about a token account.
 */
export interface TokenAccountInfo {
  isNative: boolean; // Indicates if the token is native SOL
  mint: string; // Mint address of the token
  owner: string; // Owner address of the token account
  state: string; // State of the token account (e.g., initialized, frozen)
  tokenAmount: TokenAmount; // Details of the token amount
}

/**
 * Represents the amount of a token in an account.
 */
export interface TokenAmount {
  amount?: string | null; // Raw amount of tokens (in smallest unit, e.g., lamports for SOL)
  decimals?: number | null; // Number of decimal places for the token
  uiAmount?: number | null; // Amount formatted for display (e.g., in SOL for SOL tokens)
  uiAmountString?: string | null; // String representation of the UI amount
}
