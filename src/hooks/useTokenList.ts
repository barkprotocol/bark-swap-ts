import { Token } from "@/lib/interfaces/tokensList";
import { tokenList } from "@/lib/tokenlist";
import { useMemo } from "react";

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "Mainnet";

export function useTokenList(showAll?: boolean): Token[] {
  const tokenListForNetwork = useMemo(() => {
    if (showAll) {
      return [
        ...tokenList["Mainnet"],
        ...tokenList["Devnet"],
        ...tokenList["Testnet"],
      ] as Token[];
    }

    return tokenList[network] || [] as Token[];
  }, [showAll, network]);

  return tokenListForNetwork;
}
