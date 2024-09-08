import { useCallback, useEffect, useState } from "react";

import { OrderStatus } from "@/lib/interfaces/OrderStatus";
import { Token } from "@/lib/interfaces/tokensList";

interface QuoteOrder {
  outAmount: string | null;
  inAmount?: string;
  inputMint?: string;
  contextSlot?: number;
  otherAmountThreshold?: string;
  outputMint?: string;
  platformFee?: null;
  priceImpactPct?: string;
  slippageBps?: number;
  swapMode?: string;
  timeTaken?: number;
  error?: string;
}

interface Response {
  quote?: QuoteOrder;
  outputAmount: number | null;
  isLoading: boolean;
  error?: string;
}

const initialState: Response = {
  outputAmount: null,
  isLoading: false,
};

export default function useJupiterQuotes(
  setErrorMessage: (message: string) => void,
  setOrderStatus: (status: OrderStatus) => void,
  sellingToken?: Token | null,
  buyingToken?: Token | null,
  currentAmount?: number,
) {
  const [quoteResponse, setQuoteResponse] = useState<Response>(initialState);

  const getQuote = useCallback(async () => {
    if (!sellingToken || !buyingToken || !currentAmount || isNaN(currentAmount) || currentAmount <= 0) {
      return;
    }

    setQuoteResponse({ ...initialState, isLoading: true });

    const params = new URLSearchParams({
      inputMint: sellingToken.address,
      outputMint: buyingToken.address,
      amount: (currentAmount * Math.pow(10, sellingToken.decimals)).toString(),
      slippage: "0.5", // Consider making slippage configurable
    });

    try {
      const response = await fetch(`https://quote-api.jup.ag/v6/quote?${params}`);
      const quote = await response.json();

      if (quote.error) {
        setOrderStatus("ERROR");
        setErrorMessage(
          quote.errorCode === "TOKEN_NOT_TRADABLE"
            ? "This token is not tradable."
            : quote.error,
        );
        setQuoteResponse({
          ...initialState,
          isLoading: false,
        });
        return;
      }

      if (quote.outAmount) {
        const outAmountNumber = Number(quote.outAmount) / Math.pow(10, buyingToken.decimals);
        setQuoteResponse({
          quote,
          outputAmount: outAmountNumber,
          isLoading: false,
        });
      } else {
        setQuoteResponse({
          ...initialState,
          isLoading: false,
          error: "No output amount received.",
        });
      }
    } catch (error) {
      setOrderStatus("ERROR");
      setErrorMessage("Failed to fetch quote.");
      setQuoteResponse({
        ...initialState,
        isLoading: false,
      });
    }
  }, [buyingToken, sellingToken, currentAmount, setErrorMessage, setOrderStatus]);

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  return quoteResponse;
}
