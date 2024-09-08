import { tokenPriceFeedIds } from "../tokenPriceFeedIds";

// Define a union type for the token type
type TokenType = "ERC20" | "SPL" | "SPL-22" | "Other"; // Adjust as needed

/**
 * Represents information about a token.
 */
export interface Token {
  type: TokenType; // Type of the token (e.g., ERC20, SPL, etc.)
  name: string; // Name of the token (e.g., "Solana", "Ethereum")
  address: string | null; // Address of the token contract (nullable if not applicable)
  symbol: keyof typeof tokenPriceFeedIds; // Symbol of the token, constrained by keys in tokenPriceFeedIds
  asset: string | null; // Additional asset information (nullable if not applicable)
  decimals: number; // Number of decimal places the token uses
  logoURI: string; // URI for the token's logo
  pairs: Array<{
    pairName: string; // Name of the trading pair (e.g., "ETH/SOL")
    pairAddress: string; // Address of the trading pair contract
  }>;
}
