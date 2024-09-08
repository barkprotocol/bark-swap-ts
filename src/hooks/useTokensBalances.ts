import { useCallback, useEffect, useState } from "react";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TokenAccountInfo } from "@/lib/interfaces/tokenAccounts";

export function useTokensBalances() {
  const { publicKey } = useUnifiedWallet();
  const { connection } = useConnection();

  const [balanceData, setBalanceData] = useState<TokenAccountInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getBalanceData = useCallback(async () => {
    if (!publicKey || !connection) return;

    try {
      setLoading(true);
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          programId: TOKEN_PROGRAM_ID,
        },
      );

      if (tokenAccounts.value.length <= 0) {
        setBalanceData([]);
        return;
      }

      const balanceData: TokenAccountInfo[] = tokenAccounts.value.map(
        (token) => token.account.data.parsed.info,
      );

      setBalanceData(balanceData);
    } catch (err) {
      console.error("Error fetching token balances:", err);
      setError("Failed to fetch token balances.");
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey]);

  useEffect(() => {
    getBalanceData();
  }, [getBalanceData]);

  return { balanceData, loading, error };
}
