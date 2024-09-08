import { useMemo } from "react";
import { useTokensWithBalance } from "./useTokensWithBalance";

// Utility function to normalize strings for comparison
const normalizeStringForComparison = (text: string | number | null | undefined) =>
  text ? String(text).toLowerCase().trim().replace(/\W+/g, "") : "";

export function useFilteredTokens(searchText: string) {
  const tokensWithBalance = useTokensWithBalance();

  const normalizedSearchText = useMemo(
    () => normalizeStringForComparison(searchText),
    [searchText]
  );

  const filteredTokens = useMemo(() => {
    if (normalizedSearchText === "") return tokensWithBalance;

    return tokensWithBalance.filter((token) => {
      const normalizedType = normalizeStringForComparison(token.type);
      const normalizedName = normalizeStringForComparison(token.name);
      const normalizedAddress = normalizeStringForComparison(token.address);
      const normalizedSymbol = normalizeStringForComparison(token.symbol);

      return (
        normalizedType.includes(normalizedSearchText) ||
        normalizedName.includes(normalizedSearchText) ||
        normalizedAddress.includes(normalizedSearchText) ||
        normalizedSymbol.includes(normalizedSearchText)
      );
    });
  }, [tokensWithBalance, normalizedSearchText]);

  return filteredTokens;
}
