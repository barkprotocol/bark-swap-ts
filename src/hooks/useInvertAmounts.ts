import { useCallback } from "react";
import { useSwap } from "@/components/trade/swap/SwapProvider";

/**
 * Custom hook to swap the sell and buy amounts and their respective tokens.
 * @returns A function to perform the inversion.
 */
export function useInvertAmounts() {
  const {
    sellAmount,
    setSellAmount,
    buyAmount,
    setBuyAmount,
    sellSelectedToken,
    setSellSelectedToken,
    buySelectedToken,
    setBuySelectedToken,
  } = useSwap();

  /**
   * Swaps the sell and buy amounts and tokens.
   */
  const invertAmounts = useCallback(() => {
    // Swap sell and buy amounts
    setSellAmount(buyAmount ?? 0);
    setBuyAmount(sellAmount ?? 0);

    // Swap selected tokens
    setSellSelectedToken(buySelectedToken ?? null);
    setBuySelectedToken(sellSelectedToken ?? null);
  }, [
    buyAmount,
    sellAmount,
    buySelectedToken,
    sellSelectedToken,
    setSellAmount,
    setBuyAmount,
    setSellSelectedToken,
    setBuySelectedToken,
  ]);

  return invertAmounts;
}
