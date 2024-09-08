import { useMemo } from "react";
import useSolBalance from "./useSolBalance";
import { useTokenList } from "./useTokenList";
import { useTokensBalances } from "./useTokensBalances";

export function useTokensWithBalance() {
  const tokenList = useTokenList();
  const { balanceData: balances } = useTokensBalances(); // Destructure balanceData to handle the state correctly
  const solBalance = useSolBalance();

  const tokensWithBalance = useMemo(
    () =>
      tokenList.map((token) => {
        if (token.type === "native") {
          return { ...token, balance: solBalance };
        } else {
          const balance = balances.find(
            (b) => b.mint.toString() === token.address,
          );

          return {
            ...token,
            balance: balance?.tokenAmount?.uiAmount ?? 0, // Default to 0 if no balance is found
          };
        }
      }),
    [balances, solBalance, tokenList],
  );

  return tokensWithBalance;
}
